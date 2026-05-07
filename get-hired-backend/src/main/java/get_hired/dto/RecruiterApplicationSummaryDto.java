package get_hired.dto;

import get_hired.entity.Application;
import get_hired.entity.ApplicationStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
public class RecruiterApplicationSummaryDto {

    private String id;
    private String jobId;
    private String jobTitle;
    private String candidateEmail;
    private String resumeUrl;
    private String coverLetter;
    private Instant appliedAt;
    private ApplicationStatus status;

    public static RecruiterApplicationSummaryDto fromEntity(Application application, String resumeUrl) {
        return RecruiterApplicationSummaryDto.builder()
                .id(application.getId())
                .jobId(application.getJob().getId())
                .jobTitle(application.getJob().getTitle())
                .candidateEmail(application.getCandidateEmail())
                .resumeUrl(resumeUrl)
                .coverLetter(application.getCoverLetter())
                .appliedAt(application.getAppliedAt())
                .status(application.getStatus())
                .build();
    }
}
