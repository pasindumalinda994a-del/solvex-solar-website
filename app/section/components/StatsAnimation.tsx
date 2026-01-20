"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

type Segment = { type: "digit"; value: number } | { type: "static"; char: string };

interface StatsAnimationProps {
  /** Numeric value to count up to (e.g. 500, 10, 98). Omit when using staticDisplay or formattedValue. */
  value?: number;
  /** Optional suffix after the number (e.g. "+", "%") */
  suffix?: string;
  /** Label below the number (e.g. "RESIDENTIAL HOMES") */
  label: string;
  className?: string;
  /** When set, renders this string as-is without the digit roller. */
  staticDisplay?: string;
  /** Mixed format: digits animate (0–9 rollers), other chars are static (e.g. "24/7" → 2,4,7 roll, "/" static). */
  formattedValue?: string;
  /** Icon to display in the top-left corner */
  icon?: ReactNode;
}

function parseSegments(s: string): Segment[] {
  return s.split("").map((char) => {
    const n = parseInt(char, 10);
    if (!isNaN(n) && n >= 0 && n <= 9) return { type: "digit", value: n };
    return { type: "static", char };
  });
}

export default function StatsAnimation({
  value = 0,
  suffix = "",
  label,
  className = "",
  staticDisplay,
  formattedValue,
  icon,
}: StatsAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);

  const segments = formattedValue ? parseSegments(formattedValue) : null;
  const digits = !staticDisplay && !formattedValue ? String(value).split("").map(Number) : [];

  useEffect(() => {
    if (staticDisplay) return;

    const container = containerRef.current;
    const digitValues = formattedValue
      ? parseSegments(formattedValue)
          .filter((s): s is Segment & { type: "digit" } => s.type === "digit")
          .map((s) => s.value)
      : String(value).split("").map(Number);
    const strips = digitValues
      .map((_, i) => stripRefs.current[i])
      .filter((el): el is HTMLDivElement => el != null);

    if (!container || strips.length === 0) return;

    gsap.set(strips, { y: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse",
          once: true,
        },
      });

      strips.forEach((strip, i) => {
        const d = digitValues[i];
        tl.to(
          strip,
          {
            y: `-${d}em`,
            duration: 1,
            ease: "power2.out",
            overwrite: "auto",
          },
          i * 0.08
        );
      });
    }, container);

    return () => ctx.revert();
  }, [value, staticDisplay, formattedValue]);

  // Static display: no digit roller
  if (staticDisplay) {
    return (
      <div ref={containerRef} className={`text-center p-6 flex flex-col items-center justify-center relative ${className}`}>
        <div className="flex items-start justify-center gap-1 mb-2 relative">
          <span
            className="text-4xl md:text-5xl lg:text-8xl font-medium tracking-tight inline-block"
            style={{ color: "white" }}
          >
            {staticDisplay}
          </span>
          {icon && (
            <span className="text-lg text-white self-start mt-1">
              {icon}
            </span>
          )}
        </div>
        <div className="text-sm md:text-sm font-regular text-white">
          {label}
        </div>
      </div>
    );
  }

  // Formatted value (e.g. "24/7"): digit rollers for 2,4,7 and static "/"
  if (formattedValue && segments) {
    return (
      <div ref={containerRef} className={`text-center p-6 flex flex-col items-center justify-center relative ${className}`}>
        <div className="flex items-start justify-center gap-1 mb-2 relative">
          <span
            className="inline-flex flex-nowrap items-center text-4xl md:text-5xl lg:text-8xl font-medium tracking-tight"
            style={{ fontFamily: "var(--font-figtree)", color: "white" }}
          >
            {segments.map((seg, i) => {
              if (seg.type === "digit") {
                const dIdx = segments
                  .slice(0, i)
                  .filter((s) => s.type === "digit").length;
                return (
                  <span
                    key={i}
                    className="inline-block overflow-hidden align-top"
                    style={{ height: "1em", lineHeight: 1, minWidth: "0.6em" }}
                  >
                    <div
                      ref={(el) => {
                        stripRefs.current[dIdx] = el;
                      }}
                      className="block"
                      style={{ willChange: "transform" }}
                    >
                      {DIGITS.map((n) => (
                        <span
                          key={n}
                          className="block text-center"
                          style={{
                            height: "1em",
                            lineHeight: "1em",
                            minWidth: "1ch",
                          }}
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </span>
                );
              }
              return (
                <span key={i} className="inline-block" style={{ minWidth: "1ch" }}>
                  {seg.char}
                </span>
              );
            })}
            {suffix && (
              <span className="inline-block" style={{ minWidth: "1ch" }}>
                {suffix}
              </span>
            )}
          </span>
          {icon && (
            <span className="text-lg text-white self-start mt-1">
              {icon}
            </span>
          )}
        </div>
        <div className="text-sm md:text-sm font-regular text-white">
          {label}
        </div>
      </div>
    );
  }

  // Plain numeric value
  return (
    <div ref={containerRef} className={`text-center p-6 flex flex-col items-center justify-center relative ${className}`}>
      <div className="flex items-start justify-center gap-1 mb-2 relative">
        <span
          className="inline-flex flex-nowrap items-center text-4xl md:text-5xl lg:text-8xl font-medium tracking-tight"
          style={{ fontFamily: "var(--font-figtree)", color: "white" }}
        >
          {digits.map((_, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-top"
              style={{ height: "1em", lineHeight: 1, minWidth: "0.6em" }}
            >
              {/* Strip of 10 digits (0–9), same pattern as NavLink’s top/bottom but 10 rows */}
              <div
                ref={(el) => {
                  stripRefs.current[i] = el;
                }}
                className="block"
                style={{ willChange: "transform" }}
              >
                {DIGITS.map((n) => (
                  <span
                    key={n}
                    className="block text-center"
                    style={{
                      height: "1em",
                      lineHeight: "1em",
                      minWidth: "1ch",
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </span>
          ))}
          {suffix && (
            <span className="inline-block" style={{ minWidth: "1ch" }}>
              {suffix}
            </span>
          )}
        </span>
        {icon && (
          <span className="text-lg text-white self-start mt-1">
            {icon}
          </span>
        )}
      </div>
      <div className="text-sm md:text-sm font-regular text-white">
        {label}
      </div>
    </div>
  );
}
