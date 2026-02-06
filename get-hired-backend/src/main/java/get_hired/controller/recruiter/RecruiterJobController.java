package get_hired.controller.recruiter;

import get_hired.dto.ApplicantResponseDto;
import get_hired.dto.JobResponseDto;
import get_hired.entity.Recruiter;
import get_hired.repository.RecruiterRepository;
import get_hired.service.RecruiterJobService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiters")
public class RecruiterController {

    private final RecruiterRepository recruiterRepository;

    public RecruiterController(RecruiterRepository recruiterRepository) {
        this.recruiterRepository = recruiterRepository;
    }

    @PostMapping
    public ResponseEntity<Void> createProfile(
            @RequestBody RecruiterRequest request,
            Authentication auth
    ) {
        String userId = auth.getName();

        Recruiter recruiter = new Recruiter();
        recruiter.setId(userId);
        recruiter.setCompanyName(request.getCompanyName());
        recruiter.setWebsite(request.getWebsite());
        recruiter.setLocation(request.getLocation());

        recruiterRepository.save(recruiter);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
