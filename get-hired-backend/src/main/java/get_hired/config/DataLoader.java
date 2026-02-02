package get_hired.config;

import get_hired.entity.Job;
import get_hired.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class DataLoader {

    private final JobRepository jobRepository;

    @PostConstruct
    public void load() {
        if (jobRepository.count() == 0) {
            jobRepository.save(
                    Job.builder()
                            .title("Java Developer")
                            .company("GetHired")
                            .location("Remote")
                            .type("Full-time")
                            .description("Spring Boot developer required")
                            .build()
            );
        }
    }
}
