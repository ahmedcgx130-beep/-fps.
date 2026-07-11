import { useState } from 'react';
import { AdBanner } from '../components/Layout';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `الاسم: ${name}%0Aالبريد: ${email}%0A%0A${message}`;
    window.location.href = `mailto:ahmedcgx130@gmail.com?subject=${encodeURIComponent(subject || 'رسالة من موقع FPS Meter')}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const contactInfo = [
    { icon: '📧', label: 'البريد الإلكتروني', value: 'ahmedcgx130@gmail.com', href: 'mailto:ahmedcgx130@gmail.com' },
    { icon: '🌐', label: 'الموقع', value: 'FPS Meter', href: '/' },
  ];

  const faqItems = [
    { q: 'هل الأداة مجانية؟', a: 'نعم، أداة FPS Meter مجانية بالكامل ولا تحتاج أي تسجيل أو اشتراك.' },
    { q: 'هل تعمل على الهواتف؟', a: 'نعم، تعمل على جميع الأجهزة بما في ذلك الهواتف الذكية والأجهزة اللوحية.' },
    { q: 'هل بياناتي آمنة؟', a: 'بالتأكيد، جميع القياسات تتم محلياً على جهازك ولا نجمع أي بيانات شخصية.' },
    { q: 'كيف أحصل على نتائج دقيقة؟', a: 'أغلق جميع البرامج والتطبيقات الأخرى، وانتظر بضع ثوانٍ قبل بدء القياس.' },
    { q: 'ما هو FPS الطبيعي؟', a: '60 FPS يعتبر ممتاز للاستخدام العادي، و120+ FPS مثالي للألعاب.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header Ad */}
      <AdBanner position="إعلان أعلى الصفحة - اتصل بنا" size="leaderboard" />

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">📬</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-l from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          اتصل بنا
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          نحب أن نسمع منك! أرسل لنا رسالتك وسنرد عليك في أقرب وقت
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {contactInfo.map(info => (
          <a
            key={info.label}
            href={info.href}
            className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/40 transition-all group text-center"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{info.icon}</div>
            <h3 className="text-white font-semibold mb-1">{info.label}</h3>
            <p className="text-blue-400 text-sm" dir="ltr">{info.value}</p>
          </a>
        ))}
      </div>

      {/* Contact Form + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
        {/* Form */}
        <div className="lg:col-span-3 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <span>✉️</span>
            <span>أرسل لنا رسالة</span>
          </h2>

          {sent && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-4 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <div className="text-emerald-400 font-semibold text-sm">تم فتح تطبيق البريد!</div>
                <div className="text-emerald-400/70 text-xs">أكمل الإرسال من تطبيق البريد الخاص بك</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm mb-1.5">الاسم *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="أدخل اسمك"
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-1.5">البريد الإلكتروني *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  dir="ltr"
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-1.5">الموضوع</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="موضوع الرسالة"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-1.5">الرسالة *</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-l from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/40 hover:from-blue-500/30 hover:to-cyan-500/30 px-6 py-3 rounded-xl font-bold transition-all duration-200 cursor-pointer active:scale-[.98] flex items-center justify-center gap-2"
            >
              <span>إرسال الرسالة</span>
              <span>📤</span>
            </button>
          </form>
        </div>

        {/* Side Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-5 border border-blue-500/20">
            <div className="text-3xl mb-3">⏰</div>
            <h3 className="text-white font-semibold mb-2">وقت الاستجابة</h3>
            <p className="text-slate-400 text-sm">نرد عادةً خلال 24-48 ساعة في أيام العمل</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-5 border border-purple-500/20">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-white font-semibold mb-2">نصيحة</h3>
            <p className="text-slate-400 text-sm">اذكر نوع جهازك ومتصفحك إذا كانت رسالتك تتعلق بمشكلة تقنية</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl p-5 border border-emerald-500/20">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-white font-semibold mb-2">تعاون</h3>
            <p className="text-slate-400 text-sm">مهتم بالتعاون أو الإعلان؟ أرسل لنا التفاصيل وسنتواصل معك</p>
          </div>
        </div>
      </div>

      {/* Mid Ad */}
      <AdBanner position="إعلان وسط الصفحة" size="square" />

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
          <span>❓</span>
          <span>الأسئلة الشائعة</span>
        </h2>
        <div className="space-y-3">
          {faqItems.map((faq, i) => (
            <div key={i} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-blue-400">س:</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">ج:</span>
                <span>{faq.a}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Email CTA */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 text-center">
        <div className="text-4xl mb-3">📧</div>
        <h2 className="text-xl font-bold text-white mb-2">أو راسلنا مباشرة</h2>
        <p className="text-slate-400 mb-5 text-sm">يمكنك إرسال بريد إلكتروني مباشرة إلى:</p>
        <a
          href="mailto:ahmedcgx130@gmail.com"
          className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-6 py-3 rounded-xl hover:bg-blue-500/30 transition-colors font-bold text-lg"
          dir="ltr"
        >
          <span>✉️</span>
          <span>ahmedcgx130@gmail.com</span>
        </a>
      </div>

      {/* Bottom Ad */}
      <AdBanner position="إعلان أسفل المحتوى - اتصل بنا" size="banner" />
    </div>
  );
}
