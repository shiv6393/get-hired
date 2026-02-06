package get_hired.dto;

import get_hired.entity.Job;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JobResponseDto {

    private String id;
    private String title;
    private String company;
    private String location;
    private long applicantsCount;

    /**
     * applicantsCount is injected from service layer
     */
    public static JobResponseDto fromEntity(Job job, long applicantsCount) {
        return JobResponseDto.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getRecruiter().getCompanyName())
                .location(job.getLocation())
                .applicantsCount(applicantsCount)
                .build();
    }
}
