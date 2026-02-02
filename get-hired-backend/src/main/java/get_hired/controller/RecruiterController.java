package get_hired.controller;

import get_hired.dto.ApplicationResponseDto;
import get_hired.service.RecruiterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter")
@CrossOrigin(origins = "http://localhost:5173")
public class RecruiterController {

    private final RecruiterService recruiterService;

    public RecruiterController(RecruiterService recruiterService) {
        this.recruiterService = recruiterService;
    }

    @GetMapping("/jobs/{jobId}/applicants")
    public ResponseEntity<List<ApplicationResponseDto>> getApplicants(
            @PathVariable Long jobId
    ) {
        return ResponseEntity.ok(
                recruiterService.getApplicantsByJob(jobId)
        );
    }
}
