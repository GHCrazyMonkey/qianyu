import Link from "next/link";

const sections = [
  {
    title: "灵签",
    tools: [
      { href: "/lottery", title: "观音灵签", desc: "摇签问运势，百签解人生", emoji: "🏯" },
      { href: "/yuelao", title: "月老灵签", desc: "问姻缘，求桃花", emoji: "💕" },
      { href: "/guandi", title: "关帝灵签", desc: "忠义千秋，武圣灵签", emoji: "⚔️" },
    ],
  },
  {
    title: "占卜",
    tools: [
      { href: "/tarot", title: "塔罗牌占卜", desc: "正位逆位，心灵指引", emoji: "🔮" },
    ],
  },
  {
    title: "运势",
    tools: [
      { href: "/fortune", title: "每日运势", desc: "今日运势、幸运要素", emoji: "✨" },
      { href: "/number", title: "数字吉凶", desc: "81数理，测吉凶", emoji: "🔢" },
    ],
  },
  {
    title: "工具",
    tools: [
      { href: "/wheel", title: "随机转盘", desc: "自定义选项，帮你做选择", emoji: "🎡" },
      { href: "/dice", title: "掷骰子", desc: "1-6颗骰子，随心掷", emoji: "🎲" },
      { href: "/random", title: "随机数", desc: "设定范围，生成随机数", emoji: "🔢" },
    ],
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-foreground mb-2">签语签缘</h1>
      <p className="text-muted mb-8 text-center">传统文化娱乐工具 — 仅供娱乐</p>

      <div className="w-full max-w-xl space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-sm font-bold text-muted mb-3">{section.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {section.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-card border border-card-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <span className="text-3xl mb-2">{tool.emoji}</span>
                  <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {tool.title}
                  </span>
                  <span className="text-xs text-muted mt-1 text-center">{tool.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
