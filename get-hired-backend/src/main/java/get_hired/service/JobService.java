package get_hired.service;

import get_hired.dto.JobDetailsResponseDto;
import get_hired.dto.JobResponseDto;
import get_hired.entity.Job;
import get_hired.entity.Recruiter;
import get_hired.exception.BadRequestException;
import get_hired.exception.ResourceNotFoundException;
import get_hired.repository.ApplicationRepository;
import get_hired.repository.JobRepository;
import get_hired.repository.RecruiterRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final RecruiterRepository recruiterRepository;
    private final ApplicationRepository applicationRepository;

    public JobService(JobRepository jobRepository, ApplicationRepository applicationRepository,
                      RecruiterRepository recruiterRepository) {
        this.jobRepository = jobRepository;
        this.recruiterRepository = recruiterRepository;
        this.applicationRepository=applicationRepository;
    }

    // CREATE JOB
    public JobResponseDto createJob(
            String recruiterId,
            String title,
            String description,
            String location,
            Double salary
    ) {
        Recruiter recruiter = recruiterRepository.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found"));

        Job job = new Job();
        job.setTitle(title);
        job.setDescription(description);
        job.setLocation(location);
        job.setSalary(salary);
        job.setRecruiter(recruiter);
        job.setCreatedAt(Instant.now());

        Job savedJob = jobRepository.save(job);

        // ✅ Inject applicants count (0 for new job)
        return JobResponseDto.fromEntity(savedJob, 0);
    }
    // GET JOBS BY RECRUITER (DASHBOARD)
    public Page<Job> getJobsByRecruiter(
            String recruiterId,
            Pageable pageable
    ) {
        Recruiter recruiter = recruiterRepository.findById(recruiterId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Recruiter profile not found"));

        return jobRepository.findAllByRecruiter(recruiter, pageable);
    }

    // DELETE JOB (OWNERSHIP CHECK)
    public void deleteJob(String jobId, String recruiterId) {
        if (!jobRepository.existsByIdAndRecruiter_Id(jobId, recruiterId)) {
            throw new BadRequestException("Job not found or access denied");
        }
        jobRepository.deleteById(jobId);
    }

    public Page<JobResponseDto> getPublicJobs(Pageable pageable) {

        Page<Job> jobs = jobRepository.findAll(pageable);

        return jobs.map(job -> {
            long applicantsCount = applicationRepository.countByJob(job);
            return JobResponseDto.fromEntity(job, applicantsCount);
        });
    }

    public JobDetailsResponseDto getJobDetails(String jobId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found"));

        long applicantsCount = applicationRepository.countByJob(job);

        return JobDetailsResponseDto.fromEntity(job, applicantsCount);
    }
    public JobResponseDto updateJob(
            String jobId,
            String recruiterId,
            String title,
            String description,
            String location,
            Double salary
    ) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (!job.getRecruiter().getId().equals(recruiterId)) {
            throw new BadRequestException("Access denied");
        }

        job.setTitle(title);
        job.setDescription(description);
        job.setLocation(location);
        job.setSalary(salary);

        Job updatedJob = jobRepository.save(job);

        long applicantsCount = applicationRepository.countByJob(updatedJob);

        return JobResponseDto.fromEntity(updatedJob, applicantsCount);
    }
}

