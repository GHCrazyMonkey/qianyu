"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const COLORS = [
  "#c41e3a", "#d4a017", "#2e7d32", "#1565c0",
  "#6a1b9a", "#e65100", "#00838f", "#ad1457",
  "#558b2f", "#283593", "#bf360c", "#00695c",
];

const PRESETS: Record<string, string> = {
  "今天吃什么": "火锅,烧烤,日料,西餐,麻辣烫,炸鸡",
  "谁来请客": "小明,小红,小刚,小丽,小华",
  "随机惩罚": "发红包,唱首歌,做俯卧撑,讲笑话,真心话,大冒险",
};

function drawWheel(
  ctx: CanvasRenderingContext2D,
  options: string[],
  rotation: number,
  size: number
) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 4;
  const segAngle = (2 * Math.PI) / options.length;

  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  options.forEach((label, i) => {
    const startAngle = i * segAngle;
    const endAngle = startAngle + segAngle;

    // Segment fill
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();

    // Segment border
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text label
    ctx.save();
    ctx.rotate(startAngle + segAngle / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    const fontSize = options.length > 8 ? 13 : options.length > 6 ? 15 : 17;
    ctx.font = `bold ${fontSize}px "PingFang SC", "Microsoft YaHei", sans-serif`;
    const textRadius = radius * 0.62;
    const maxChars = options.length > 8 ? 4 : options.length > 6 ? 5 : 6;
    const displayText = label.length > maxChars ? label.slice(0, maxChars) + "…" : label;
    ctx.fillText(displayText, textRadius, fontSize / 3);
    ctx.restore();
  });

  // Center circle
  ctx.beginPath();
  ctx.arc(0, 0, Math.max(1, radius * 0.1), 0, 2 * Math.PI);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = "#e8ddd0";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();

  // Pointer triangle at top
  ctx.beginPath();
  const pointerSize = size * 0.05;
  ctx.moveTo(cx, 2);
  ctx.lineTo(cx - pointerSize, 2 + pointerSize * 1.6);
  ctx.lineTo(cx + pointerSize, 2 + pointerSize * 1.6);
  ctx.closePath();
  ctx.fillStyle = "#c41e3a";
  ctx.fill();
  ctx.strokeStyle = "#9b1830";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

export default function WheelPage() {
  const defaultOptions = "火锅,烧烤,日料,西餐,麻辣烫,炸鸡";
  const [input, setInput] = useState(defaultOptions);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const spinStartRef = useRef(0);

  const options = input
    .split(/[,，\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Responsive canvas size
  const [canvasSize, setCanvasSize] = useState(400);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCanvasSize(Math.min(400, w - 48));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Draw wheel whenever options or rotation change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    ctx.scale(dpr, dpr);
    drawWheel(ctx, options, rotationRef.current, canvasSize);
  }, [options, rotation, canvasSize]);

  const getSelectedIndex = useCallback(
    (finalRotation: number) => {
      if (options.length === 0) return -1;
      const segAngle = (2 * Math.PI) / options.length;
      // Pointer is at top (angle = -PI/2 in standard math, but our canvas 0 is at 3 o'clock)
      // The pointer is at the top = -90 degrees = -PI/2
      // We need to find which segment is under the pointer
      let angle = (-Math.PI / 2 - finalRotation) % (2 * Math.PI);
      if (angle < 0) angle += 2 * Math.PI;
      return Math.floor(angle / segAngle) % options.length;
    },
    [options]
  );

  const spin = () => {
    if (spinning || options.length < 2) return;
    setSpinning(true);
    setResult(null);

    const startRotation = rotationRef.current;
    const extraSpins = 5 + Math.random() * 5; // 5-10 full rotations
    const targetRotation = startRotation + extraSpins * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 4000;
    spinStartRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - spinStartRef.current;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const currentRotation = startRotation + (targetRotation - startRotation) * eased;
      rotationRef.current = currentRotation;
      setRotation(currentRotation);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        rotationRef.current = targetRotation;
        setRotation(targetRotation);
        setSpinning(false);
        const idx = getSelectedIndex(targetRotation);
        if (idx >= 0 && idx < options.length) {
          setResult(options[idx]);
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const applyPreset = (value: string) => {
    setInput(PRESETS[value]);
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-foreground mb-1">随机转盘</h1>
      <p className="text-muted text-sm mb-6">自定义选项，让转盘帮你做选择</p>

      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {Object.keys(PRESETS).map((label) => (
          <button
            key={label}
            onClick={() => applyPreset(label)}
            disabled={spinning}
            className="px-4 py-1.5 rounded-full text-sm font-medium border border-card-border bg-card text-foreground hover:border-primary/40 hover:text-primary active:scale-95 transition-all disabled:opacity-50"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Wheel canvas */}
      <div className="relative mb-6">
        <canvas
          ref={canvasRef}
          className="block"
        />
      </div>

      {/* Spin button */}
      <button
        onClick={spin}
        disabled={spinning || options.length < 2}
        className="px-10 py-3 rounded-full bg-primary text-white font-bold text-lg shadow-md hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        {spinning ? "转动中…" : "旋转"}
      </button>

      {/* Result */}
      {result && !spinning && (
        <div className="w-full max-w-md animate-fade-in mb-6">
          <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm text-center">
            <p className="text-sm text-muted mb-1">转盘结果</p>
            <p className="text-2xl font-bold text-primary">{result}</p>
          </div>
        </div>
      )}

      {/* Options input */}
      <div className="w-full max-w-md">
        <label className="block text-sm font-semibold text-foreground mb-2">
          自定义选项
          <span className="text-muted font-normal ml-2">
            （用逗号或换行分隔，2-12项）
          </span>
        </label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setResult(null);
          }}
          disabled={spinning}
          rows={4}
          className="w-full rounded-xl border border-card-border bg-card p-3 text-foreground text-sm resize-none focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-50"
          placeholder="输入选项，用逗号或换行分隔"
        />
        {options.length > 12 && (
          <p className="text-xs text-red-500 mt-1">最多支持 12 个选项</p>
        )}
        {options.length < 2 && input.trim() && (
          <p className="text-xs text-red-500 mt-1">至少需要 2 个选项</p>
        )}
      </div>
    </div>
  );
}
