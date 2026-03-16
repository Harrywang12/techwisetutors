"use server";

import { prisma } from "@/app/lib/db";
import { z } from "zod";
import { ReviewStatus } from "@prisma/client";

const ApplicationSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  school: z.string().min(2).max(200),
  grade: z.string().min(1).max(50),
  whyVolunteer: z.string().min(10).max(4000),
  techExperience: z.string().min(5).max(4000),
  availability: z.string().min(2).max(2000),
  pastVolunteerExperience: z.string().min(1).max(4000),
});

export type VolunteerApplyState =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function submitVolunteerApplication(
  _prev: VolunteerApplyState | null,
  formData: FormData,
): Promise<VolunteerApplyState> {
  const parsed = ApplicationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    school: formData.get("school"),
    grade: formData.get("grade"),
    whyVolunteer: formData.get("whyVolunteer"),
    techExperience: formData.get("techExperience"),
    availability: formData.get("availability"),
    pastVolunteerExperience: formData.get("pastVolunteerExperience"),
  });

  if (!parsed.success) {
    return { ok: false, message: "Please check the form fields and try again." };
  }

  const email = parsed.data.email.toLowerCase();

  await prisma.volunteerApplication.upsert({
    where: { email },
    create: {
      status: ReviewStatus.PENDING,
      ...parsed.data,
      email,
    },
    update: {
      status: ReviewStatus.PENDING,
      reviewNotes: null,
      ...parsed.data,
      email,
    },
  });

  return {
    ok: true,
    message:
      "Application submitted! An administrator will review it. Approval is required before you can create a volunteer login.",
  };
}

