"use client";

import FortuneStickPage from "@/components/FortuneStickPage";
import guandiData from "@/data/guandi.json";

export default function GuandiPage() {
  return (
    <FortuneStickPage
      title="关帝灵签"
      subtitle="忠义千秋，武圣灵签"
      data={guandiData}
      historyKey="qianyu-guandi-history"
      theme={{
        border: "border-red-700",
        gradientFrom: "from-red-50",
        gradientTo: "to-white",
        glow: "animate-glow",
        topBar: "from-red-700/30",
        topDecor: "bg-red-700",
        bottomBar: "from-red-700/20",
        numberText: "text-red-700",
        placeholderText: "text-red-400",
        placeholderChar: "义",
        buttonFrom: "from-red-700",
        buttonTo: "to-red-900",
        resultLine: "from-red-700/0 via-red-700 to-red-700/0",
        interpTitle: "text-red-700",
        interpTitleText: "解签",
        historyBorder: "hover:border-red-700/30",
        sparkleClass: "text-gold",
        sparkleChar: (i: number) => (i % 2 === 0 ? "⚔" : "✦"),
      }}
    />
  );
}
