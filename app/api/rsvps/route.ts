import { NextRequest, NextResponse } from "next/server";
import {
  RsvpValidationError,
  appendRsvp,
  listRsvps,
} from "@/lib/rsvp-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function createJsonResponse(payload: unknown, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const record = await appendRsvp(payload);

    return createJsonResponse(
      {
        message:
          "Your RSVP has been received with thanks. We look forward to celebrating with you.",
        record,
      },
      201,
    );
  } catch (error) {
    if (error instanceof RsvpValidationError) {
      return createJsonResponse({ error: error.message }, 400);
    }

    console.error("Unable to save RSVP", error);
    return createJsonResponse(
      { error: "We could not save your RSVP just now. Please try again." },
      500,
    );
  }
}

export async function GET(request: NextRequest) {
  const organizerPassword =
    process.env.EVENT_PLANNER_PASSWORD ?? process.env.RSVP_ADMIN_PASSWORD;
  const providedPassword =
    request.headers.get("x-event-planner-password") ??
    request.headers.get("x-rsvp-password");

  if (!organizerPassword) {
    return createJsonResponse(
      {
        error:
          "Planner access is not configured yet. Add EVENT_PLANNER_PASSWORD or RSVP_ADMIN_PASSWORD to your environment.",
      },
      503,
    );
  }

  if (providedPassword !== organizerPassword) {
    return createJsonResponse(
      { error: "That password did not unlock the planner list." },
      401,
    );
  }

  try {
    return createJsonResponse(await listRsvps());
  } catch (error) {
    console.error("Unable to read RSVPs", error);
    return createJsonResponse(
      { error: "We could not load the planner list just now." },
      500,
    );
  }
}
