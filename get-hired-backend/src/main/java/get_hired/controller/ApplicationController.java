package get_hired.controller;

import get_hired.entity.Application;
import get_hired.entity.Job;
import get_hired.entity.User;
import get_hired.repository.ApplicationRepository;
import get_hired.repository.JobRepository;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    public ApplicationController(ApplicationRepository applicationRepository,
                                 JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> applyJob(
            @RequestParam("jobId") String jobId,
            @RequestPart("resume") MultipartFile resume,
            @RequestParam(value = "coverLetter", required = false) String coverLetter,
            Authentication auth
    ) {
        String candidateId = auth.getName();

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Job not found"));

        // save file → generate URL
        String resumeUrl = "uploads/" + resume.getOriginalFilename();

        Application app = new Application();
        app.setJob(job);
        app.setCandidate(new User(candidateId));
        app.setResumeUrl(resumeUrl);
        app.setCoverLetter(coverLetter);
        app.setAppliedAt(Instant.now());

        applicationRepository.save(app);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
