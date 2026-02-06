package get_hired.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JobApplicationCountDto {

    private String jobId;
    private String jobTitle;
    private long applicantsCount;
}
