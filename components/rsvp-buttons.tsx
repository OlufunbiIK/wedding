"use client";

import { useState } from "react";

const rsvpResponses = {
  attending: {
    label: "Attending",
    message:
      "What joy. We would be honoured to celebrate this beautiful day with you in person.",
  },
  maybe: {
    label: "Maybe",
    message:
      "We understand that plans can be tender and shifting. We hope your heart still finds its way to us if it can.",
  },
  absent: {
    label: "Not Attending",
    message:
      "You will still be part of our day from afar, wrapped in love, prayer, and gratitude.",
  },
} as const;

type ResponseKey = keyof typeof rsvpResponses;

export function RsvpButtons() {
  const [selected, setSelected] = useState<ResponseKey | null>(null);

  return (
    <div className="space-y-5">
      <div
        className="flex flex-col gap-3 sm:flex-row"
        role="group"
        aria-label="RSVP response options"
      >
        {Object.entries(rsvpResponses).map(([key, response]) => {
          const isActive = selected === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key as ResponseKey)}
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

      <div
        aria-live="polite"
        className="rounded-[1.7rem] border border-white/16 bg-white/12 p-5 text-sm leading-7 text-cream-soft/88 backdrop-blur"
      >
        {selected
          ? rsvpResponses[selected].message
          : "Choose the response that best fits your plans, and the note here will change with it."}
      </div>
    </div>
  );
}
