package get_hired.dto;

import get_hired.entity.Application;

import java.time.LocalDateTime;

public class ApplicationResponseDto {

    private Long id;
    private String applicantName;
    private String email;
    private String resumeUrl;
    private LocalDateTime appliedAt;

    public ApplicationResponseDto(Application app) {
        this.id = app.getId();
        this.applicantName = app.getApplicantName();
        this.email = app.getEmail();
        this.resumeUrl = app.getResumeUrl();
        this.appliedAt = app.getAppliedAt();
    }
}
