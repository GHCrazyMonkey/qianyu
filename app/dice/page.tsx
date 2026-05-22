"use client";

import { useState, useRef, useCallback, useEffect } from "react";

// Pip positions for each die face value (1-6) in a 3x3 grid
// Grid cells: top-left, top-center, top-right, mid-left, center, mid-right, bot-left, bot-center, bot-right
const PIP_POSITIONS: Record<number, number[]> = {
  1: [4],
  2: [2, 6],
  3: [2, 4, 6],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

function DieFace({ value, rolling, justLanded }: { value: number; rolling: boolean; justLanded: boolean }) {
  const pips = PIP_POSITIONS[value] ?? [];

  return (
    <div className="relative">
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-card border-2 border-card-border shadow-md grid grid-cols-3 grid-rows-3 p-1.5 sm:p-2 place-items-center ${
          rolling ? "animate-dice-roll" : justLanded ? "animate-dice-land" : ""
        }`}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            {pips.includes(i) && (
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-foreground" />
            )}
          </div>
        ))}
      </div>
      {/* Shadow under die */}
      <div
        className={`mx-auto mt-1 w-12 h-2 rounded-full bg-foreground/10 transition-opacity ${
          rolling ? "animate-dice-shadow-pulse" : justLanded ? "opacity-20" : "opacity-10"
        }`}
      />
    </div>
  );
}

export default function DicePage() {
  const [diceCount, setDiceCount] = useState(2);
  const [values, setValues] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);
  const [justLanded, setJustLanded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const roll = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    setJustLanded(false);

    // Rapid random face changes for ~1 second
    intervalRef.current = setInterval(() => {
      setValues(
        Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1)
      );
    }, 60);

    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Final result
      setValues(
        Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1)
      );
      setRolling(false);
      setJustLanded(true);
      setTimeout(() => setJustLanded(false), 500);
    }, 1000);
  }, [rolling, diceCount]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const total = values.reduce((sum, v) => sum + v, 0);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-foreground mb-1">掷骰子</h1>
      <p className="text-muted text-sm mb-8">选择骰子数量，试试手气</p>

      {/* Dice count selector */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <button
            key={n}
            onClick={() => {
              if (rolling) return;
              setDiceCount(n);
              setValues([]);
            }}
            disabled={rolling}
            className={`w-10 h-10 rounded-lg font-bold text-sm transition-all active:scale-95 disabled:opacity-50 ${
              diceCount === n
                ? "bg-primary text-white shadow-md"
                : "bg-card border border-card-border text-foreground hover:border-primary/40"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Dice display */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 min-h-[88px] sm:min-h-[96px] items-center">
        {values.length > 0
          ? values.map((v, i) => <DieFace key={i} value={v} rolling={rolling} justLanded={justLanded && !rolling} />)
          : Array.from({ length: diceCount }).map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-card border-2 border-dashed border-card-border flex items-center justify-center"
              >
                <span className="text-muted/40 text-2xl">?</span>
              </div>
            ))}
      </div>

      {/* Roll button */}
      <button
        onClick={roll}
        disabled={rolling}
        className="px-10 py-3 rounded-full bg-primary text-white font-bold text-lg shadow-md hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        {rolling ? "掷骰中…" : "掷骰子"}
      </button>

      {/* Result */}
      {values.length > 0 && !rolling && (
        <div className="w-full max-w-md animate-result-appear">
          <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
            <p className="text-sm text-muted mb-1">总点数</p>
            <p className="text-3xl font-bold text-primary">{total}</p>
            <p className="text-xs text-muted mt-2">
              {values.join(" + ")} = {total}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
