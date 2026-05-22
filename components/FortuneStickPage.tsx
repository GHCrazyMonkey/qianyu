"use client";

import { useState, useEffect } from "react";

type FortuneStick = {
  number: number;
  title: string;
  level: string;
  poem: string;
  interpretation: string;
};

type HistoryItem = {
  number: number;
  title: string;
  level: string;
  poem: string;
  time: string;
};

type Theme = {
  border: string;
  gradientFrom: string;
  gradientTo: string;
  glow: string;
  topBar: string;
  topDecor: string;
  bottomBar: string;
  numberText: string;
  placeholderText: string;
  placeholderChar: string;
  buttonFrom: string;
  buttonTo: string;
  resultLine: string;
  interpTitle: string;
  interpTitleText: string;
  historyBorder: string;
  sparkleClass: string;
  sparkleChar: (i: number) => string;
  levelColors: Record<string, string>;
};

const defaultLevelColors: Record<string, string> = {
  "上上签": "text-red-600 bg-red-50 border-red-200",
  "上签": "text-orange-600 bg-orange-50 border-orange-200",
  "中签": "text-yellow-700 bg-yellow-50 border-yellow-200",
  "下签": "text-gray-500 bg-gray-50 border-gray-200",
};

const defaultSparkleChar = (i: number) => (i % 2 === 0 ? "✦" : "✦");

function Sparkles({ color, charFn }: { color: string; charFn: (i: number) => string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className={`absolute animate-sparkle ${color} text-lg`}
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {charFn(i)}
        </span>
      ))}
    </div>
  );
}

const levelEmoji: Record<string, string> = {
  "上上签": "🎉",
  "上签": "😊",
  "中签": "🤔",
  "下签": "💫",
};

export default function FortuneStickPage({
  title,
  subtitle,
  data,
  historyKey,
  theme,
}: {
  title: string;
  subtitle: string;
  data: FortuneStick[];
  historyKey: string;
  theme: Partial<Theme>;
}) {
  const t: Theme = {
    border: theme.border ?? "border-gold",
    gradientFrom: theme.gradientFrom ?? "from-amber-50",
    gradientTo: theme.gradientTo ?? "to-white",
    glow: theme.glow ?? "animate-glow",
    topBar: theme.topBar ?? "from-gold/30",
    topDecor: theme.topDecor ?? "bg-gold",
    bottomBar: theme.bottomBar ?? "from-gold/20",
    numberText: theme.numberText ?? "text-primary",
    placeholderText: theme.placeholderText ?? "text-gold",
    placeholderChar: theme.placeholderChar ?? "签",
    buttonFrom: theme.buttonFrom ?? "from-primary",
    buttonTo: theme.buttonTo ?? "to-primary-dark",
    resultLine: theme.resultLine ?? "from-gold/0 via-gold to-gold/0",
    interpTitle: theme.interpTitle ?? "text-gold",
    interpTitleText: theme.interpTitleText ?? "解签",
    historyBorder: theme.historyBorder ?? "hover:border-primary/30",
    sparkleClass: theme.sparkleClass ?? "text-gold",
    sparkleChar: theme.sparkleChar ?? defaultSparkleChar,
    levelColors: theme.levelColors ?? defaultLevelColors,
  };

  const MAX_HISTORY = 20;
  const [stick, setStick] = useState<FortuneStick | null>(null);
  const [shaking, setShaking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(historyKey);
    if (stored) {
      try { setHistory(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, [historyKey]);

  const draw = () => {
    if (shaking) return;
    setStick(null);
    setShowResult(false);
    setShaking(true);
    setTimeout(() => {
      const index = Math.floor(Math.random() * data.length);
      const drawn = data[index];
      setStick(drawn);
      setShaking(false);
      setTimeout(() => setShowResult(true), 100);
      const item: HistoryItem = {
        number: drawn.number,
        title: drawn.title,
        level: drawn.level,
        poem: drawn.poem,
        time: new Date().toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      };
      const updated = [item, ...history].slice(0, MAX_HISTORY);
      localStorage.setItem(historyKey, JSON.stringify(updated));
      setHistory(updated);
    }, 1800);
  };

  const clearHistory = () => {
    localStorage.removeItem(historyKey);
    setHistory([]);
  };

  const viewHistoryItem = (h: HistoryItem) => {
    const found = data.find(s => s.number === h.number);
    if (found) {
      setStick(found);
      setShowResult(false);
      setTimeout(() => setShowResult(true), 100);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-foreground mb-1">{title}</h1>
      <p className="text-muted text-sm mb-8">{subtitle}</p>

      {/* Sign container */}
      <div className="relative mb-8">
        <div
          className={`relative w-48 h-72 rounded-lg border-2 ${t.border} bg-gradient-to-b ${t.gradientFrom} ${t.gradientTo} shadow-lg flex flex-col items-center justify-center overflow-hidden transition-shadow ${
            shaking ? `animate-shake ${t.glow}` : ""
          }`}
        >
          <div className={`absolute -top-0 left-0 right-0 h-6 bg-gradient-to-b ${t.topBar} to-transparent`} />
          <div className={`absolute top-1 left-1/2 -translate-x-1/2 w-10 h-3 ${t.topDecor} rounded-b-sm`} />

          {stick ? (
            <span className={`text-4xl font-bold ${t.numberText}`}>{stick.number}</span>
          ) : (
            <span className={`text-7xl opacity-15 ${t.placeholderText}`}>{t.placeholderChar}</span>
          )}

          <div className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t ${t.bottomBar} to-transparent`} />

          {shaking && <Sparkles color={t.sparkleClass} charFn={t.sparkleChar} />}
        </div>
      </div>

      {/* Draw button */}
      {!stick && (
        <button
          onClick={draw}
          disabled={shaking}
          className={`px-10 py-3 rounded-full bg-gradient-to-r ${t.buttonFrom} ${t.buttonTo} text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          {shaking ? "摇签中..." : "摇签"}
        </button>
      )}

      {/* Result */}
      {stick && showResult && (
        <div className="w-full max-w-md space-y-4 animate-result-appear">
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg font-semibold text-foreground">
              第{stick.number}签
            </span>
            <span className="text-lg font-semibold text-foreground">
              {stick.title}
            </span>
            <span
              className={`px-3 py-0.5 rounded-full text-sm font-bold border animate-badge-bounce ${t.levelColors[stick.level] ?? ""}`}
            >
              {levelEmoji[stick.level] ?? ""} {stick.level}
            </span>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${t.resultLine}`} />
            <p className="text-center text-foreground leading-loose whitespace-pre-line text-lg">
              {stick.poem}
            </p>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h3 className={`text-sm font-bold ${t.interpTitle} mb-2`}>{t.interpTitleText}</h3>
            <p className="text-foreground/80 leading-relaxed text-sm">
              {stick.interpretation}
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={draw}
              className={`px-8 py-2.5 rounded-full border-2 ${t.border} ${t.numberText} font-bold hover:bg-primary hover:text-white active:scale-95 transition-all`}
            >
              再抽一签
            </button>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="w-full max-w-md mt-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-muted">抽签记录</h3>
            <button onClick={clearHistory} className="text-xs text-muted hover:text-primary transition-colors">
              清空
            </button>
          </div>
          <div className="space-y-2">
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => viewHistoryItem(h)}
                className={`w-full flex items-center justify-between bg-card border border-card-border rounded-lg px-4 py-2.5 text-sm ${t.historyBorder} hover:shadow-sm transition-all text-left`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-muted">第{h.number}签</span>
                  <span className="text-foreground">{h.title}</span>
                  <span className={`text-xs ${h.level.includes("上上") ? "text-red-500" : h.level.includes("上") ? "text-orange-500" : h.level.includes("中") ? "text-yellow-600" : "text-gray-400"}`}>
                    {h.level}
                  </span>
                </div>
                <span className="text-xs text-muted">{h.time}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
