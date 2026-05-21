import Link from "next/link";

const tools = [
  {
    href: "/lottery",
    title: "抽签",
    desc: "观音灵签，摇签问运势",
    emoji: "🏯",
    color: "from-primary to-primary-dark",
  },
  {
    href: "/wheel",
    title: "转盘",
    desc: "自定义转盘，帮你做选择",
    emoji: "🎡",
    color: "from-gold to-yellow-600",
  },
  {
    href: "/dice",
    title: "掷骰子",
    desc: "1-6颗骰子，随心掷",
    emoji: "🎲",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    href: "/random",
    title: "随机数",
    desc: "设定范围，生成随机数",
    emoji: "🔢",
    color: "from-blue-500 to-blue-700",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-foreground mb-2">签语签缘</h1>
      <p className="text-muted mb-8 text-center">随机工具，助你决策 — 仅供娱乐</p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-card-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="text-4xl mb-3">{tool.emoji}</span>
            <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {tool.title}
            </span>
            <span className="text-sm text-muted mt-1">{tool.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
