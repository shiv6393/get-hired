package get_hired.dto;

import get_hired.entity.Job;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JobDetailsResponseDto {

    private String id;
    private String title;
    private String description;
    private String company;
    private String location;
    private long applicantsCount;

    public static JobDetailsResponseDto fromEntity(
            Job job,
            long applicantsCount
    ) {
        return JobDetailsResponseDto.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .company(job.getRecruiter().getCompanyName())
                .location(job.getLocation())
                .applicantsCount(applicantsCount)
                .build();
    }
}
