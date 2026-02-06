package get_hired.controller;

import get_hired.dto.CreateJobRequest;
import get_hired.dto.JobResponse;
import get_hired.entity.Job;
import get_hired.entity.Recruiter;
import get_hired.repository.JobRepository;
import get_hired.repository.RecruiterRepository;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
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

    @PostMapping
    public ResponseEntity<Void> createJob(
            @RequestBody CreateJobRequest request,
            Authentication auth
    ) {
        String recruiterId = auth.getName();

        Recruiter recruiter = recruiterRepository.findById(recruiterId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Recruiter profile not found"));

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

    @GetMapping
    public List<JobResponse> getJobs() {
        return jobRepository.findAll()
                .stream()
                .map(JobResponse::from)
                .toList();
    }
}
