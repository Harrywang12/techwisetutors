import { cookies } from "next/headers";

export async function setSession(type: "volunteer" | "admin", id: string) {
  const cookieStore = await cookies();
  cookieStore.set(`${type}_session`, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function getSession(type: "volunteer" | "admin"): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(`${type}_session`)?.value || null;
}

export async function clearSession(type: "volunteer" | "admin") {
  const cookieStore = await cookies();
  cookieStore.delete(`${type}_session`);
}
