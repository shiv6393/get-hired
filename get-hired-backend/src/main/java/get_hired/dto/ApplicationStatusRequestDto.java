package get_hired.dto;

import get_hired.entity.ApplicationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationStatusRequestDto {

    @NotNull
    private ApplicationStatus status;
}
