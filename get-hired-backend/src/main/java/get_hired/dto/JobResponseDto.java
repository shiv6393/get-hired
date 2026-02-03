package get_hired.dto;

import get_hired.entity.Job;
import lombok.Builder;
@Builder
public class JobResponseDto {
    private String id;
    private String title;
    private String company;
    private String location;
    private long applicantsCount;

    public static JobResponseDto fromEntity(Job job) {
        return JobResponseDto.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getRecruiter().)
                .location(job.getLocation())
                .applicantsCount(job.getApplications().size())
                .build();
    }
}
