package get_hired.config;
import get_hired.entity.Job;
import get_hired.repository.JobRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader {

    private final JobRepository jobRepository;

    @PostConstruct
    public void loadData() {
        if (jobRepository.count() == 0) {
            jobRepository.save(
                    Job.builder()
                            .title("Frontend Developer")
                            .company("Google")
                            .location("Bangalore")
                            .type("Full-time")
                            .description("React developer with strong UI skills")
                            .build()
            );

            jobRepository.save(
                    Job.builder()
                            .title("Backend Engineer")
                            .company("Amazon")
                            .location("Hyderabad")
                            .type("Full-time")
                            .description("Spring Boot backend engineer")
                            .build()
            );

            jobRepository.save(
                    Job.builder()
                            .title("Software Intern")
                            .company("Microsoft")
                            .location("Remote")
                            .type("Internship")
                            .description("Internship opportunity for final-year students")
                            .build()
            );
        }
    }
}