package get_hired.controller;

import get_hired.dto.AppliedJobResponseDto;
import get_hired.service.ApplicationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    private final ApplicationService applicationService;

    public CandidateController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }
    @PreAuthorize("hasRole('CANDIDATE')")
    @GetMapping("/applications")
    public ResponseEntity<Page<AppliedJobResponseDto>> getMyAppliedJobs(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        String candidateId = authentication.getName();

        return ResponseEntity.ok(
                applicationService.getAppliedJobsForCandidate(
                        candidateId,
                        PageRequest.of(page, size)
                )
        );
    }
}
