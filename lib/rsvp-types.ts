export const attendanceStatuses = ["attending", "maybe", "absent"] as const;

export type AttendanceStatus = (typeof attendanceStatuses)[number];

export type RsvpInput = {
  fullName: string;
  contact: string;
  attendance: AttendanceStatus;
  partySize: number;
  guestNames: string[];
  note: string;
};

export type RsvpRecord = RsvpInput & {
  id: string;
  submittedAt: string;
};

export type RsvpSummary = {
  totalResponses: number;
  attendingGuests: number;
  maybeGuests: number;
  regrets: number;
};

export type RsvpListResponse = {
  summary: RsvpSummary;
  records: RsvpRecord[];
};
