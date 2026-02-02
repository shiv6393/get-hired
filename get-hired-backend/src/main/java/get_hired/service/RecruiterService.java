package get_hired.service;

import get_hired.dto.ApplicationResponseDto;
import get_hired.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecruiterService {

    private final ApplicationRepository applicationRepository;

    public RecruiterService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public List<ApplicationResponseDto> getApplicantsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId)
                .stream()
                .map(ApplicationResponseDto::new)
                .toList();
    }
}
