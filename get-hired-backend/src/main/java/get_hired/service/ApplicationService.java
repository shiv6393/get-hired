package get_hired.service;

import get_hired.entity.Application;
import get_hired.entity.Job;
import get_hired.entity.User;
import get_hired.exception.ConflictException;
import get_hired.exception.ResourceNotFoundException;
import get_hired.repository.ApplicationRepository;
import get_hired.repository.JobRepository;
import get_hired.repository.UserRepository;
import get_hired.storage.FileStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            JobRepository jobRepository,
            UserRepository userRepository,
            FileStorageService fileStorageService
    ) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    public void applyJob(
            String jobId,
            String candidateId,
            MultipartFile resume,
            String coverLetter
    ) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found"));

        User candidate = userRepository.findById(candidateId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Candidate not found"));

        if (applicationRepository.existsByJobAndCandidate(job, candidate)) {
            throw new ConflictException("Already applied for this job");
        }

        String resumeUrl = fileStorageService.store(resume);

        Application application = new Application();
        application.setJob(job);
        application.setCandidate(candidate);
        application.setResumeUrl(resumeUrl);
        application.setCoverLetter(coverLetter);
        application.setAppliedAt(Instant.now());

        applicationRepository.save(application);
    }
}
