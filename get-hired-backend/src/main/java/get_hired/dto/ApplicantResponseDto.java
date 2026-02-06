package get_hired.dto;

import get_hired.entity.Application;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
public class ApplicantResponseDto {

    private String id;
    private String candidateId;
    private String email;
    private String resumeUrl;
    private Instant appliedAt;

    public static ApplicantResponseDto fromEntity(Application app) {
        return ApplicantResponseDto.builder()
                .id(app.getId())
                .candidateId(app.getCandidate().getId())
                .email(app.getCandidate().getEmail())
                .resumeUrl(app.getResumeUrl())
                .appliedAt(app.getAppliedAt())
                .build();
    }
}
