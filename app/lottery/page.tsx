"use client";

import FortuneStickPage from "@/components/FortuneStickPage";
import lotteryData from "@/data/lottery.json";

export default function LotteryPage() {
  return (
    <FortuneStickPage
      title="观音灵签"
      subtitle="心诚则灵，摇签问运势"
      data={lotteryData}
      historyKey="qianyu-lottery-history"
      theme={{
        border: "border-gold",
        gradientFrom: "from-amber-50",
        gradientTo: "to-white",
        glow: "animate-glow",
        topBar: "from-gold/30",
        topDecor: "bg-gold",
        bottomBar: "from-gold/20",
        numberText: "text-primary",
        placeholderText: "text-gold",
        placeholderChar: "签",
        buttonFrom: "from-primary",
        buttonTo: "to-primary-dark",
        resultLine: "from-gold/0 via-gold to-gold/0",
        interpTitle: "text-gold",
        interpTitleText: "解签",
        historyBorder: "hover:border-primary/30",
        sparkleClass: "text-gold",
      }}
    />
  );
}
