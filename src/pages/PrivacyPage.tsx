import { AdBanner } from '../components/Layout';

export default function PrivacyPage() {
  const sections = [
    {
      title: 'المعلومات التي نجمعها',
      icon: '📋',
      content: [
        'لا نجمع أي معلومات شخصية عنك مثل الاسم أو البريد الإلكتروني.',
        'جميع قياسات الأداء تتم محلياً على جهازك ولا تُرسل إلى خوادمنا.',
        'قد نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم فقط.',
        'نجمع إحصائيات مجهولة عن استخدام الموقع لتحسين خدماتنا.',
      ],
    },
    {
      title: 'كيف نستخدم المعلومات',
      icon: '🔧',
      content: [
        'تحسين أداء الموقع وتجربة المستخدم.',
        'تحليل أنماط الاستخدام لتطوير ميزات جديدة.',
        'عرض إعلانات ملائمة (عبر شركات إعلانية طرف ثالث).',
        'ضمان أمان الموقع ومنع الاستخدام الضار.',
      ],
    },
    {
      title: 'الإعلانات',
      icon: '📢',
      content: [
        'نستخدم شركات إعلانية طرف ثالث لعرض الإعلانات.',
        'هذه الشركات قد تستخدم ملفات تعريف الارتباط لعرض إعلانات مخصصة.',
        'يمكنك إلغاء الاشتراك في الإعلانات المخصصة عبر إعدادات متصفحك.',
        'نحن لا نشارك معلوماتك الشخصية مع المعلنين.',
      ],
    },
    {
      title: 'أمان البيانات',
      icon: '🔒',
      content: [
        'نستخدم اتصال HTTPS مشفر لحماية بياناتك.',
        'لا نخزن أي بيانات حساسة على خوادمنا.',
        'نلتزم بأفضل ممارسات الأمان في صناعة الويب.',
        'نراجع إجراءاتنا الأمنية بشكل دوري.',
      ],
    },
    {
      title: 'حقوقك',
      icon: '⚖️',
      content: [
        'يحق لك حذف ملفات تعريف الارتباط من متصفحك في أي وقت.',
        'يمكنك تعطيل JavaScript لمنع أي تتبع (لكن الموقع لن يعمل).',
        'يحق لك طلب معرفة البيانات المجمعة عنك (إن وجدت).',
        'يمكنك التواصل معنا لأي استفسارات متعلقة بالخصوصية.',
      ],
    },
    {
      title: 'ملفات تعريف الارتباط',
      icon: '🍪',
      content: [
        'نستخدم ملفات تعريف الارتباط الضرورية لعمل الموقع.',
        'ملفات تعريف الارتباط التحليلية لفهم كيفية استخدام الموقع.',
        'ملفات تعريف الارتباط الإعلانية لعرض إعلانات ملائمة.',
        'يمكنك التحكم في ملفات تعريف الارتباط من إعدادات متصفحك.',
      ],
    },
    {
      title: 'التغييرات على السياسة',
      icon: '📝',
      content: [
        'قد نقوم بتحديث هذه السياسة من وقت لآخر.',
        'سيتم نشر أي تغييرات على هذه الصفحة.',
        'ننصح بمراجعة هذه السياسة بشكل دوري.',
        'استمرار استخدامك للموقع يعني موافقتك على التغييرات.',
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header Ad */}
      <AdBanner position="إعلان أعلى الصفحة - الخصوصية" size="leaderboard" />

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🔐</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-l from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          سياسة الخصوصية
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          نحن نحترم خصوصيتك ونلتزم بحماية بياناتك
        </p>
        <div className="text-slate-600 text-sm mt-4">
          آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Quick Summary */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/20 mb-8">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span>✨</span>
          <span>الملخص السريع</span>
        </h2>
        <ul className="space-y-2 text-slate-400 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span>لا نجمع بيانات شخصية</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span>القياسات تتم على جهازك فقط</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span>نستخدم ملفات تعريف الارتباط للتحسين والإعلانات</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span>يمكنك التحكم في خياراتك بالكامل</span>
          </li>
        </ul>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={section.title}>
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <span>{section.title}</span>
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                    <span className="text-slate-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Insert ad after 3rd section */}
            {index === 2 && <AdBanner position="إعلان وسط الصفحة" size="square" />}
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mt-8 text-center">
        <div className="text-3xl mb-3">📧</div>
        <h2 className="text-xl font-bold text-white mb-2">أسئلة حول الخصوصية؟</h2>
        <p className="text-slate-400 mb-4 text-sm">تواصل معنا إذا كان لديك أي استفسارات</p>
        <a href="mailto:ahmedcgx130@gmail.com" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors" dir="ltr">
          <span>✉️ ahmedcgx130@gmail.com</span>
        </a>
      </div>

      {/* Bottom Ad */}
      <AdBanner position="إعلان أسفل المحتوى - الخصوصية" size="banner" />
    </div>
  );
}
