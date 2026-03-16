"use server";

import { prisma } from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/requireAuth";
import { z } from "zod";

const ShiftSchema = z.object({
  title: z.string().min(2).max(200),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  location: z.string().min(2).max(200),
  details: z.string().max(4000).optional().or(z.literal("")),
});

export async function createShift(formData: FormData) {
  await requireAdmin();
  const parsed = ShiftSchema.safeParse({
    title: formData.get("title"),
    startAt: formData.get("startAt"),
    endAt: formData.get("endAt"),
    location: formData.get("location"),
    details: formData.get("details"),
  });
  if (!parsed.success) return;
  await prisma.shift.create({
    data: {
      title: parsed.data.title,
      startAt: new Date(parsed.data.startAt),
      endAt: new Date(parsed.data.endAt),
      location: parsed.data.location,
      details: parsed.data.details || null,
    },
  });
}

const AssignSchema = z.object({
  shiftId: z.string().min(5),
  userId: z.string().min(5),
});

export async function assignVolunteer(formData: FormData) {
  await requireAdmin();
  const parsed = AssignSchema.safeParse({
    shiftId: formData.get("shiftId"),
    userId: formData.get("userId"),
  });
  if (!parsed.success) return;
  await prisma.shiftAssignment.upsert({
    where: { shiftId_userId: { shiftId: parsed.data.shiftId, userId: parsed.data.userId } },
    create: { shiftId: parsed.data.shiftId, userId: parsed.data.userId },
    update: {},
  });
}

export async function unassignVolunteer(formData: FormData) {
  await requireAdmin();
  const parsed = AssignSchema.safeParse({
    shiftId: formData.get("shiftId"),
    userId: formData.get("userId"),
  });
  if (!parsed.success) return;
  await prisma.shiftAssignment.delete({
    where: { shiftId_userId: { shiftId: parsed.data.shiftId, userId: parsed.data.userId } },
  });
}

