"use server";

import { prisma } from "@/app/lib/db";
import { verifyPassword } from "@/app/lib/password";
import { setSession } from "@/app/lib/session";
import { z } from "zod";
import { UserRole } from "@prisma/client";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(200),
});

export type AdminLoginState =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function adminLogin(
  _prev: AdminLoginState | null,
  formData: FormData,
): Promise<AdminLoginState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { ok: false, message: "Invalid login details." };

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive || user.role !== UserRole.ADMIN) {
    return { ok: false, message: "Invalid login." };
  }

  const ok = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!ok) return { ok: false, message: "Invalid login." };

  await setSession({ userId: user.id, role: user.role });

  return { ok: true, message: "Logged in. Redirecting..." };
}

