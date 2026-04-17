"use client";

import { useEffect, useState } from "react";

const weddingDate = new Date("2026-08-09T12:00:00+01:00");

type CountdownSnapshot = {
  isComplete: boolean;
  units: Array<{
    label: string;
    value: string;
  }>;
};

function getCountdownSnapshot(): CountdownSnapshot {
  const difference = weddingDate.getTime() - Date.now();

  if (difference <= 0) {
    return {
      isComplete: true,
      units: [
        { label: "Days", value: "00" },
        { label: "Hours", value: "00" },
        { label: "Minutes", value: "00" },
        { label: "Seconds", value: "00" },
      ],
    };
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    isComplete: false,
    units: [
      { label: "Days", value: String(days).padStart(2, "0") },
      { label: "Hours", value: String(hours).padStart(2, "0") },
      { label: "Minutes", value: String(minutes).padStart(2, "0") },
      { label: "Seconds", value: String(seconds).padStart(2, "0") },
    ],
  };
}

export function CountdownTimer() {
  const [countdown, setCountdown] = useState<CountdownSnapshot | null>(null);

  useEffect(() => {
    const syncCountdown = () => {
      setCountdown(getCountdownSnapshot());
    };

    const frameId = window.requestAnimationFrame(syncCountdown);

    const intervalId = window.setInterval(() => {
      syncCountdown();
    }, 1000);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearInterval(intervalId);
    };
  }, []);

  // Prevent rendering until client is ready
  if (!countdown) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {countdown.units.map((unit) => (
          <div
            key={unit.label}
            className="rounded-[1.4rem] border border-gold/20 bg-white/70 p-4 text-center"
          >
            <p className="font-heading text-4xl text-terracotta-deep">
              {unit.value}
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta/75">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
      <p className="text-sm leading-7 text-ink/70">
        {countdown.isComplete
          ? "The celebration has begun. Today is our day."
          : "Counting down to 12:00 PM in Lagos on August 9th, 2026."}
      </p>
    </div>
  );
}
