const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegisterInput = (req, res, next) => {
    const { name, email, password } = req.body;
    const missingFields = [];

    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(", ")}`,
        });
    }

    if (!EMAIL_RE.test(String(email))) {
        return res.status(400).json({ message: "Invalid email address" });
    }

    if (String(password).length < 8 || String(password).length > 128) {
        return res.status(400).json({ message: "Password must be 8-128 characters" });
    }

    next();
};

export const validateLoginInput = (req, res, next) => {
    const { email, password } = req.body;
    const missingFields = [];

    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(", ")}`,
        });
    }

    next();
};
