package get_hired.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(
        name = "applications",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"job_id", "candidate_id"}
        )
)
@Getter
@Setter
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private User candidate;

    @Column(nullable = false)
    private String resumeUrl;

    @Column(length = 2000)
    private String coverLetter;

    @Column(nullable = false, updatable = false)
    private Instant appliedAt;
}
