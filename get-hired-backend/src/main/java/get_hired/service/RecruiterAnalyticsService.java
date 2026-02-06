package get_hired.service;

import get_hired.dto.JobApplicationCountDto;
import get_hired.dto.RecruiterDashboardStatsDto;
import get_hired.repository.ApplicationRepository;
import get_hired.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecruiterAnalyticsService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public RecruiterAnalyticsService(
            JobRepository jobRepository,
            ApplicationRepository applicationRepository
    ) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public RecruiterDashboardStatsDto getDashboardStats(String recruiterId) {

        long totalJobs = jobRepository.countByRecruiter_Id(recruiterId);
        long totalApplications =
                applicationRepository
                        .countApplicationsPerJob(recruiterId)
                        .stream()
                        .mapToLong(JobApplicationCountDto::getApplicantsCount)
                        .sum();

        return RecruiterDashboardStatsDto.builder()
                .totalJobs(totalJobs)
                .totalApplications(totalApplications)
                .build();
    }

    public List<JobApplicationCountDto> getApplicationsPerJob(
            String recruiterId
    ) {
        return applicationRepository
                .countApplicationsPerJob(recruiterId);
    }
}
