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
    private String jobId;
    private String jobTitle;
    private String email;
    private String resumeUrl;
    private String coverLetter;
    private Instant appliedAt;
    private ApplicationStatus status;

    public static ApplicantResponseDto fromEntity(Application app, String resumeUrl) {
        return ApplicantResponseDto.builder()
                .id(app.getId())
                .jobId(app.getJob().getId())
                .jobTitle(app.getJob().getTitle())
                .email(app.getCandidateEmail())
                .resumeUrl(resumeUrl)
                .coverLetter(app.getCoverLetter())
                .appliedAt(app.getAppliedAt())
                .status(app.getStatus())
                .build();
    }
}
