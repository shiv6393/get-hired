package get_hired.dto;

import get_hired.entity.Job;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobResponse {

    private String id;
    private String title;
    private String location;
    private Double salary;
    private CompanyDto company;

    public static JobResponse fromEntity(Job job) {
        JobResponse res = new JobResponse();
        res.setId(job.getId());
        res.setTitle(job.getTitle());
        res.setLocation(job.getLocation());
        res.setSalary(job.getSalary());

        CompanyDto company = new CompanyDto();
        company.setId(job.getRecruiter().getId());
        company.setName(job.getRecruiter().getCompanyName());

        res.setCompany(company);
        return res;
    }
}
