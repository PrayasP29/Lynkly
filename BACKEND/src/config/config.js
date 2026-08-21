// ponytail: cross-site cookies need secure+sameSite:none; flip via NODE_ENV=production on the host
const isProd = process.env.NODE_ENV === "production";

export const CookiesOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge:7 * 24 * 60 * 60 * 1000
};

export const RefreshTokenCookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000
};