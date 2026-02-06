package get_hired.repository;

import get_hired.entity.Application;
import get_hired.entity.Job;
import get_hired.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, String> {

    boolean existsByJobAndCandidate(Job job, User candidate);

    Optional<Application> findByJobAndCandidate(Job job, User candidate);
}
