export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">关于签语签缘</h1>

      <div className="space-y-4 text-foreground/80 leading-relaxed">
        <p>
          签语签缘是一个传统文化娱乐工具网站，提供在线抽签、随机转盘、掷骰子、随机数生成等趣味小工具。
        </p>

        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="font-semibold text-primary mb-2">免责声明</h2>
          <p className="text-sm">
            本站所有内容仅供娱乐，不构成任何形式的预测、建议或指导。签文内容源自传统文化，不代表本站立场。请勿将本站内容作为人生决策的依据，重大决定请咨询专业人士。
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="font-semibold text-primary mb-2">关于签文</h2>
          <p className="text-sm">
            本站签文参考传统文化中的观音灵签体系，以白话文重新解读，旨在传承和分享传统文化之美。所有签文均为文化娱乐内容，不具有预测功能。
          </p>
        </div>
      </div>
    </div>
  );
}
