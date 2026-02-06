package get_hired.repository;

import get_hired.entity.Job;
import get_hired.entity.Recruiter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, String> {

    Page<Job> findAllByRecruiter(Recruiter recruiter, Pageable pageable);

    boolean existsByIdAndRecruiter_Id(String jobId, String recruiterId);
    Page<Job> findAll(Pageable pageable);
    long countByRecruiter_Id(String recruiterId);

}
