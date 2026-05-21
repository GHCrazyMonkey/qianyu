"use client";

import { useState } from "react";

type HistoryEntry = {
  min: number;
  max: number;
  count: number;
  allowDup: boolean;
  numbers: number[];
};

export default function RandomPage() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDup, setAllowDup] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const generate = () => {
    setError("");

    if (min >= max) {
      setError("最小值必须小于最大值");
      return;
    }
    if (count <= 0) {
      setError("生成数量必须大于0");
      return;
    }
    if (count > 1000) {
      setError("生成数量不能超过1000");
      return;
    }
    if (!allowDup && count > max - min + 1) {
      setError(`不重复时，数量不能超过范围大小（${max - min + 1}）`);
      return;
    }

    let nums: number[];
    if (allowDup) {
      nums = Array.from({ length: count }, () =>
        Math.floor(Math.random() * (max - min + 1)) + min
      );
    } else {
      const pool = Array.from({ length: max - min + 1 }, (_, i) => min + i);
      // Fisher-Yates shuffle then take first `count`
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      nums = pool.slice(0, count);
    }

    setResults(nums);
    setHistory((prev) => [{ min, max, count, allowDup, numbers: nums }, ...prev].slice(0, 5));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-foreground mb-1">随机数</h1>
      <p className="text-muted text-sm mb-8">设定范围，生成随机数字</p>

      {/* Inputs */}
      <div className="w-full max-w-sm space-y-4 mb-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm text-muted mb-1">最小值</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-card-border bg-card text-foreground text-center focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-muted mb-1">最大值</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-card-border bg-card text-foreground text-center focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-muted mb-1">生成数量</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            min={1}
            max={1000}
            className="w-full px-3 py-2 rounded-lg border border-card-border bg-card text-foreground text-center focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={allowDup}
            onChange={(e) => setAllowDup(e.target.checked)}
            className="w-4 h-4 rounded border-card-border text-primary accent-primary"
          />
          <span className="text-sm text-foreground">是否允许重复</span>
        </label>
      </div>

      {/* Error */}
      {error && (
        <p className="text-primary text-sm mb-4 animate-fade-in">{error}</p>
      )}

      {/* Generate button */}
      <button
        onClick={generate}
        className="px-10 py-3 rounded-full bg-primary text-white font-bold text-lg shadow-md hover:bg-primary-dark active:scale-95 transition-all mb-8"
      >
        生成
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div className="w-full max-w-md animate-fade-in mb-8">
          <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
            <div className="flex flex-wrap gap-3 justify-center">
              {results.map((n, i) => (
                <span
                  key={i}
                  className="inline-flex items-center justify-center min-w-[3rem] px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xl border border-primary/20"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="w-full max-w-md">
          <h2 className="text-sm font-bold text-muted mb-3">最近生成</h2>
          <div className="space-y-2">
            {history.map((entry, i) => (
              <div
                key={i}
                className="bg-card border border-card-border rounded-lg px-4 py-3 shadow-sm"
              >
                <p className="text-xs text-muted mb-1.5">
                  {entry.min}~{entry.max}，{entry.count}个{entry.allowDup ? "（可重复）" : "（不重复）"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {entry.numbers.map((n, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/70 text-sm font-medium"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
