export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">使用条款</h1>

      <div className="space-y-6 text-foreground/80 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">一、服务说明</h2>
          <p>签语签缘（以下简称"本站"）是一个传统文化娱乐工具网站，提供抽签、转盘、掷骰子、随机数等娱乐功能。本站所有内容均基于中国传统文化，仅供娱乐参考，不具有任何预测性或指导性。</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">二、免责声明</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>本站所有签文、运势等内容均来源于中国传统文化，经重新编写后呈现，仅供娱乐，不作为任何决策依据。</li>
            <li>本站内容不构成任何形式的预测、占卜或建议，用户不应据此做出任何重要决策。</li>
            <li>本站对因使用本站内容而产生的任何直接或间接损失不承担责任。</li>
            <li>抽签结果由随机算法生成，不代表任何超自然力量或预示。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">三、知识产权</h2>
          <p>本站的所有内容，包括但不限于文字、图片、代码、设计等，均受知识产权法保护。未经授权，不得复制、修改、传播本站内容。</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">四、用户行为规范</h2>
          <p>使用本站时，您同意：</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>不将本站内容用于任何非法或不当目的</li>
            <li>不利用技术手段恶意访问或攻击本站</li>
            <li>不将签文内容解读为对他人或事件的预测</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">五、服务变更与中断</h2>
          <p>本站保留随时修改、暂停或终止部分或全部服务的权利，恕不另行通知。对于服务的修改、暂停或终止，本站不承担任何责任。</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">六、广告服务</h2>
          <p>本站可能展示第三方广告。广告内容由广告商提供，本站不对其内容负责。用户与广告商之间的交易与本站无关。</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">七、适用法律</h2>
          <p>本条款适用中华人民共和国法律。如本条款的任何条款被认定为无效或不可执行，其余条款仍然有效。</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">八、条款更新</h2>
          <p>本站保留随时修改本使用条款的权利。更新后的条款将在本页面发布，继续使用本站即表示您同意更新后的条款。</p>
        </section>
      </div>

      <p className="text-xs text-muted mt-8">最后更新：2026年5月</p>
    </div>
  );
}
