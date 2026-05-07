package get_hired.storage;

import get_hired.exception.BadRequestException;
import get_hired.exception.ResourceNotFoundException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class LocalFileStorageService implements FileStorageService {

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    private Path resolveUploadBasePath() {
        Path configuredPath = Paths.get(uploadDir);

        if (configuredPath.isAbsolute()) {
            return configuredPath.normalize();
        }

        Path currentWorkingDirectory = Paths.get("").toAbsolutePath().normalize();
        Path localPath = currentWorkingDirectory.resolve(configuredPath).normalize();
        Path parentPath = currentWorkingDirectory.getParent() != null
                ? currentWorkingDirectory.getParent().resolve(configuredPath).normalize()
                : localPath;

        if (Files.exists(localPath)) {
            return localPath;
        }

        if (Files.exists(parentPath)) {
            return parentPath;
        }

        // When the app runs from `get-hired-backend`, keep uploads in the shared workspace root.
        if (currentWorkingDirectory.getFileName() != null
                && currentWorkingDirectory.getFileName().toString().contains("backend")
                && currentWorkingDirectory.getParent() != null) {
            return parentPath;
        }

        return localPath;
    }

    private Path resolveStoredFilePath(String storedPath) {
        Path rawPath = Paths.get(storedPath).normalize();

        if (rawPath.isAbsolute()) {
            return rawPath;
        }

        Path fileNameOnly = rawPath.getFileName();
        if (fileNameOnly == null) {
            return resolveUploadBasePath().resolve(rawPath).normalize();
        }

        return resolveUploadBasePath().resolve(fileNameOnly).normalize();
    }

    @Override
    public String store(MultipartFile file) {
        try {
            Path uploadPath = resolveUploadBasePath();

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalName = file.getOriginalFilename();
            String extension = originalName != null && originalName.contains(".")
                    ? originalName.substring(originalName.lastIndexOf("."))
                    : "";

            String fileName = UUID.randomUUID() + extension;
            Path filePath = uploadPath.resolve(fileName);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return stored path (later → S3 URL)
            return uploadDir + "/" + fileName;

        } catch (IOException e) {
            throw new BadRequestException("Failed to store resume file");
        }
    }

    @Override
    public Resource loadAsResource(String storedPath) {
        try {
            Path filePath = resolveStoredFilePath(storedPath).toAbsolutePath();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                throw new ResourceNotFoundException("Resume file not found");
            }

            return resource;
        } catch (MalformedURLException e) {
            throw new ResourceNotFoundException("Resume file not found");
        }
    }

    @Override
    public String toDownloadUrl(String storedPath) {
        Path path = Paths.get(storedPath);
        String fileName = path.getFileName().toString();
        return "/api/files/" + fileName;
    }
}
