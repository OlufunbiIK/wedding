"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import {
  type AttendanceStatus,
  type RsvpListResponse,
  type RsvpRecord,
} from "@/lib/rsvp-types";

const attendanceMessages: Record<
  AttendanceStatus,
  { label: string; message: string }
> = {
  attending: {
    label: "Attending",
    message:
      "What joy. We would be honoured to celebrate with you in person.",
  },
  maybe: {
    label: "Maybe",
    message:
      "We understand that plans can still be settling. We hope the day finds its way onto your calendar.",
  },
  absent: {
    label: "Not Attending",
    message:
      "Thank you for still sending your love. We will feel it, even from afar.",
  },
};

const partySizeOptions = [1, 2, 3, 4, 5, 6];

const defaultForm = {
  fullName: "",
  contact: "",
  attendance: "attending" as AttendanceStatus,
  partySize: "1",
  guestNames: "",
  note: "",
};

function splitGuestNames(value: string) {
  return value
    .split(/\n|,/g)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function formatSubmittedAt(timestamp: string) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

function OrganizerRecord({ record }: { record: RsvpRecord }) {
  return (
    <article className="rounded-[1.6rem] border border-terracotta/12 bg-white/75 p-4 backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-heading text-2xl text-terracotta-deep">
            {record.fullName}
          </p>
          <p className="mt-1 text-sm leading-7 text-ink/70">{record.contact}</p>
        </div>
        <div className="text-right">
          <span className="inline-flex rounded-full border border-terracotta/12 bg-terracotta/8 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-terracotta">
            {attendanceMessages[record.attendance].label}
          </span>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            {formatSubmittedAt(record.submittedAt)}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[0.28fr_1fr]">
        <div>
          <p className="section-eyebrow text-[10px]">Party size</p>
          <p className="mt-2 font-heading text-3xl text-terracotta-deep">
            {record.partySize}
          </p>
        </div>
        <div className="space-y-3">
          {record.guestNames.length > 0 ? (
            <div>
              <p className="section-eyebrow text-[10px]">Guest names</p>
              <p className="mt-2 text-sm leading-7 text-ink/72">
                {record.guestNames.join(", ")}
              </p>
            </div>
          ) : null}

          {record.note ? (
            <div>
              <p className="section-eyebrow text-[10px]">Note</p>
              <p className="mt-2 text-sm leading-7 text-ink/72">{record.note}</p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function RsvpStation() {
  const [form, setForm] = useState(defaultForm);
  const [submitState, setSubmitState] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message:
      "A few small details help the planners prepare your seat, your welcome, and any guests coming with you.",
  });
  const [adminPassword, setAdminPassword] = useState("");
  const [organizerState, setOrganizerState] = useState<{
    status: "locked" | "loading" | "unlocked" | "error";
    message: string;
  }>({
    status: "locked",
    message: "Organizer access is hidden until the correct password is entered.",
  });
  const [organizerData, setOrganizerData] = useState<RsvpListResponse | null>(
    null,
  );

  const partySize = useMemo(() => {
    if (form.attendance === "absent") {
      return 0;
    }

    return Number.parseInt(form.partySize, 10) || 1;
  }, [form.attendance, form.partySize]);

  const guestNamesNeeded = form.attendance !== "absent" && partySize > 1;

  function updateField<Field extends keyof typeof defaultForm>(
    field: Field,
    value: (typeof defaultForm)[Field],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({
      status: "submitting",
      message: "Sending your RSVP with love...",
    });

    try {
      const response = await fetch("/api/rsvps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          contact: form.contact,
          attendance: form.attendance,
          partySize,
          guestNames: splitGuestNames(form.guestNames),
          note: form.note,
        }),
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Unable to send RSVP.");
      }

      setSubmitState({
        status: "success",
        message:
          payload.message ||
          "Your RSVP has been received. Thank you for taking a moment to let us know.",
      });
      setForm(defaultForm);

      if (organizerData && adminPassword) {
        void unlockOrganizerView(adminPassword);
      }
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your RSVP just now.",
      });
    }
  }

  async function unlockOrganizerView(passwordOverride?: string) {
    const passwordToUse = passwordOverride ?? adminPassword;

    if (!passwordToUse.trim()) {
      setOrganizerState({
        status: "error",
        message: "Enter the organizer password to unlock the planner list.",
      });
      return;
    }

    setOrganizerState({
      status: "loading",
      message: "Unlocking the organizer list...",
    });

    try {
      const response = await fetch("/api/rsvps", {
        headers: {
          "x-rsvp-password": passwordToUse,
        },
        cache: "no-store",
      });

      const payload = (await response.json()) as
        | RsvpListResponse
        | { error?: string };

      if (!response.ok || "error" in payload) {
        throw new Error(
          "error" in payload
            ? payload.error || "Unable to unlock the organizer list."
            : "Unable to unlock the organizer list.",
        );
      }

      const unlockedData = payload as RsvpListResponse;

      setOrganizerData(unlockedData);
      setOrganizerState({
        status: "unlocked",
        message: "Organizer list unlocked.",
      });
    } catch (error) {
      setOrganizerData(null);
      setOrganizerState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to unlock the organizer list.",
      });
    }
  }

  const summary = organizerData?.summary;

  return (
    <div className="grid gap-8 xl:grid-cols-[0.96fr_1.04fr]">
      <div className="rounded-[2rem] border border-white/14 bg-white/10 p-5 backdrop-blur sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-eyebrow text-cream-soft/72">Guest RSVP</p>
            <p className="mt-2 max-w-xl text-sm leading-7 text-cream-soft/82">
              A short form for your name, contact, and how many seats to hold.
            </p>
          </div>
          <div
            className="rounded-[1.25rem] border border-white/14 bg-white/10 px-4 py-3 text-sm leading-7 text-cream-soft/88"
            aria-live="polite"
          >
            {attendanceMessages[form.attendance].message}
          </div>
        </div>

        <form className="mt-6 space-y-5" onSubmit={submitRsvp}>
          <div
            className="flex flex-col gap-3 sm:flex-row"
            role="group"
            aria-label="RSVP response options"
          >
            {Object.entries(attendanceMessages).map(([key, response]) => {
              const isActive = form.attendance === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    updateField("attendance", key as AttendanceStatus)
                  }
                  aria-pressed={isActive}
                  className={[
                    "rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em]",
                    isActive
                      ? "border-cream-soft bg-cream-soft text-terracotta-deep shadow-[0_18px_40px_rgba(56,33,26,0.16)]"
                      : "border-cream-soft/35 bg-white/10 text-cream-soft hover:border-cream-soft/70 hover:bg-white/18",
                  ].join(" ")}
                >
                  {response.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cream-soft/72">
                Full name
              </span>
              <input
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                className="w-full rounded-[1.2rem] border border-white/14 bg-white/12 px-4 py-3 text-base text-cream-soft outline-none placeholder:text-cream-soft/45 focus:border-white/36"
                placeholder="Your beautiful name"
                autoComplete="name"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cream-soft/72">
                Email or WhatsApp
              </span>
              <input
                value={form.contact}
                onChange={(event) => updateField("contact", event.target.value)}
                className="w-full rounded-[1.2rem] border border-white/14 bg-white/12 px-4 py-3 text-base text-cream-soft outline-none placeholder:text-cream-soft/45 focus:border-white/36"
                placeholder="name@email.com or +234..."
                autoComplete="email"
                required
              />
            </label>
          </div>

          {form.attendance !== "absent" ? (
            <div className="grid gap-4 md:grid-cols-[0.32fr_1fr]">
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cream-soft/72">
                  Party size
                </span>
                <select
                  value={form.partySize}
                  onChange={(event) =>
                    updateField("partySize", event.target.value)
                  }
                  className="w-full rounded-[1.2rem] border border-white/14 bg-white/12 px-4 py-3 text-base text-cream-soft outline-none focus:border-white/36"
                >
                  {partySizeOptions.map((option) => (
                    <option key={option} value={option} className="text-ink">
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cream-soft/72">
                  Guest names {guestNamesNeeded ? "(please add them)" : "(optional)"}
                </span>
                <textarea
                  value={form.guestNames}
                  onChange={(event) =>
                    updateField("guestNames", event.target.value)
                  }
                  rows={3}
                  className="w-full rounded-[1.2rem] border border-white/14 bg-white/12 px-4 py-3 text-base text-cream-soft outline-none placeholder:text-cream-soft/45 focus:border-white/36"
                  placeholder="One per line, or separated by commas"
                />
              </label>
            </div>
          ) : null}

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cream-soft/72">
              Note for the couple or planners
            </span>
            <textarea
              value={form.note}
              onChange={(event) => updateField("note", event.target.value)}
              rows={4}
              className="w-full rounded-[1.2rem] border border-white/14 bg-white/12 px-4 py-3 text-base text-cream-soft outline-none placeholder:text-cream-soft/45 focus:border-white/36"
              placeholder="Dietary note, travel update, or a short message"
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p
              aria-live="polite"
              className={[
                "max-w-xl text-sm leading-7",
                submitState.status === "error"
                  ? "text-[#ffd7d2]"
                  : "text-cream-soft/84",
              ].join(" ")}
            >
              {submitState.message}
            </p>
            <button
              type="submit"
              disabled={submitState.status === "submitting"}
              className="rounded-full border border-transparent bg-cream-soft px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-terracotta-deep shadow-[0_18px_38px_rgba(56,33,26,0.16)] disabled:cursor-wait disabled:opacity-70"
            >
              {submitState.status === "submitting" ? "Sending..." : "Send RSVP"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-[2rem] border border-white/14 bg-white/8 p-4 backdrop-blur sm:p-5">
        <div className="relative overflow-hidden rounded-[1.7rem] border border-white/14 bg-white/10">
          <div
            className={[
              "space-y-6 p-5 transition sm:p-6",
              organizerState.status === "unlocked"
                ? ""
                : "blur-[10px] select-none pointer-events-none",
            ].join(" ")}
          >
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Responses",
                  value: summary?.totalResponses ?? "Locked",
                },
                {
                  label: "Yes heads",
                  value: summary?.attendingGuests ?? "Locked",
                },
                {
                  label: "Maybe heads",
                  value: summary?.maybeGuests ?? "Locked",
                },
                {
                  label: "Regrets",
                  value: summary?.regrets ?? "Locked",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.3rem] border border-white/14 bg-white/12 p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cream-soft/70">
                    {item.label}
                  </p>
                  <p className="mt-3 font-heading text-4xl text-cream-soft">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {organizerData?.records.length ? (
                organizerData.records.map((record) => (
                  <OrganizerRecord key={record.id} record={record} />
                ))
              ) : (
                <div className="rounded-[1.6rem] border border-white/14 bg-white/12 p-5 text-sm leading-7 text-cream-soft/82">
                  The organizer list will appear here once RSVPs start arriving.
                </div>
              )}
            </div>
          </div>

          {organizerState.status !== "unlocked" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(73,33,23,0.36)] p-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-[1.7rem] border border-white/14 bg-[rgba(255,250,243,0.14)] p-5 text-center shadow-[0_20px_45px_rgba(56,33,26,0.14)]">
                <p className="section-eyebrow text-cream-soft/72">
                  Organizer planner view
                </p>
                <h3 className="mt-3 font-heading text-3xl text-cream-soft">
                  Hidden until unlocked
                </h3>
                <p className="mt-3 text-sm leading-7 text-cream-soft/84">
                  This list stays on the same page, but the actual RSVP data only
                  loads after the correct password is entered.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(event) => setAdminPassword(event.target.value)}
                    className="flex-1 rounded-full border border-white/18 bg-white/14 px-4 py-3 text-base text-cream-soft outline-none placeholder:text-cream-soft/44 focus:border-white/36"
                    placeholder="Organizer password"
                  />
                  <button
                    type="button"
                    onClick={() => void unlockOrganizerView()}
                    disabled={organizerState.status === "loading"}
                    className="rounded-full border border-transparent bg-cream-soft px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-terracotta-deep disabled:cursor-wait disabled:opacity-70"
                  >
                    {organizerState.status === "loading" ? "Checking..." : "Unlock"}
                  </button>
                </div>
                <p
                  aria-live="polite"
                  className={[
                    "mt-4 text-sm leading-7",
                    organizerState.status === "error"
                      ? "text-[#ffd7d2]"
                      : "text-cream-soft/84",
                  ].join(" ")}
                >
                  {organizerState.message}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {organizerState.status === "unlocked" ? (
          <div className="mt-4 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => void unlockOrganizerView()}
              className="rounded-full border border-white/18 bg-white/12 px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-cream-soft"
            >
              Refresh list
            </button>
            <button
              type="button"
              onClick={() => {
                setOrganizerData(null);
                setOrganizerState({
                  status: "locked",
                  message:
                    "Organizer access is hidden until the correct password is entered.",
                });
              }}
              className="rounded-full border border-white/18 bg-transparent px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-cream-soft/84"
            >
              Lock again
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
