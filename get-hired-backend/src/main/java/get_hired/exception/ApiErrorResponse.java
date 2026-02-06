package get_hired.exception;

import java.time.Instant;

public class ApiErrorResponse {

    private Instant timestamp;
    private int status;
    private String error;
    private String message;
    private String path;

    public ApiErrorResponse(
            int status,
            String error,
            String message,
            String path
    ) {
        this.timestamp = Instant.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    // getters
}
