package get_hired.validation;

import get_hired.exception.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public class FileValidator {

    private static final long MAX_SIZE = 5 * 1024 * 1024; // 5 MB

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    public static void validateResume(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Resume file is required");
        }

        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new BadRequestException("Invalid resume file type");
        }

        if (file.getSize() > MAX_SIZE) {
            throw new BadRequestException("Resume file size must be <= 5MB");
        }
    }
}
