package get_hired.service;

import get_hired.entity.Application;
import get_hired.entity.Job;
import get_hired.entity.User;
import get_hired.repository.ApplicationRepository;
import get_hired.repository.JobRepository;
import get_hired.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                              JobRepository jobRepository,
                              UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    public Application applyJob(
            String jobId,
            String candidateId,
            String resumeUrl,
            String coverLetter
    ) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new IllegalStateException("Job not found"));

        User candidate = userRepository.findById(candidateId)
                .orElseThrow(() ->
                        new IllegalStateException("Candidate not found"));

        if (applicationRepository.existsByJobAndCandidate(job, candidate)) {
            throw new IllegalStateException("Already applied for this job");
        }

        Application application = new Application();
        application.setJob(job);
        application.setCandidate(candidate);
        application.setResumeUrl(resumeUrl);
        application.setCoverLetter(coverLetter);
        application.setAppliedAt(Instant.now());

        return applicationRepository.save(application);
    }
}
