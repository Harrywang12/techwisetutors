"use server";

import { prisma } from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/requireAuth";
import { z } from "zod";

const IdSchema = z.object({ id: z.string().min(5) });

export async function deactivateVolunteer(formData: FormData) {
  await requireAdmin();
  const parsed = IdSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) return;
  await prisma.user.update({ where: { id: parsed.data.id }, data: { isActive: false } });
}

export async function activateVolunteer(formData: FormData) {
  await requireAdmin();
  const parsed = IdSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) return;
  await prisma.user.update({ where: { id: parsed.data.id }, data: { isActive: true } });
}

