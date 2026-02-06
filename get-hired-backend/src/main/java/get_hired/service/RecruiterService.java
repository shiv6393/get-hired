package get_hired.service;

import get_hired.entity.Recruiter;
import get_hired.repository.RecruiterRepository;
import org.springframework.stereotype.Service;

@Service
public class RecruiterService {

    private final RecruiterRepository recruiterRepository;

    public RecruiterService(RecruiterRepository recruiterRepository) {
        this.recruiterRepository = recruiterRepository;
    }

    public Recruiter getRecruiterById(String recruiterId) {
        return recruiterRepository.findById(recruiterId)
                .orElseThrow(() ->
                        new IllegalStateException("Recruiter profile not found"));
    }

    public Recruiter createRecruiterProfile(Recruiter recruiter) {
        return recruiterRepository.save(recruiter);
    }
}
