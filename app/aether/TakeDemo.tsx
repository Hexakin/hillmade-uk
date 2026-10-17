"use client";

import { useEffect, useState } from "react";
import { AetherMark } from "./AetherMark";

// One take, played once: the bubble opens into the Recording bar, the words arrive as
// spoken, the filler and the retracted words drop out, and the tidy line lands in the box.
// A one-sentence chat message gets no full stop, as Aether does by default in chat apps.

type Word = { text: string; kind?: "filler" | "retracted" };

const SPOKEN: Word[] = [
  { text: "um", kind: "filler" },
  { text: "I'll" },
  { text: "be" },
  { text: "there" },
  { text: "at" },
  { text: "seven,", kind: "retracted" },
  { text: "wait", kind: "retracted" },
  { text: "no,", kind: "retracted" },
  { text: "half" },
  { text: "seven" },
];
const RESULT = "I'll be there at half seven";

type Phase = "idle" | "listening" | "confirm" | "tidy" | "done";

const WORD_MS = 330;

export function TakeDemo() {
  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [heard, setHeard] = useState(0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    if (still) {
      at(0, () => {
        setHeard(SPOKEN.length);
        setTyped(RESULT.length);
        setPhase("done");
      });
      return () => timers.forEach(clearTimeout);
    }
    at(0, () => {
      setPhase("idle");
      setHeard(0);
      setTyped(0);
    });
    let t = 700;
    at(t, () => setPhase("listening"));
    t += 450;
    SPOKEN.forEach((_, i) => at(t + i * WORD_MS, () => setHeard(i + 1)));
    t += SPOKEN.length * WORD_MS + 500;
    at(t, () => setPhase("confirm"));
    t += 650;
    at(t, () => setPhase("tidy"));
    t += 1000;
    for (let i = 1; i <= RESULT.length; i++) at(t + i * 28, () => setTyped(i));
    t += RESULT.length * 28 + 200;
    at(t, () => setPhase("done"));
    return () => timers.forEach(clearTimeout);
  }, [run]);

  const recording = phase === "listening";
  return (
    <figure className={`ae-take is-${phase}`}>
      <div
        className="ae-take-stage"
        role="img"
        aria-label={`A message box. Aether hears "um, I'll be there at seven, wait no, half seven" and types "${RESULT}".`}
      >
        <div className="ae-take-thread" aria-hidden="true">
          <p className="ae-take-msg">Are you still coming tonight?</p>
        </div>

        <div className="ae-take-heard" aria-hidden="true">
          {SPOKEN.map((word, i) => (
            <span
              key={`${run}-${i}`}
              className={`ae-word${i < heard ? " is-heard" : ""}${word.kind ? ` is-${word.kind}` : ""}`}
            >
              {word.text}
            </span>
          ))}
        </div>

        <div className="ae-take-field" aria-hidden="true">
          <span className="ae-take-text">
            {RESULT.slice(0, typed)}
            <span className="ae-caret" />
          </span>
          <span className={`ae-bubble${recording ? " is-open" : ""}`}>
            <span className="ae-bubble-cancel">✕</span>
            <span className="ae-meter">
              {Array.from({ length: 7 }, (_, i) => (
                <span key={i} style={{ animationDelay: `${(i * 137) % 600}ms` }} />
              ))}
            </span>
            <span className="ae-bubble-confirm">✓</span>
            <AetherMark className="ae-bubble-mark" />
          </span>
        </div>
      </div>
      <figcaption className="ae-take-caption">
        <span>What you said, and what Aether typed.</span>
        {phase === "done" && (
          <button type="button" className="ae-replay" onClick={() => setRun((n) => n + 1)}>
            Play it again
          </button>
        )}
      </figcaption>
    </figure>
  );
}
