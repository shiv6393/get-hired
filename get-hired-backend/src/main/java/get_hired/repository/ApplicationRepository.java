package get_hired.repository;

import get_hired.entity.Application;
import get_hired.entity.Job;
import get_hired.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, String> {

    // Prevent duplicate applications
    boolean existsByJobAndCandidate(Job job, User candidate);

    // Fetch application (if needed)
    Optional<Application> findByJobAndCandidate(Job job, User candidate);

    // ✅ INDUSTRY STANDARD: applicant count per job
    long countByJob(Job job);
    List<Application> findAllByJob(Job job);
}
