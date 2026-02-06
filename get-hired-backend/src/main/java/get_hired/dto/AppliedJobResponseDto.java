package get_hired.dto;

import get_hired.entity.Application;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
public class AppliedJobResponseDto {

    private String applicationId;
    private String jobId;
    private String jobTitle;
    private String company;
    private Instant appliedAt;

    public static AppliedJobResponseDto fromEntity(Application app) {
        return AppliedJobResponseDto.builder()
                .applicationId(app.getId())
                .jobId(app.getJob().getId())
                .jobTitle(app.getJob().getTitle())
                .company(app.getJob().getRecruiter().getCompanyName())
                .appliedAt(app.getAppliedAt())
                .build();
    }
}
