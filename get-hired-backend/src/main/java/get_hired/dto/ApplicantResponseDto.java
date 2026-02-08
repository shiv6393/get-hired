package get_hired.dto;

import get_hired.entity.Application;
import get_hired.entity.ApplicationStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
public class ApplicantResponseDto {

    private String id;
    private String email;
    private String resumeUrl;
    private Instant appliedAt;
    private ApplicationStatus status;

    public static ApplicantResponseDto fromEntity(Application app) {
        return ApplicantResponseDto.builder()
                .id(app.getId())
                .email(app.getCandidateEmail())
                .resumeUrl(app.getResumeUrl())
                .appliedAt(app.getAppliedAt())
                .status(app.getStatus())
                .build();
    }
}
