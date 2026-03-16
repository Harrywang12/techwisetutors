"use server";

import { prisma } from "@/app/lib/db";
import { z } from "zod";

const staffMembers = ["Maysam", "Matthew", "Arvin", "Blair", "Colin", "Andy"] as const;

const BookingSchema = z.object({
  staffMember: z.enum(staffMembers),
  scheduledAt: z.string().datetime(),
  requesterName: z.string().min(2).max(100),
  requesterEmail: z.string().email(),
  helpWith: z.string().min(5).max(2000),
});

export type BookingActionState =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function createBooking(
  _prev: BookingActionState | null,
  formData: FormData,
): Promise<BookingActionState> {
  const parsed = BookingSchema.safeParse({
    staffMember: formData.get("staffMember"),
    scheduledAt: formData.get("scheduledAt"),
    requesterName: formData.get("requesterName"),
    requesterEmail: formData.get("requesterEmail"),
    helpWith: formData.get("helpWith"),
  });

  if (!parsed.success) {
    return { ok: false, message: "Please check the form fields and try again." };
  }

  await prisma.booking.create({
    data: {
      staffMember: parsed.data.staffMember,
      scheduledAt: new Date(parsed.data.scheduledAt),
      requesterName: parsed.data.requesterName,
      requesterEmail: parsed.data.requesterEmail,
      helpWith: parsed.data.helpWith,
    },
  });

  return {
    ok: true,
    message:
      "Thanks! Your session request has been booked. We’ll follow up by email soon.",
  };
}

export async function getStaffMembers() {
  return [...staffMembers];
}

