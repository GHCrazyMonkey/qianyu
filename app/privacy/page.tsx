export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">隐私政策</h1>

      <div className="space-y-6 text-foreground/80 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">一、信息收集</h2>
          <p>签语签缘是一个纯静态网站，不收集、存储或传输任何个人身份信息。所有数据计算和存储均在您的浏览器本地完成。</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">二、本地存储</h2>
          <p>我们使用浏览器的 localStorage 功能来保存您的偏好设置和抽签历史记录。这些数据仅存储在您的设备上，我们无法访问。您可以随时通过浏览器的设置清除这些数据。</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>抽签历史记录</li>
            <li>生肖选择偏好</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">三、Cookie 使用</h2>
          <p>本网站本身不使用 Cookie。如果后续接入广告服务，第三方广告商可能会使用 Cookie 来展示相关广告。您可以按照广告商的说明选择退出个性化广告。</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">四、第三方服务</h2>
          <p>本网站可能使用以下第三方服务：</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>网站托管服务（Cloudflare Pages）</li>
            <li>广告服务（如 Google AdSense，后续接入）</li>
          </ul>
          <p className="mt-2">这些服务可能收集您的浏览数据，其数据处理受各自隐私政策约束。</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">五、数据安全</h2>
          <p>由于我们不收集任何个人数据，因此不存在数据泄露风险。您的所有操作数据都保留在本地设备上。</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">六、儿童隐私</h2>
          <p>本网站内容适合所有年龄段用户，不针对13岁以下儿童收集信息。</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">七、政策更新</h2>
          <p>我们可能会不定期更新本隐私政策。更新后的政策将在本页面发布，继续使用本网站即表示您同意更新后的政策。</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">八、联系方式</h2>
          <p>如有任何隐私相关问题，请通过网站关于页面中的联系方式与我们取得联系。</p>
        </section>
      </div>

      <p className="text-xs text-muted mt-8">最后更新：2026年5月</p>
    </div>
  );
}
