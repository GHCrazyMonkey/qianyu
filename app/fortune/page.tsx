"use client";

import { useState, useEffect } from "react";

// 用日期生成确定性随机数（同一天同一星座结果相同）
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function dateSeed(date: Date, salt = 0) {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() + salt;
}

const zodiacSigns = [
  { name: "鼠", icon: "🐭" },
  { name: "牛", icon: "🐮" },
  { name: "虎", icon: "🐯" },
  { name: "兔", icon: "🐰" },
  { name: "龙", icon: "🐲" },
  { name: "蛇", icon: "🐍" },
  { name: "马", icon: "🐴" },
  { name: "羊", icon: "🐑" },
  { name: "猴", icon: "🐵" },
  { name: "鸡", icon: "🐔" },
  { name: "狗", icon: "🐶" },
  { name: "猪", icon: "🐷" },
];

const luckColors = [
  "红色", "橙色", "金色", "绿色", "青色", "蓝色", "紫色", "粉色",
  "白色", "银色", "棕色", "墨绿", "酒红", "鹅黄", "天蓝", "珊瑚色",
];

const directions = ["正东", "东南", "正南", "西南", "正西", "西北", "正北", "东北"];

const overallTexts = [
  "今日运势大好，诸事顺遂，宜积极行动",
  "运势不错，适合推进计划，把握机遇",
  "平稳一日，适合沉淀思考，蓄力待发",
  "今日宜静不宜动，谨慎行事为佳",
  "有小波折但无大碍，保持平常心",
  "运势回升，之前的努力将有回报",
  "贵人运旺，有望得到他人帮助",
  "今日宜守不宜攻，低调行事为妙",
  "灵感涌现的一天，适合创意工作",
  "社交运佳，适合联络朋友、拓展人脉",
];

const loveTexts = [
  "感情运佳，适合表白或约会",
  "有缘人可能出现在意想不到的地方",
  "与伴侣关系融洽，适合深入交流",
  "单身者今日桃花运旺",
  "感情平淡，给彼此一些空间",
  "注意言辞，避免不必要的争执",
  "旧友重逢，可能擦出火花",
  "适合用心准备一份小惊喜",
  "感情稳定，享受平淡的幸福",
  "倾听对方心声，比表达更重要",
];

const careerTexts = [
  "工作顺利，适合推进重要项目",
  "灵感充沛，创意类工作有突破",
  "团队合作顺畅，适合协作任务",
  "注意细节，避免粗心出错",
  "有升职加薪的可能，展现实力",
  "适合学习新技能，提升自我",
  "贵人提携，有望获得好机会",
  "工作节奏放缓，趁机整理思路",
  "适合谈判、签约等重要商务",
  "专注手头任务，避免分心",
];

const wealthTexts = [
  "财运亨通，适合投资理财",
  "有意外收入的可能",
  "正财稳定，适合稳健理财",
  "不宜大额消费，量入为出",
  "偏财运佳，可尝试小投资",
  "注意控制开支，避免冲动消费",
  "适合与人合作生财",
  "财运平稳，积少成多",
  "有加薪或奖金的好消息",
  "守财为上，不宜冒险",
];

type Fortune = {
  overall: string;
  overallScore: number;
  love: string;
  loveScore: number;
  career: string;
  careerScore: number;
  wealth: string;
  wealthScore: number;
  luckyNumber: number;
  luckyColor: string;
  luckyDirection: string;
};

function generateFortune(date: Date): Fortune {
  const rng = seededRandom(dateSeed(date));

  const pick = <T,>(arr: T[]): T => arr[Math.floor(rng() * arr.length)];

  return {
    overall: pick(overallTexts),
    overallScore: Math.floor(rng() * 3) + 3, // 3-5
    love: pick(loveTexts),
    loveScore: Math.floor(rng() * 5) + 1, // 1-5
    career: pick(careerTexts),
    careerScore: Math.floor(rng() * 5) + 1,
    wealth: pick(wealthTexts),
    wealthScore: Math.floor(rng() * 5) + 1,
    luckyNumber: Math.floor(rng() * 99) + 1,
    luckyColor: pick(luckColors),
    luckyDirection: pick(directions),
  };
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted w-12 shrink-0">{label}</span>
      <div className="flex-1 h-3 bg-card-border/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-gold transition-all duration-700"
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-bold text-foreground w-6">{score}</span>
    </div>
  );
}

export default function FortunePage() {
  const [zodiac, setZodiac] = useState<number | null>(null);
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [today, setToday] = useState("");

  useEffect(() => {
    const d = new Date();
    setToday(`${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`);
    const saved = localStorage.getItem("qianyu-zodiac");
    if (saved) setZodiac(parseInt(saved));
  }, []);

  const selectZodiac = (index: number) => {
    setZodiac(index);
    localStorage.setItem("qianyu-zodiac", String(index));
  };

  useEffect(() => {
    if (zodiac !== null) {
      const d = new Date();
      const rng = seededRandom(dateSeed(d, zodiac));
      // 消耗几个随机数让不同生肖结果不同
      for (let i = 0; i < zodiac * 3; i++) rng();
      setFortune(generateFortune(d));
    }
  }, [zodiac]);

  if (zodiac === null) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-foreground mb-1">每日运势</h1>
        <p className="text-muted text-sm mb-8">选择你的生肖，查看今日运势</p>
        <div className="grid grid-cols-4 gap-3 max-w-xs">
          {zodiacSigns.map((z, i) => (
            <button
              key={z.name}
              onClick={() => selectZodiac(i)}
              className="flex flex-col items-center p-3 rounded-xl bg-card border border-card-border hover:border-primary/40 hover:shadow-sm transition-all active:scale-95"
            >
              <span className="text-2xl mb-1">{z.icon}</span>
              <span className="text-xs text-muted">{z.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const z = zodiacSigns[zodiac];

  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-1">每日运势</h1>
      <p className="text-muted text-sm mb-2">{today}</p>
      <button
        onClick={() => setZodiac(null)}
        className="text-sm text-primary hover:underline mb-6"
      >
        {z.icon} 属{z.name} · 点击切换
      </button>

      {fortune && (
        <div className="w-full space-y-4 animate-fade-in">
          {/* 综合运势 */}
          <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-primary mb-3">综合运势</h3>
            <ScoreBar score={fortune.overallScore} label="运势" />
            <p className="text-foreground/80 text-sm mt-3">{fortune.overall}</p>
          </div>

          {/* 分项运势 */}
          <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-primary mb-3">分项运势</h3>
            <div className="space-y-3">
              <ScoreBar score={fortune.loveScore} label="感情" />
              <ScoreBar score={fortune.careerScore} label="事业" />
              <ScoreBar score={fortune.wealthScore} label="财运" />
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p><span className="text-muted">感情：</span>{fortune.love}</p>
              <p><span className="text-muted">事业：</span>{fortune.career}</p>
              <p><span className="text-muted">财运：</span>{fortune.wealth}</p>
            </div>
          </div>

          {/* 幸运要素 */}
          <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-primary mb-3">幸运要素</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-gold">{fortune.luckyNumber}</p>
                <p className="text-xs text-muted mt-1">幸运数字</p>
              </div>
              <div>
                <p className="text-xl font-bold text-primary">{fortune.luckyColor}</p>
                <p className="text-xs text-muted mt-1">幸运颜色</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{fortune.luckyDirection}</p>
                <p className="text-xs text-muted mt-1">幸运方位</p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted">仅供娱乐，不作为决策依据</p>
        </div>
      )}
    </div>
  );
}
