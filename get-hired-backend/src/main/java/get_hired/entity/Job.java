package get_hired.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String type;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // ✅ Relationship with applications
    @OneToMany(
            mappedBy = "job",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<Application> applications;

    // ✅ Set createdAt automatically
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
