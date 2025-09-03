"use client";

import React, { useEffect, useMemo, useState } from "react";

const START_DATE = new Date("2025-09-01T00:00:00Z");
const LAUNCH_DATE = new Date("2026-01-05T09:00:00Z"); // Jan 5, 2026

function getTimeLeft(now: Date) {
  const diff = Math.max(0, LAUNCH_DATE.getTime() - now.getTime());
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}
function getProgress(now: Date) {
  const total = LAUNCH_DATE.getTime() - START_DATE.getTime();
  const elapsed = Math.min(
    Math.max(0, now.getTime() - START_DATE.getTime()),
    total
  );
  return total > 0 ? (elapsed / total) * 100 : 100;
}

export default function ComingSoonPage() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = useMemo(
    () => getTimeLeft(now),
    [now]
  );
  const progress = Math.min(100, Math.max(0, Math.round(getProgress(now))));

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#ffffff", // SOLID base behind mask
        minHeight: "100dvh", // dynamic viewport height
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Grid background with diagonal fade; remove mask on tiny screens via .mask-none if needed */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage:
            "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 10% 10%, #000 60%, transparent 96%)",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 10% 10%, #000 60%, transparent 96%)",
        }}
      />

      {/* Foreground content – must also fill screen */}
      <div
        className="relative z-10 grid px-5"
        style={{
          minHeight: "100dvh",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        {/* Top spacer (smaller on mobile) */}
        <div className="h-3 sm:h-8" />

        {/* Center content */}
        <main className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 text-center sm:gap-7">
          <h1
            className="font-heading text-balance text-[28px] font-extrabold leading-tight sm:text-5xl md:text-6xl"
            style={{ color: "#3F3F41" }}
          >
            Premium Cladding.
            <span className="block" style={{ color: "#479BB0" }}>
              Built for Contractors.
            </span>
          </h1>

          <p
            className="max-w-xl text-pretty text-sm sm:text-base"
            style={{ color: "#3F3F41" }}
          >
            Launching January 5, 2026. Fast UK delivery of sheets, trims, and
            fixings.
          </p>

          {/* Countdown tiles */}
          <div className="mt-1 grid w-full max-w-2xl grid-cols-4 gap-2 sm:gap-3">
            <Tile label="days" value={days} />
            <Tile label="hrs" value={hours} />
            <Tile label="min" value={minutes} />
            <Tile label="sec" value={seconds} />
          </div>

          {/* Progress */}
          <div className="w-full max-w-2xl">
            <div
              className="mb-1 flex items-center justify-between text-[11px] sm:text-xs"
              style={{ color: "#3F3F41" }}
            >
              <span>Build progress</span>
              <span>{progress}%</span>
            </div>
            <div
              className="h-2 w-full rounded-full"
              style={{ backgroundColor: "rgba(63,63,65,0.2)" }}
            >
              <div
                className="h-2 rounded-full transition-[width] duration-1000 ease-linear"
                style={{
                  width: `${progress}%`,
                  backgroundColor: "#479BB0",
                }}
              />
            </div>
            <p
              className="mt-1 text-center text-[11px] sm:text-xs"
              style={{ color: "rgba(63,63,65,0.75)" }}
            >
              From Sep 1, 2025 to Jan 5, 2026
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="mb-4 flex items-center justify-center">
          <p
            className="text-center text-[11px] sm:text-xs"
            style={{ color: "rgba(63,63,65,0.75)" }}
          >
            © {new Date().getFullYear()} Proform Cladding Supplies
          </p>
        </footer>
      </div>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: number }) {
  const v =
    label === "days" ? String(value) : value.toString().padStart(2, "0");
  return (
    <div
      className="rounded-lg border p-3 shadow-sm sm:p-4"
      style={{
        backgroundColor: "#FFF",
        borderColor: "#e5e7eb",
      }}
    >
      <div
        className="font-heading text-2xl font-bold sm:text-3xl md:text-4xl"
        style={{ color: "#3F3F41" }}
      >
        {v}
      </div>
      <div
        className="mt-0.5 text-[11px] uppercase sm:text-xs"
        style={{ color: "rgba(63,63,65,0.65)" }}
      >
        {label}
      </div>
    </div>
  );
}
