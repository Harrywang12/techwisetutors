"use server";

import "dotenv/config";
import { prisma } from "@/app/lib/db";
import { hashPassword } from "@/app/lib/password";
import { setSession } from "@/app/lib/session";
import { ReviewStatus, UserRole } from "@prisma/client";
import { z } from "zod";

const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(6).max(200),
});

export type RegisterState =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function volunteerRegister(
  _prev: RegisterState | null,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = RegisterSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { ok: false, message: "Please check the form." };

  const email = parsed.data.email.toLowerCase();

  const application = await prisma.volunteerApplication.findUnique({
    where: { email },
  });

  if (!application || application.status !== ReviewStatus.APPROVED) {
    return {
      ok: false,
      message:
        "This email has not been approved yet. Please submit an application first (or wait for approval).",
    };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return {
      ok: false,
      message: "An account already exists for this email. Please sign in.",
    };
  }

  const user = await prisma.user.create({
    data: {
      role: UserRole.VOLUNTEER,
      isActive: true,
      name: parsed.data.name,
      email,
      passwordHash: await hashPassword(parsed.data.password),
      profile: {
        create: {
          school: application.school,
          availability: application.availability,
        },
      },
    },
  });

  await setSession({ userId: user.id, role: user.role });

  return { ok: true, message: "Account created. Redirecting to your dashboard..." };
}

