package get_hired.repository;

import get_hired.entity.Application;
import get_hired.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application,Long> {
    List<Application> findByJob(Job job);
}
