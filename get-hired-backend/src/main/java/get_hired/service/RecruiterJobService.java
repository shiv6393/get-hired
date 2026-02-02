package get_hired.service;

import get_hired.dto.ApplicantResponseDto;
import get_hired.dto.JobResponseDto;
import get_hired.entity.Job;
import get_hired.repository.ApplicationRepository;
import get_hired.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class RecruiterJobService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public Page<JobResponseDto> getJobs(Pageable pageable) {
        return jobRepository
                .findAll(pageable)
                .map(JobResponseDto::fromEntity);
    }

    public List<ApplicantResponseDto> getApplicantsForJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        return applicationRepository.findByJob(job)
                .stream()
                .map(ApplicantResponseDto::fromEntity)
                .toList();
    }
}
