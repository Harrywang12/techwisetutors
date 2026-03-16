"use server";

import { prisma } from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/requireAuth";
import { z } from "zod";

const NoteSchema = z.object({
  id: z.string().min(5),
  adminNotes: z.string().max(4000).optional().or(z.literal("")),
});

export async function updateBookingNotes(formData: FormData) {
  await requireAdmin();
  const parsed = NoteSchema.safeParse({
    id: formData.get("id"),
    adminNotes: formData.get("adminNotes"),
  });
  if (!parsed.success) return;
  await prisma.booking.update({
    where: { id: parsed.data.id },
    data: { adminNotes: parsed.data.adminNotes || null },
  });
}

const ShiftFromBookingSchema = z.object({
  bookingId: z.string().min(5),
  location: z.string().min(2).max(200),
});

export async function createShiftFromBooking(formData: FormData) {
  await requireAdmin();
  const parsed = ShiftFromBookingSchema.safeParse({
    bookingId: formData.get("bookingId"),
    location: formData.get("location"),
  });
  if (!parsed.success) return;

  const booking = await prisma.booking.findUnique({
    where: { id: parsed.data.bookingId },
    include: { shift: true },
  });
  if (!booking) return;
  if (booking.shift) return;

  const startAt = booking.scheduledAt;
  const endAt = new Date(startAt.getTime() + 60 * 60 * 1000);

  await prisma.shift.create({
    data: {
      title: `Tutoring Session • Staff: ${booking.staffMember}`,
      startAt,
      endAt,
      location: parsed.data.location,
      details: `Requester: ${booking.requesterName} (${booking.requesterEmail})\n\nNeeds help with: ${booking.helpWith}`,
      booking: { connect: { id: booking.id } },
    },
  });
}

