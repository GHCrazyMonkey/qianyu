"use client";

import { useState } from "react";
import tarotData from "@/data/tarot.json";

type TarotCard = {
  id: string;
  number: number;
  name: string;
  englishName: string;
  arcana: "major" | "minor";
  upright: string;
  reversed: string;
  description: string;
};

type DrawnCard = {
  card: TarotCard;
  isReversed: boolean;
};

const SPREADS = [
  { id: "single", name: "单牌占卜", desc: "一张牌，快速指引" },
  { id: "three", name: "过去·现在·未来", desc: "三张牌，时间之流" },
];

const MAJOR_ARCANA_SYMBOLS: Record<string, string> = {
  "0": "🃏", "1": "🎩", "2": "🌙", "3": "👑", "4": "🏛️",
  "5": "⛪", "6": "❤️", "7": "⚔️", "8": "🦁", "9": "🏮",
  "10": "🎡", "11": "⚖️", "12": "🔗", "13": "💀", "14": "🏺",
  "15": "😈", "16": "⚡", "17": "⭐", "18": "🌕", "19": "☀️",
  "20": "📯", "21": "🌍",
};

const SUIT_SYMBOLS: Record<string, string> = {
  wands: "🪄",
  cups: "🏆",
  swords: "🗡️",
  pentacles: "💰",
};

function getCardSymbol(card: TarotCard): string {
  if (card.arcana === "major") return MAJOR_ARCANA_SYMBOLS[String(card.number)] ?? "🔮";
  const suit = card.id.split("-")[0];
  return SUIT_SYMBOLS[suit] ?? "🔮";
}

function getCardSubtitle(card: TarotCard): string {
  if (card.arcana === "major") return "大阿尔卡纳";
  const [suit, rank] = card.id.split("-");
  const suitName: Record<string, string> = { wands: "权杖", cups: "圣杯", swords: "宝剑", pentacles: "星币" };
  const rankName: Record<string, string> = {
    "1": "Ace", "2": "二", "3": "三", "4": "四", "5": "五",
    "6": "六", "7": "七", "8": "八", "9": "九", "10": "十",
    page: "侍从", knight: "骑士", queen: "王后", king: "国王",
  };
  return `${suitName[suit] ?? suit}${rankName[rank] ?? rank}`;
}

function CardDisplay({ drawn, position, index }: { drawn: DrawnCard; position?: string; index: number }) {
  const { card, isReversed } = drawn;
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {position && <p className="text-sm text-muted mb-2 font-medium">{position}</p>}
      <button
        onClick={() => setFlipped(!flipped)}
        className="relative w-32 h-48 sm:w-36 sm:h-52 cursor-pointer focus:outline-none group"
        style={{ animationDelay: `${index * 0.15}s` }}
      >
        {/* Card back */}
        <div
          className={`absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-primary-dark to-primary border-2 border-gold shadow-lg flex items-center justify-center transition-all duration-500 ${
            flipped ? "opacity-0 rotate-y-180" : "opacity-100"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-center">
            <span className="text-4xl">🔮</span>
            <p className="text-gold text-xs mt-2 font-bold">塔罗牌</p>
          </div>
          <div className="absolute inset-2 border border-gold/30 rounded-lg" />
        </div>
        {/* Card front */}
        <div
          className={`absolute inset-0 rounded-xl bg-card border-2 border-card-border shadow-lg flex flex-col items-center justify-center p-2 transition-all duration-500 ${
            flipped ? "opacity-100" : "opacity-0"
          } ${isReversed ? "rotate-180" : ""}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-3xl mb-1">{getCardSymbol(card)}</span>
          <p className="text-sm font-bold text-foreground text-center leading-tight">{card.name}</p>
          <p className="text-[10px] text-muted">{card.englishName}</p>
          <p className="text-[10px] text-muted mt-0.5">{getCardSubtitle(card)}</p>
          <span className={`text-[10px] mt-1 px-2 py-0.5 rounded-full font-bold ${
            isReversed ? "bg-gray-100 text-gray-600" : "bg-primary/10 text-primary"
          }`}>
            {isReversed ? "逆位" : "正位"}
          </span>
        </div>
      </button>
    </div>
  );
}

export default function TarotPage() {
  const [spread, setSpread] = useState<string | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [shuffling, setShuffling] = useState(false);

  const draw = (spreadId: string) => {
    setShuffling(true);
    setDrawnCards([]);

    setTimeout(() => {
      const count = spreadId === "single" ? 1 : 3;
      const shuffled = [...tarotData].sort(() => Math.random() - 0.5);
      const selected: DrawnCard[] = shuffled.slice(0, count).map((card) => ({
        card: card as TarotCard,
        isReversed: Math.random() > 0.5,
      }));
      setDrawnCards(selected);
      setShuffling(false);
    }, 1500);
  };

  const reset = () => {
    setSpread(null);
    setDrawnCards([]);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-foreground mb-1">塔罗牌占卜</h1>
      <p className="text-muted text-sm mb-8">选择牌阵，揭示内心的指引</p>

      {/* Spread selection */}
      {!spread && (
        <div className="w-full max-w-md space-y-3">
          {SPREADS.map((s) => (
            <button
              key={s.id}
              onClick={() => { setSpread(s.id); draw(s.id); }}
              className="w-full p-5 rounded-xl bg-card border border-card-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all text-left"
            >
              <p className="text-base font-semibold text-foreground">{s.name}</p>
              <p className="text-sm text-muted mt-1">{s.desc}</p>
            </button>
          ))}
        </div>
      )}

      {/* Shuffling animation */}
      {shuffling && (
        <div className="flex flex-col items-center animate-fade-in">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-24 h-36 rounded-xl bg-gradient-to-br from-primary via-primary-dark to-primary border-2 border-gold shadow-lg animate-shake"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl">🔮</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted mt-4">洗牌中...</p>
        </div>
      )}

      {/* Drawn cards */}
      {drawnCards.length > 0 && !shuffling && (
        <div className="w-full animate-fade-in">
          <div className="flex justify-center gap-4 sm:gap-6 mb-6">
            {drawnCards.map((drawn, i) => (
              <CardDisplay
                key={drawn.card.id}
                drawn={drawn}
                position={spread === "three" ? ["过去", "现在", "未来"][i] : undefined}
                index={i}
              />
            ))}
          </div>

          {/* Card details */}
          <div className="max-w-md mx-auto space-y-4">
            {drawnCards.map((drawn, i) => (
              <div key={drawn.card.id} className="bg-card border border-card-border rounded-xl p-5 shadow-sm animate-result-appear" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getCardSymbol(drawn.card)}</span>
                  <span className="font-bold text-foreground">{drawn.card.name}</span>
                  <span className="text-xs text-muted">{drawn.card.englishName}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    drawn.isReversed ? "bg-gray-100 text-gray-600" : "bg-primary/10 text-primary"
                  }`}>
                    {drawn.isReversed ? "逆位" : "正位"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 font-bold mb-1">正位含义</p>
                    <p className="text-sm text-foreground/80">{drawn.card.upright}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-bold mb-1">逆位含义</p>
                    <p className="text-sm text-foreground/80">{drawn.card.reversed}</p>
                  </div>
                </div>

                <p className="text-sm text-foreground/70 leading-relaxed">{drawn.card.description}</p>

                {spread === "three" && (
                  <p className="text-xs text-primary mt-2 font-medium">
                    {["过去的影响", "当下的状态", "未来的趋势"][i]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => draw(spread!)}
              className="px-6 py-2.5 rounded-full bg-primary text-white font-bold hover:bg-primary-dark active:scale-95 transition-all"
            >
              重新占卜
            </button>
            <button
              onClick={reset}
              className="px-6 py-2.5 rounded-full border-2 border-card-border text-foreground font-bold hover:border-primary/40 active:scale-95 transition-all"
            >
              换牌阵
            </button>
          </div>

          <p className="text-xs text-muted text-center mt-4">
            塔罗牌仅供娱乐参考，不作为决策依据
          </p>
        </div>
      )}
    </div>
  );
}
