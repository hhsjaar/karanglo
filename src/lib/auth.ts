import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key-at-least-32-chars-long";
const key = new TextEncoder().encode(SECRET_KEY);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ userId, expires });

    // Save the session in a cookie
    (await cookies()).set("admin_session", session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
}

export async function getSession() {
    const session = (await cookies()).get("admin_session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function deleteSession() {
    (await cookies()).set("admin_session", "", {
        expires: new Date(0),
        path: "/",
    });
}
