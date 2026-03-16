"use server";

import { prisma } from "@/app/lib/db";
import { requireSession } from "@/app/lib/requireAuth";
import { z } from "zod";

const HourSchema = z.object({
  date: z.string().min(4),
  hours: z.coerce.number().min(0.25).max(24),
  activityType: z.string().min(2).max(200),
  location: z.string().min(2).max(200),
  notes: z.string().min(5).max(4000),
});

export type HourSubmitState =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function submitHours(
  _prev: HourSubmitState | null,
  formData: FormData,
): Promise<HourSubmitState> {
  const session = await requireSession();

  const parsed = HourSchema.safeParse({
    date: formData.get("date"),
    hours: formData.get("hours"),
    activityType: formData.get("activityType"),
    location: formData.get("location"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return { ok: false, message: "Please check the form fields and try again." };
  }

  const d = new Date(parsed.data.date);
  if (Number.isNaN(d.getTime())) {
    return { ok: false, message: "Please enter a valid date." };
  }

  await prisma.hourLog.create({
    data: {
      userId: session.userId,
      date: d,
      hours: parsed.data.hours,
      activityType: parsed.data.activityType,
      location: parsed.data.location,
      notes: parsed.data.notes,
    },
  });

  return {
    ok: true,
    message:
      "Hours submitted! An administrator will review and approve them before they count toward your total.",
  };
}

