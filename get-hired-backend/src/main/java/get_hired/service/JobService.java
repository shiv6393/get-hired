package get_hired.service;

import get_hired.entity.Job;
import get_hired.entity.Recruiter;
import get_hired.exception.BadRequestException;
import get_hired.exception.ResourceNotFoundException;
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

    public JobService(JobRepository jobRepository,
                      RecruiterRepository recruiterRepository) {
        this.jobRepository = jobRepository;
        this.recruiterRepository = recruiterRepository;
    }

    // CREATE JOB
    public Job createJob(
            String recruiterId,
            String title,
            String description,
            String location,
            Double salary
    ) {
        Recruiter recruiter = recruiterRepository.findById(recruiterId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Recruiter profile not found"));

        Job job = new Job();
        job.setTitle(title);
        job.setDescription(description);
        job.setLocation(location);
        job.setSalary(salary);
        job.setRecruiter(recruiter);
        job.setCreatedAt(Instant.now());

        return jobRepository.save(job);
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
}
