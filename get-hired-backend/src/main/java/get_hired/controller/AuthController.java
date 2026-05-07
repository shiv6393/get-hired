package get_hired.controller;

import get_hired.dto.AuthRequestDto;
import get_hired.dto.AuthResponseDto;
import get_hired.entity.Recruiter;
import get_hired.entity.Role;
import get_hired.entity.User;
import get_hired.exception.BadRequestException;
import get_hired.service.RecruiterService;
import get_hired.repository.UserRepository;
import get_hired.security.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RecruiterService recruiterService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            RecruiterService recruiterService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.recruiterService = recruiterService;
    }

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<Void> register(@RequestBody AuthRequestDto dto) {
        if (dto == null || dto.getEmail() == null || dto.getPassword() == null) {
            throw new BadRequestException("Email and password are required");
        }

//        String email = normalizeEmail(dto.getEmail());
        String email=dto.getEmail();

        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email already exists");
        }

        Role role = dto.getRole() == null ? Role.CANDIDATE : dto.getRole();

        if (role == Role.RECRUITER
                && (dto.getCompanyName() == null || dto.getCompanyName().isBlank())) {
            throw new BadRequestException("Company name is required for recruiter registration");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(role);

        User savedUser = userRepository.save(user);

        if (role == Role.RECRUITER) {
            Recruiter recruiter = new Recruiter();
            recruiter.setUser(savedUser);
            recruiter.setCompanyName(dto.getCompanyName().trim());
            recruiterService.createRecruiterProfile(recruiter);
        }

        return ResponseEntity.status(201).build();
    }

    @PostMapping("/login")
    public AuthResponseDto login(@RequestBody AuthRequestDto dto) {
        if (dto == null || dto.getEmail() == null || dto.getPassword() == null) {
            throw new BadRequestException("Email and password are required");
        }

//        String email = normalizeEmail(dto.getEmail());
        String email=dto.getEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        if (!passwordMatches(dto.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid credentials");
        }

        if (user.getRole() == null) {
            throw new BadRequestException("User role is missing. Please contact support.");
        }

        String token = jwtUtil.generateToken(
                user.getId(),
                user.getRole().name()
        );

        return AuthResponseDto.builder()
                .token(token)
                .role(user.getRole().name())
                .build();
    }

    private String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase();
    }

    /**
     * Support legacy bcrypt hashes that may start with "$2s$" by normalizing to "$2a$".
     */
    private boolean passwordMatches(String raw, String encoded) {
        if (passwordEncoder.matches(raw, encoded)) {
            return true;
        }

        if (encoded != null && encoded.startsWith("$2s$")) {
            String normalized = "$2a$" + encoded.substring(4);
            return passwordEncoder.matches(raw, normalized);
        }

        return false;
    }
}
