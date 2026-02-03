package get_hired.controller;

import get_hired.dto.CreateJobRequest;
import get_hired.dto.JobResponse;
import get_hired.entity.Job;
import get_hired.entity.Recruiter;
import get_hired.repository.JobRepository;
import get_hired.repository.RecruiterRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobRepository jobRepository;
    private final RecruiterRepository recruiterRepository;

    public JobController(JobRepository jobRepository,
                         RecruiterRepository recruiterRepository) {
        this.jobRepository = jobRepository;
        this.recruiterRepository = recruiterRepository;
    }

    // -------------------------------
    // CREATE JOB (PHASE 1)
    // -------------------------------
    @PostMapping
    public ResponseEntity<Void> createJob(
            @RequestBody CreateJobRequest request
    ) {
         Recruiter recruiter = recruiterRepository
                .findById(request.getRecruiterId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Recruiter not found"
                        )
                );

        Job job = new Job();
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());
        job.setSalary(request.getSalary());
        job.setRecruiter(recruiter);
        job.setCreatedAt(Instant.now());

        jobRepository.save(job);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // -------------------------------
    // GET ALL JOBS (PUBLIC)
    // -------------------------------
    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllJobs() {

        List<JobResponse> jobs = jobRepository.findAll()
                .stream()
                .map(JobResponse::fromEntity)
                .toList();

        return ResponseEntity.ok(jobs);
    }

    // -------------------------------
    // GET JOB BY ID
    // -------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(
            @PathVariable String id
    ) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Job not found"
                        )
                );

        return ResponseEntity.ok(JobResponse.fromEntity(job));
    }

    // -------------------------------
    // DELETE JOB (PHASE 1)
    // -------------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(
            @PathVariable String id
    ) {
        if (!jobRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Job not found"
            );
        }

        jobRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
