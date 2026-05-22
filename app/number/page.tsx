"use client";

import { useState } from "react";
import numberFortuneData from "@/data/number-fortune.json";

type NumberFortune = {
  number: number;
  nature: string;
  description: string;
  detail: string;
};

function reduceTo81(num: string): number {
  let n = parseInt(num, 10);
  if (isNaN(n) || n <= 0) return 0;
  while (n > 81) {
    n = String(n).split("").reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return n;
}

const natureColor: Record<string, string> = {
  "大吉": "text-red-600 bg-red-50 border-red-200",
  "吉": "text-orange-600 bg-orange-50 border-orange-200",
  "半吉": "text-yellow-700 bg-yellow-50 border-yellow-200",
  "凶": "text-gray-500 bg-gray-50 border-gray-200",
};

const natureEmoji: Record<string, string> = {
  "大吉": "🌟",
  "吉": "😊",
  "半吉": "🤔",
  "凶": "💫",
};

const quickNumbers = ["手机号", "QQ号", "车牌号", "自定义"];

export default function NumberPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<NumberFortune | null>(null);
  const [mode, setMode] = useState("自定义");
  const [showResult, setShowResult] = useState(false);

  const analyze = () => {
    if (!input.trim()) return;
    const num = input.replace(/\D/g, "");
    if (!num) return;
    const reduced = reduceTo81(num);
    const found = numberFortuneData.find(f => f.number === reduced) as NumberFortune | undefined;
    if (found) {
      setResult(found);
      setShowResult(false);
      setTimeout(() => setShowResult(true), 50);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-foreground mb-1">数字吉凶</h1>
      <p className="text-muted text-sm mb-8">输入数字，查看81数理吉凶</p>

      {/* Quick mode buttons */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {quickNumbers.map((label) => (
          <button
            key={label}
            onClick={() => setMode(label)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border border-card-border bg-card text-foreground hover:border-primary/40 hover:text-primary active:scale-95 transition-all ${
              mode === label ? "border-primary/40 text-primary" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setResult(null); }}
          onKeyDown={(e) => e.key === "Enter" && analyze()}
          placeholder={
            mode === "手机号" ? "输入手机号码" :
            mode === "QQ号" ? "输入QQ号码" :
            mode === "车牌号" ? "输入车牌号（如京A12345）" :
            "输入任意数字"
          }
          className="w-full rounded-xl border border-card-border bg-card p-3 text-foreground text-center text-lg focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
        />
      </div>

      {/* Analyze button */}
      <button
        onClick={analyze}
        disabled={!input.trim()}
        className="px-10 py-3 rounded-full bg-primary text-white font-bold text-lg shadow-md hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        查看吉凶
      </button>

      {/* Result */}
      {result && showResult && (
        <div className="w-full max-w-md animate-result-appear">
          <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
            <p className="text-sm text-muted mb-1">数理 <span className="text-primary font-bold">{result.number}</span></p>
            <p className="text-3xl font-bold text-foreground mb-2">{result.description}</p>
            <span className={`inline-block px-3 py-0.5 rounded-full text-sm font-bold border animate-badge-bounce ${natureColor[result.nature] ?? ""}`}>
              {natureEmoji[result.nature]} {result.nature}
            </span>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm mt-4">
            <h3 className="text-sm font-bold text-primary mb-2">详细解读</h3>
            <p className="text-foreground/80 leading-relaxed text-sm">{result.detail}</p>
          </div>

          <p className="text-xs text-muted text-center mt-4">
            81数理吉凶，仅供参考娱乐
          </p>
        </div>
      )}
    </div>
  );
}
