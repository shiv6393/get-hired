package get_hired.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recruiters")
@Getter
@Setter
public class Recruiter {

    @Id
    private String id; // SAME AS user.id

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    @Column(nullable = false)
    private String companyName;

    private String website;
    private String location;

    @OneToMany(mappedBy = "recruiter")
    private List<Job> jobs = new ArrayList<>();
}
