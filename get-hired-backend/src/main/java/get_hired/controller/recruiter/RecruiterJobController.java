package get_hired.controller.recruiter;

import get_hired.dto.ApplicantResponseDto;
import get_hired.dto.JobResponseDto;
import get_hired.service.RecruiterJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter")
@RequiredArgsConstructor
public class RecruiterJobController {

    private final RecruiterJobService recruiterJobService;

    // ✅ Get all recruiter jobs (no auth for now)
    @GetMapping("/jobs")
    public Page<JobResponseDto> getMyJobs(
            @PageableDefault(size = 6) Pageable pageable
    ) {
        return recruiterJobService.getJobs(pageable);
    }

    // ✅ Get applicants for a job
    @GetMapping("/jobs/{jobId}/applicants")
    public List<ApplicantResponseDto> getApplicants(
            @PathVariable Long jobId
    ) {
        return recruiterJobService.getApplicantsForJob(jobId);
    }
}
