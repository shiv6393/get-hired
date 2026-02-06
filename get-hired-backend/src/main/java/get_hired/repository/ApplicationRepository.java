package get_hired.repository;

import get_hired.dto.JobApplicationCountDto;
import get_hired.entity.Application;
import get_hired.entity.Job;
import get_hired.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, String> {

    // ----------------------------------------
    // Duplicate application prevention
    // ----------------------------------------
    boolean existsByJobAndCandidate(Job job, User candidate);

    Optional<Application> findByJobAndCandidate(Job job, User candidate);

    // ----------------------------------------
    // Aggregations
    // ----------------------------------------
    long countByJob(Job job);

    @Query("""
        SELECT new get_hired.dto.JobApplicationCountDto(
            j.id,
            j.title,
            COUNT(a)
        )
        FROM Application a
        JOIN a.job j
        WHERE j.recruiter.id = :recruiterId
        GROUP BY j.id, j.title
    """)
    List<JobApplicationCountDto> countApplicationsPerJob(
            @Param("recruiterId") String recruiterId
    );

    // ----------------------------------------
    // Fetching
    // ----------------------------------------
    List<Application> findAllByJob(Job job);

    Page<Application> findAllByCandidate(User candidate, Pageable pageable);
}
