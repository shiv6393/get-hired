package get_hired.repository;
import get_hired.entity.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruiterRepository extends JpaRepository<Recruiter, String> {

    boolean existsById(String id);
}
