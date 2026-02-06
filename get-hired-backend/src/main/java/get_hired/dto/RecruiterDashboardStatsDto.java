package get_hired.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RecruiterDashboardStatsDto {

    private long totalJobs;
    private long totalApplications;
}
