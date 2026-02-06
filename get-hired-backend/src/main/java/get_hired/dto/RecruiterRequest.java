package get_hired.dto;

import jakarta.validation.constraints.NotBlank;

public class RecruiterRequest {

    @NotBlank(message = "Company name is required")
    private String companyName;

    private String website;
    private String location;

    // getters & setters
}
