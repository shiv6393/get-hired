package get_hired.dto;

import get_hired.entity.Application;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ApplicantResponseDto {

    private String  id;
    private String applicantName;
    private String email;
    private String resumeUrl;
    private LocalDateTime appliedAt;

    public static ApplicantResponseDto fromEntity(Application app) {
        return ApplicantResponseDto.builder()
                .id(app.getId())
                .applicantName(app.getApplicantName())
                .email(app.getEmail())
                .resumeUrl(app.getResumeUrl())
                .appliedAt(app.getAppliedAt())
                .build();
    }
}
