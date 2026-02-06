package get_hired.controller;

import get_hired.service.ApplicationService;
import get_hired.validation.FileValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> applyJob(
            @RequestParam("jobId") String jobId,
            @RequestPart("resume") MultipartFile resume,
            @RequestParam(value = "coverLetter", required = false) String coverLetter,
            Authentication authentication
    ) {
        String candidateId = authentication.getName();

        FileValidator.validateResume(resume);

        String resumeUrl = "uploads/" + resume.getOriginalFilename();

        applicationService.applyJob(
                jobId,
                candidateId,
                resumeUrl,
                coverLetter
        );

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
