"use server";

import { prisma } from "@/app/lib/db";
import { requireSession } from "@/app/lib/requireAuth";
import { z } from "zod";

const ProfileSchema = z.object({
  name: z.string().min(2).max(100),
  school: z.string().max(200).optional().or(z.literal("")),
  availability: z.string().max(2000).optional().or(z.literal("")),
});

export type ProfileState =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function updateProfile(
  _prev: ProfileState | null,
  formData: FormData,
): Promise<ProfileState> {
  const session = await requireSession();
  const parsed = ProfileSchema.safeParse({
    name: formData.get("name"),
    school: formData.get("school"),
    availability: formData.get("availability"),
  });
  if (!parsed.success) return { ok: false, message: "Please check the form." };

  await prisma.user.update({
    where: { id: session.userId },
    data: {
      name: parsed.data.name,
      profile: {
        upsert: {
          create: {
            school: parsed.data.school || null,
            availability: parsed.data.availability || null,
          },
          update: {
            school: parsed.data.school || null,
            availability: parsed.data.availability || null,
          },
        },
      },
    },
  });

  return { ok: true, message: "Profile updated." };
}

