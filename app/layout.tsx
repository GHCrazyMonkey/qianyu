import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "签语签缘 — 在线抽签、转盘、掷骰子、随机数",
  description:
    "签语签缘，传统文化娱乐工具。在线抽签解签、随机转盘、掷骰子、生成随机数，简单好用，仅供娱乐。",
  keywords: "抽签,在线抽签,观音灵签,转盘,随机转盘,掷骰子,随机数,签语签缘",
};

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
            <div className="flex gap-4 text-sm">
              <Link href="/lottery" className="hover:text-gold-light transition-colors">
                抽签
              </Link>
              <Link href="/wheel" className="hover:text-gold-light transition-colors">
                转盘
              </Link>
              <Link href="/dice" className="hover:text-gold-light transition-colors">
                掷骰子
              </Link>
              <Link href="/random" className="hover:text-gold-light transition-colors">
                随机数
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">{children}</main>

        <footer className="text-center text-xs text-muted py-6 border-t border-card-border">
          <p>签语签缘 — 传统文化娱乐工具，仅供娱乐，不作为决策依据</p>
          <p className="mt-1">
            <Link href="/about" className="underline hover:text-primary">
              关于我们
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
