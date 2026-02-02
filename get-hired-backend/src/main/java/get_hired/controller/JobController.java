package get_hired.controller;

import get_hired.dto.JobResponseDto;
import get_hired.entity.Application;
import get_hired.entity.Job;
import get_hired.repository.ApplicationRepository;
import get_hired.repository.JobRepository;
import get_hired.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Vite frontend
public class JobController {

    private final JobService jobService;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    // ✅ GET all jobs (pagination + sorting)
    @GetMapping
    public Page<Job> getJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        PageRequest pageable = PageRequest.of(page, size, sort);
        return jobRepository.findAll(pageable);
    }

    // ✅ GET job by id
    @GetMapping("/{id}")
    public Job getJob(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    // ✅ CREATE job
    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobService.createJob(job);
    }

    // ✅ DELETE job
    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
    }

    // ✅ APPLY for a job (NO AUTH FOR NOW)
    @PostMapping("/{id}/apply")
    public Map<String, String> applyJob(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload
    ) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        Application application = Application.builder()
                .applicantName(payload.get("applicantName"))
                .email(payload.get("email"))
                .resumeUrl(payload.get("resumeUrl"))
                .appliedAt(LocalDateTime.now())
                .job(job)
                .build();

        applicationRepository.save(application);

        return Map.of("message", "Application submitted successfully");
    }
}
