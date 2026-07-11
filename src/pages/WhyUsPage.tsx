import { AdBanner } from '../components/Layout';

export default function WhyUsPage() {
  const features = [
    {
      icon: '🌐',
      title: 'يعمل على المتصفح مباشرة',
      desc: 'لا حاجة لتثبيت أي برنامج. افتح الموقع وابدأ القياس فوراً من أي جهاز.',
    },
    {
      icon: '📱',
      title: 'متوافق مع جميع الأجهزة',
      desc: 'يعمل على الكمبيوتر، الهواتف الذكية، والأجهزة اللوحية بنفس الكفاءة.',
    },
    {
      icon: '🔒',
      title: 'خصوصية تامة',
      desc: 'لا نجمع أي بيانات شخصية. كل القياسات تتم محلياً على جهازك فقط.',
    },
    {
      icon: '⚡',
      title: 'نتائج فورية ودقيقة',
      desc: 'احصل على نتائج القياس في الوقت الفعلي مع رسوم بيانية تفاعلية.',
    },
    {
      icon: '🎮',
      title: 'اختبارات ضغط متعددة',
      desc: '3 مستويات من اختبارات الضغط لقياس أداء جهازك في ظروف مختلفة.',
    },
    {
      icon: '💯',
      title: 'مجاني بالكامل',
      desc: 'استخدم جميع الميزات مجاناً دون أي قيود أو اشتراكات مدفوعة.',
    },
  ];

  const comparisons = [
    { feature: 'بدون تثبيت', us: true, others: false },
    { feature: 'يعمل على الهواتف', us: true, others: false },
    { feature: 'مجاني بالكامل', us: true, others: false },
    { feature: 'خصوصية تامة', us: true, others: false },
    { feature: 'رسوم بيانية تفاعلية', us: true, others: true },
    { feature: 'اختبارات ضغط', us: true, others: true },
    { feature: 'دعم اللغة العربية', us: true, others: false },
  ];

  const stats = [
    { number: '1M+', label: 'مستخدم نشط' },
    { number: '50+', label: 'دولة حول العالم' },
    { number: '99.9%', label: 'وقت التشغيل' },
    { number: '4.9', label: 'تقييم المستخدمين' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header Ad */}
      <AdBanner position="إعلان أعلى الصفحة - لماذا نحن" size="leaderboard" />

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">⭐</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-l from-amber-400 to-orange-400 bg-clip-text text-transparent">
          لماذا نحن؟
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          اكتشف لماذا يختار الملايين أداتنا لقياس أداء أجهزتهم
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {stats.map(stat => (
          <div key={stat.label} className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 rounded-xl p-4 text-center border border-slate-700/50">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-l from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {stat.number}
            </div>
            <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">مميزاتنا</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map(feature => (
            <div key={feature.title} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/30 transition-all group">
              <div className="flex items-start gap-4">
                <div className="text-3xl group-hover:scale-110 transition-transform">{feature.icon}</div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mid Ad */}
      <AdBanner position="إعلان وسط الصفحة" size="square" />

      {/* Comparison Table */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">مقارنة مع الآخرين</h2>
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-right text-slate-400 text-sm py-3 px-4">الميزة</th>
                <th className="text-center text-emerald-400 text-sm py-3 px-4">FPS Meter ⚡</th>
                <th className="text-center text-slate-500 text-sm py-3 px-4">الأدوات الأخرى</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? 'bg-slate-900/30' : ''}>
                  <td className="text-slate-300 text-sm py-3 px-4">{row.feature}</td>
                  <td className="text-center py-3 px-4">
                    {row.us ? (
                      <span className="text-emerald-400 text-lg">✓</span>
                    ) : (
                      <span className="text-red-400 text-lg">✗</span>
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    {row.others ? (
                      <span className="text-emerald-400 text-lg">✓</span>
                    ) : (
                      <span className="text-red-400 text-lg">✗</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">آراء المستخدمين</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: 'أحمد محمد', text: 'أفضل أداة استخدمتها لقياس FPS. سهلة وسريعة!', rating: 5 },
            { name: 'سارة علي', text: 'تعمل على هاتفي بدون مشاكل. رائعة!', rating: 5 },
            { name: 'محمد خالد', text: 'أخيراً وجدت أداة عربية لقياس الأداء.', rating: 5 },
            { name: 'فاطمة أحمد', text: 'واجهة جميلة ونتائج دقيقة. شكراً لكم!', rating: 4 },
          ].map((t, i) => (
            <div key={i} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">⭐</span>
                ))}
              </div>
              <p className="text-slate-400 text-sm mb-3">"{t.text}"</p>
              <div className="text-slate-500 text-xs">— {t.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 border border-emerald-500/20 text-center">
        <div className="text-4xl mb-4">🚀</div>
        <h2 className="text-2xl font-bold text-white mb-3">جاهز لتجربة الفرق؟</h2>
        <p className="text-slate-400 mb-6">ابدأ قياس أداء جهازك الآن واكتشف الفرق بنفسك</p>
        <a href="/" className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-8 py-3 rounded-xl hover:bg-emerald-500/30 transition-colors font-bold">
          <span>ابدأ القياس الآن</span>
          <span>⚡</span>
        </a>
      </div>

      {/* Bottom Ad */}
      <AdBanner position="إعلان أسفل المحتوى - لماذا نحن" size="banner" />
    </div>
  );
}
