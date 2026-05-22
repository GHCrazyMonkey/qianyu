"use client";

import FortuneStickPage from "@/components/FortuneStickPage";
import yuelaoData from "@/data/yuelao.json";

export default function YuelaoPage() {
  return (
    <FortuneStickPage
      title="月老灵签"
      subtitle="问姻缘，求桃花"
      data={yuelaoData}
      historyKey="qianyu-yuelao-history"
      theme={{
        border: "border-pink-400",
        gradientFrom: "from-pink-50",
        gradientTo: "to-white",
        glow: "animate-glow-pink",
        topBar: "from-pink-200/30",
        topDecor: "bg-pink-400",
        bottomBar: "from-pink-200/20",
        numberText: "text-pink-500",
        placeholderText: "text-pink-300",
        placeholderChar: "缘",
        buttonFrom: "from-pink-500",
        buttonTo: "to-pink-600",
        resultLine: "from-pink-300/0 via-pink-400 to-pink-300/0",
        interpTitle: "text-pink-500",
        interpTitleText: "解签",
        historyBorder: "hover:border-pink-300",
        sparkleClass: "text-pink-400",
        sparkleChar: (i: number) => (i % 2 === 0 ? "♥" : "✦"),
        levelColors: {
          "上上签": "text-red-600 bg-red-50 border-red-200",
          "上签": "text-orange-600 bg-orange-50 border-orange-200",
          "中签": "text-yellow-700 bg-yellow-50 border-yellow-200",
          "下签": "text-gray-500 bg-gray-50 border-gray-200",
        },
      }}
    />
  );
}
