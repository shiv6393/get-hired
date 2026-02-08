package get_hired.controller.recruiter;
import get_hired.dto.ApplicantResponseDto;
import get_hired.dto.ApplicationStatusRequestDto;
import get_hired.dto.JobApplicationCountDto;
import get_hired.dto.RecruiterDashboardStatsDto;
import get_hired.entity.Recruiter;
import get_hired.entity.User;
import get_hired.service.ApplicationService;
import get_hired.service.RecruiterAnalyticsService;
import get_hired.service.RecruiterService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiters")
public class RecruiterController {

    private final RecruiterService recruiterService;
    private final ApplicationService applicationService;
    private final RecruiterAnalyticsService recruiterAnalyticsService;

    public RecruiterController(RecruiterService recruiterService,ApplicationService applicationService,RecruiterAnalyticsService recruiterAnalyticsService) {
        this.recruiterService = recruiterService;
        this.applicationService=applicationService;
        this.recruiterAnalyticsService=recruiterAnalyticsService;

    }

    //
    //Create recruiter profile (Phase-2: user from JWT)
    @PreAuthorize("hasRole('RECRUITER')")
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
    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/dashboard/stats")
    public ResponseEntity<RecruiterDashboardStatsDto> getDashboardStats(
            Authentication authentication
    ) {
        String recruiterId = authentication.getName();
        return ResponseEntity.ok(
                recruiterAnalyticsService.getDashboardStats(recruiterId)
        );
    }

    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/dashboard/jobs/applications")
    public ResponseEntity<List<JobApplicationCountDto>> getApplicationsPerJob(
            Authentication authentication
    ) {
        String recruiterId = authentication.getName();
        return ResponseEntity.ok(
                recruiterAnalyticsService.getApplicationsPerJob(recruiterId)
        );
    }
    @PatchMapping("/applications/{applicationId}/status")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<Void> updateApplicationStatus(
            @PathVariable String applicationId,
            @Valid @RequestBody ApplicationStatusRequestDto dto,
            Authentication authentication
    ) {
        String recruiterId = authentication.getName();

        applicationService.updateApplicationStatus(
                applicationId,
                recruiterId,
                dto.getStatus()
        );

        return ResponseEntity.noContent().build();
    }


}
