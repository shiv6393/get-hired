package get_hired.controller;

import get_hired.dto.CreateJobRequest;
import get_hired.dto.JobResponseDto;
import get_hired.entity.Job;
import get_hired.service.JobService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // CREATE JOB
    @PreAuthorize("hasRole('RECRUITER')")
    @PostMapping
    public ResponseEntity<Void> createJob(
            @Valid @RequestBody CreateJobRequest request,
            Authentication authentication
    ) {
        String recruiterId = authentication.getName();

        jobService.createJob(
                recruiterId,
                request.getTitle(),
                request.getDescription(),
                request.getLocation(),
                request.getSalary()
        );

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    // GET JOBS BY RECRUITER (Dashboard)
    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/my")
    public ResponseEntity<Page<Job>> getMyJobs(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        String recruiterId = authentication.getName();
        Page<Job> jobs = jobService.getJobsByRecruiter(
                recruiterId,
                PageRequest.of(page, size)
        );

        return ResponseEntity.ok(jobs);
    }

    // DELETE JOB
    @PreAuthorize("hasRole('RECRUITER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(
            @PathVariable String id,
            Authentication authentication
    ) {
        String recruiterId = authentication.getName();
        jobService.deleteJob(id, recruiterId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/public")
    public ResponseEntity<Page<JobResponseDto>> getPublicJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String dir
    ) {
        Sort sort = dir.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return ResponseEntity.ok(jobService.getPublicJobs(pageable));
    }

}
