package get_hired.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    private String company;
    private String location;
    private String type;

    @Column(length = 2000)
    private String description;

    private LocalDateTime createdAt = LocalDateTime.now();
}
