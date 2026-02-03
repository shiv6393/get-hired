package get_hired.entity;
import jakarta.persistence.*;
import java.time.Instant;
@Entity
@Table(name = "applications",
        uniqueConstraints = @UniqueConstraint(columnNames = {"job_id", "candidate_email"}))
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    private String candidateEmail;
    private String resumeUrl;
    private String coverLetter;

    private Instant appliedAt;
}
