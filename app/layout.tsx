import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "签语签缘 — 在线抽签、转盘、掷骰子、随机数",
  description:
    "签语签缘，传统文化娱乐工具。在线抽签解签、随机转盘、掷骰子、生成随机数，简单好用，仅供娱乐。",
  keywords: "抽签,在线抽签,观音灵签,关帝灵签,月老灵签,转盘,随机转盘,掷骰子,随机数,数字吉凶,签语签缘",
};

const navGroups = [
  {
    label: "灵签",
    items: [
      { href: "/lottery", label: "观音灵签" },
      { href: "/yuelao", label: "月老灵签" },
      { href: "/guandi", label: "关帝灵签" },
    ],
  },
  {
    label: "占卜",
    items: [
      { href: "/tarot", label: "塔罗牌" },
    ],
  },
  {
    label: "运势",
    items: [
      { href: "/fortune", label: "每日运势" },
      { href: "/number", label: "数字吉凶" },
    ],
  },
  {
    label: "工具",
    items: [
      { href: "/wheel", label: "转盘" },
      { href: "/dice", label: "掷骰子" },
      { href: "/random", label: "随机数" },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <header className="bg-primary text-white shadow-md">
          <nav className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-wide">
              签语签缘
            </Link>
            <div className="flex gap-3 text-sm">
              {navGroups.map((group) => (
                <div key={group.label} className="relative group/nav">
                  <button className="hover:text-gold-light transition-colors px-1">
                    {group.label} ▾
                  </button>
                  <div className="absolute right-0 top-full mt-1 bg-white text-foreground rounded-lg shadow-lg border border-card-border py-1 min-w-[120px] opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all z-50">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">{children}</main>

        <footer className="text-center text-xs text-muted py-6 border-t border-card-border">
          <p>签语签缘 — 传统文化娱乐工具，仅供娱乐，不作为决策依据</p>
          <p className="mt-1 space-x-3">
            <Link href="/about" className="underline hover:text-primary">关于我们</Link>
            <Link href="/privacy" className="underline hover:text-primary">隐私政策</Link>
            <Link href="/terms" className="underline hover:text-primary">使用条款</Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
