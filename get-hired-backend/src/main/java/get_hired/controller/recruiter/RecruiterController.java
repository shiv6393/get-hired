package get_hired.controller.recruiter;
import get_hired.dto.ApplicantResponseDto;
import get_hired.entity.Recruiter;
import get_hired.entity.User;
import get_hired.service.ApplicationService;
import get_hired.service.RecruiterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiters")
public class RecruiterController {

    private final RecruiterService recruiterService;
    private final ApplicationService applicationService;

    public RecruiterController(RecruiterService recruiterService,ApplicationService applicationService) {
        this.recruiterService = recruiterService;
        this.applicationService=applicationService;
    }

    // Create recruiter profile (Phase-2: user from JWT)
    @PostMapping
    public ResponseEntity<Void> createRecruiterProfile(
            @RequestBody Recruiter recruiter,
            Authentication authentication
    ) {
        String userId = authentication.getName();

        User user = new User();
        user.setId(userId);

        recruiter.setId(userId);
        recruiter.setUser(user);

        recruiterService.createRecruiterProfile(recruiter);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @GetMapping("/jobs/{jobId}/applicants")
    public ResponseEntity<List<ApplicantResponseDto>> getApplicantsForJob(
            @PathVariable String jobId,
            Authentication authentication
    ) {
        String recruiterId = authentication.getName();

        return ResponseEntity.ok(
                applicationService.getApplicantsForJob(jobId, recruiterId)
        );
    }

}
