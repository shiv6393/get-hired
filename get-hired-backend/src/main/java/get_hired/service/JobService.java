package get_hired.service;
import get_hired.entity.Job;
import get_hired.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public void deleteJob(long id) {
        jobRepository.deleteById(id);
    }
}