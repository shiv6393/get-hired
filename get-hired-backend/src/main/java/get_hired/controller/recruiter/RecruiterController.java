package get_hired.controller.recruiter;
import get_hired.entity.Recruiter;
import get_hired.entity.User;
import get_hired.service.RecruiterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiters")
public class RecruiterController {

    private final RecruiterService recruiterService;

    public RecruiterController(RecruiterService recruiterService) {
        this.recruiterService = recruiterService;
    }

    // Create recruiter profile (Phase-2: user from JWT)
    @PostMapping
    public ResponseEntity<Void> createRecruiterProfile(
            @RequestBody Recruiter recruiter,
            Authentication authentication
    ) {
        String userId = authentication.getName();

        User user = new User();
        user.setId(userId);

        recruiter.setId(userId);
        recruiter.setUser(user);

        recruiterService.createRecruiterProfile(recruiter);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
