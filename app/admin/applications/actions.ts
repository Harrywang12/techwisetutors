"use server";

import { prisma } from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/requireAuth";
import { ReviewStatus } from "@prisma/client";
import { z } from "zod";

const ReviewSchema = z.object({
  id: z.string().min(5),
  note: z.string().max(2000).optional().or(z.literal("")),
});

export async function approveApplication(formData: FormData) {
  await requireAdmin();
  const parsed = ReviewSchema.safeParse({
    id: formData.get("id"),
    note: formData.get("note"),
  });
  if (!parsed.success) return;

  await prisma.volunteerApplication.update({
    where: { id: parsed.data.id },
    data: {
      status: ReviewStatus.APPROVED,
      reviewNotes: parsed.data.note || null,
    },
  });
}

export async function rejectApplication(formData: FormData) {
  await requireAdmin();
  const parsed = ReviewSchema.safeParse({
    id: formData.get("id"),
    note: formData.get("note"),
  });
  if (!parsed.success) return;

  await prisma.volunteerApplication.update({
    where: { id: parsed.data.id },
    data: {
      status: ReviewStatus.REJECTED,
      reviewNotes: parsed.data.note || null,
    },
  });
}

