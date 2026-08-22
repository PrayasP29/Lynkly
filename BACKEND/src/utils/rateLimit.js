// ponytail: in-memory state — lost on restart, not shared across instances; swap Map for Redis when Render scales past 1 instance
const BURST_MAX = 3;
const BURST_MS = 10_000;
const FAIL_MAX = 5;
const LOCK_MS = 5 * 60 * 60 * 1000;

const bursts = new Map();   // "ip:route" -> {count, resetAt}
const fails = new Map();    // "email|ip" -> {count, lockedUntil}
let lastSweep = Date.now();

function sweep() {
    const now = Date.now();
    if (now - lastSweep < 60_000) return;
    lastSweep = now;
    for (const [k, v] of bursts) if (v.resetAt <= now) bursts.delete(k);
    for (const [k, v] of fails) if (v.lockedUntil && v.lockedUntil <= now) fails.delete(k);
}

export const failKey = (req) => {
    const email = String(req.body?.email || "").trim().toLowerCase();
    return `${email}|${req.ip}`;
};

// 3 requests / 10 seconds per IP per route
export const burstLimit = (req, res, next) => {
    sweep();
    const key = `${req.ip}:${req.originalUrl.split("?")[0]}`;
    const now = Date.now();
    let b = bursts.get(key);
    if (!b || b.resetAt <= now) {
        b = { count: 0, resetAt: now + BURST_MS };
        bursts.set(key, b);
    }
    b.count++;
    if (b.count > BURST_MAX) {
        res.set("Retry-After", String(Math.ceil((b.resetAt - now) / 1000)));
        return res.status(429).json({ message: "Too many requests. Please slow down and try again shortly." });
    }
    next();
};

// reject if this email+source is under a 5-hour lockout
export const lockoutGuard = (req, res, next) => {
    const f = fails.get(failKey(req));
    if (f?.lockedUntil > Date.now()) {
        res.set("Retry-After", String(Math.ceil((f.lockedUntil - Date.now()) / 1000)));
        return res.status(429).json({ message: "Too many failed attempts. Please try again after the lockout period." });
    }
    next();
};

export const recordFailure = (req) => {
    sweep();
    const key = failKey(req);
    const f = fails.get(key) || { count: 0, lockedUntil: null };
    f.count++;
    if (f.count >= FAIL_MAX && !f.lockedUntil) f.lockedUntil = Date.now() + LOCK_MS;
    fails.set(key, f);
};

export const clearFailures = (req) => {
    fails.delete(failKey(req));
};
