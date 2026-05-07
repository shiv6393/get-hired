package get_hired.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    String store(MultipartFile file);

    Resource loadAsResource(String storedPath);

    String toDownloadUrl(String storedPath);
}
