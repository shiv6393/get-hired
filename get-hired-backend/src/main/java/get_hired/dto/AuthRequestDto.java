package get_hired.dto;

import get_hired.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequestDto {
    private String email;
    private String password;
    private Role role;
    private String fullName;
    private String companyName;
}
