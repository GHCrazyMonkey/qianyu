"use client";

import { useState } from "react";
import lotteryData from "@/data/lottery.json";

type FortuneStick = {
  number: number;
  title: string;
  level: string;
  poem: string;
  interpretation: string;
};

const levelColor: Record<string, string> = {
  "上上签": "text-red-600 bg-red-50 border-red-200",
  "上签": "text-orange-600 bg-orange-50 border-orange-200",
  "中签": "text-yellow-700 bg-yellow-50 border-yellow-200",
  "下签": "text-gray-500 bg-gray-50 border-gray-200",
};

export default function LotteryPage() {
  const [stick, setStick] = useState<FortuneStick | null>(null);
  const [shaking, setShaking] = useState(false);

  const draw = () => {
    if (shaking) return;
    setStick(null);
    setShaking(true);
    setTimeout(() => {
      const index = Math.floor(Math.random() * lotteryData.length);
      setStick(lotteryData[index] as FortuneStick);
      setShaking(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-foreground mb-1">观音灵签</h1>
      <p className="text-muted text-sm mb-8">心诚则灵，摇签问运势</p>

      {/* Sign container */}
      <div
        className={`relative w-48 h-72 rounded-lg border-2 border-gold bg-card shadow-lg flex flex-col items-center justify-center mb-8 ${
          shaking ? "animate-shake" : ""
        }`}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-5 bg-gold rounded-t-sm" />
        {stick ? (
          <span className="text-4xl font-bold text-primary">{stick.number}</span>
        ) : (
          <span className="text-6xl opacity-20">签</span>
        )}
      </div>

      {/* Draw button */}
      {!stick && (
        <button
          onClick={draw}
          disabled={shaking}
          className="px-10 py-3 rounded-full bg-primary text-white font-bold text-lg shadow-md hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {shaking ? "摇签中..." : "摇签"}
        </button>
      )}

      {/* Result */}
      {stick && (
        <div className="w-full max-w-md space-y-4 animate-fade-in">
          {/* Level badge */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg font-semibold text-foreground">
              第{stick.number}签
            </span>
            <span className="text-lg font-semibold text-foreground">
              {stick.title}
            </span>
            <span
              className={`px-3 py-0.5 rounded-full text-sm font-bold border ${levelColor[stick.level] ?? ""}`}
            >
              {stick.level}
            </span>
          </div>

          {/* Poem */}
          <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
            <p className="text-center text-foreground leading-loose whitespace-pre-line text-lg">
              {stick.poem}
            </p>
          </div>

          {/* Interpretation */}
          <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gold mb-2">解签</h3>
            <p className="text-foreground/80 leading-relaxed text-sm">
              {stick.interpretation}
            </p>
          </div>

          {/* Draw again */}
          <div className="flex justify-center pt-2">
            <button
              onClick={draw}
              className="px-8 py-2.5 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white active:scale-95 transition-all"
            >
              再抽一签
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
