import re

class Security:
    @staticmethod
    def sanitize_input(user_input):
        # Basic prompt injection protection
        # Remove common injection patterns
        patterns = [
            r"ignore previous instructions",
            r"system override",
        ]
        sanitized = user_input
        for pattern in patterns:
            sanitized = re.sub(pattern, "", sanitized, flags=re.IGNORECASE)
        return sanitized
