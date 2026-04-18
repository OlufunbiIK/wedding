import "server-only";

import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  attendanceStatuses,
  type AttendanceStatus,
  type RsvpInput,
  type RsvpListResponse,
  type RsvpRecord,
} from "@/lib/rsvp-types";

const dataDirectory = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataDirectory, "rsvps.ndjson");
const allowedAttendance = new Set<AttendanceStatus>(attendanceStatuses);

export class RsvpValidationError extends Error {}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanGuestNames(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => cleanText(entry, 80))
    .filter(Boolean)
    .slice(0, 7);
}

function cleanPartySize(value: unknown, attendance: AttendanceStatus) {
  if (attendance === "absent") {
    return 0;
  }

  const numericValue =
    typeof value === "number" ? value : Number.parseInt(String(value), 10);

  if (!Number.isFinite(numericValue)) {
    return 1;
  }

  return Math.min(Math.max(numericValue, 1), 8);
}

function buildSummary(records: RsvpRecord[]) {
  return records.reduce<RsvpListResponse["summary"]>(
    (summary, record) => {
      summary.totalResponses += 1;

      if (record.attendance === "attending") {
        summary.attendingGuests += record.partySize;
      } else if (record.attendance === "maybe") {
        summary.maybeGuests += record.partySize;
      } else {
        summary.regrets += 1;
      }

      return summary;
    },
    {
      totalResponses: 0,
      attendingGuests: 0,
      maybeGuests: 0,
      regrets: 0,
    },
  );
}

function validateInput(input: unknown): RsvpInput {
  if (!input || typeof input !== "object") {
    throw new RsvpValidationError("Please complete the RSVP form.");
  }

  const record = input as Record<string, unknown>;
  const fullName = cleanText(record.fullName, 120);
  const contact = cleanText(record.contact, 160);
  const attendance = cleanText(record.attendance, 24) as AttendanceStatus;
  const note = cleanText(record.note, 500);

  if (fullName.length < 2) {
    throw new RsvpValidationError("Please enter your name.");
  }

  if (contact.length < 5) {
    throw new RsvpValidationError(
      "Please leave an email address or WhatsApp number.",
    );
  }

  if (!allowedAttendance.has(attendance)) {
    throw new RsvpValidationError("Please choose an RSVP response.");
  }

  const partySize = cleanPartySize(record.partySize, attendance);
  const guestNames = cleanGuestNames(record.guestNames).slice(
    0,
    Math.max(partySize - 1, 0),
  );

  return {
    fullName,
    contact,
    attendance,
    partySize,
    guestNames,
    note,
  };
}

export async function appendRsvp(input: unknown) {
  const validatedInput = validateInput(input);

  const storedRecord: RsvpRecord = {
    ...validatedInput,
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
  };

  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.appendFile(dataFilePath, `${JSON.stringify(storedRecord)}\n`, "utf8");

  return storedRecord;
}

export async function listRsvps(): Promise<RsvpListResponse> {
  let fileContents = "";

  try {
    fileContents = await fs.readFile(dataFilePath, "utf8");
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;

    if (code === "ENOENT") {
      return {
        summary: {
          totalResponses: 0,
          attendingGuests: 0,
          maybeGuests: 0,
          regrets: 0,
        },
        records: [],
      };
    }

    throw error;
  }

  const records = fileContents
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as RsvpRecord)
    .sort((left, right) => right.submittedAt.localeCompare(left.submittedAt));

  return {
    summary: buildSummary(records),
    records,
  };
}
