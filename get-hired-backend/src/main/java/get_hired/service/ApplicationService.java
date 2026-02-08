package get_hired.service;

import get_hired.dto.ApplicantResponseDto;
import get_hired.dto.AppliedJobResponseDto;
import get_hired.entity.Application;
import get_hired.entity.ApplicationStatus;
import get_hired.entity.Job;
import get_hired.entity.User;
import get_hired.exception.BadRequestException;
import get_hired.exception.ConflictException;
import get_hired.exception.ResourceNotFoundException;
import get_hired.repository.ApplicationRepository;
import get_hired.repository.JobRepository;
import get_hired.repository.UserRepository;
import get_hired.storage.FileStorageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;

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
        application.setResumeUrl(resumeUrl);
        application.setCoverLetter(coverLetter);
        application.setAppliedAt(Instant.now());

        applicationRepository.save(application);
    }

    public List<ApplicantResponseDto> getApplicantsForJob(
            String jobId,
            String recruiterId
    ) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found"));

        // Ownership check (CRITICAL)
        if (!job.getRecruiter().getId().equals(recruiterId)) {
            throw new BadRequestException("Access denied for this job");
        }

        return applicationRepository.findAllByJob(job)
                .stream()
                .map(ApplicantResponseDto::fromEntity)
                .toList();
    }

    public Page<AppliedJobResponseDto> getAppliedJobsForCandidate(
            String candidateId,
            Pageable pageable
    ) {
        User candidate = userRepository.findById(candidateId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Candidate not found"));

        return applicationRepository
                .findAllByCandidate(candidate, pageable)
                .map(AppliedJobResponseDto::fromEntity);
    }
    public void updateApplicationStatus(
            String applicationId,
            String recruiterId,
            ApplicationStatus status
    ) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application not found"));

        Job job = app.getJob();

        // 🔐 Ownership check
        if (!job.getRecruiter().getId().equals(recruiterId)) {
            throw new BadRequestException("Access denied");
        }

        app.setStatus(status);
        applicationRepository.save(app);
    }
}
