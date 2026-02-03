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
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String companyName;
    private String email;
    private String website;
    private String location;

    @OneToMany(mappedBy = "recruiter")
    private List<Job> jobs = new ArrayList<>();
}
