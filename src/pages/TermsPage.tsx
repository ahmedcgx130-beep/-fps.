import { AdBanner } from '../components/Layout';

export default function TermsPage() {
  const sections = [
    {
      title: 'قبول الشروط',
      icon: '✅',
      content: [
        'باستخدامك لموقع FPS Meter، فإنك توافق على هذه الشروط والأحكام.',
        'إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام الموقع.',
        'نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق.',
        'استمرار استخدامك للموقع بعد أي تعديل يعني موافقتك على الشروط المعدلة.',
      ],
    },
    {
      title: 'استخدام الخدمة',
      icon: '🔧',
      content: [
        'الخدمة مقدمة مجاناً للاستخدام الشخصي وغير التجاري.',
        'يجب أن يكون عمرك 13 عاماً على الأقل لاستخدام الخدمة.',
        'أنت مسؤول عن الحفاظ على أمان جهازك ومتصفحك.',
        'يحظر استخدام الخدمة لأي أغراض غير قانونية أو ضارة.',
      ],
    },
    {
      title: 'دقة النتائج',
      icon: '📊',
      content: [
        'نتائج قياس FPS هي تقديرية وقد تختلف حسب ظروف الاستخدام.',
        'العوامل مثل المتصفح، نظام التشغيل، والتطبيقات الأخرى تؤثر على النتائج.',
        'لا نضمن دقة النتائج بنسبة 100% في جميع الظروف.',
        'النتائج مخصصة للمقارنة والتقييم العام فقط.',
      ],
    },
    {
      title: 'الملكية الفكرية',
      icon: '©️',
      content: [
        'جميع محتويات الموقع محمية بحقوق الملكية الفكرية.',
        'يحظر نسخ أو توزيع أو تعديل أي محتوى دون إذن كتابي.',
        'العلامات التجارية والشعارات ملك لأصحابها.',
        'يُسمح بالمشاركة عبر وسائل التواصل مع ذكر المصدر.',
      ],
    },
    {
      title: 'إخلاء المسؤولية',
      icon: '⚠️',
      content: [
        'الخدمة مقدمة "كما هي" دون أي ضمانات صريحة أو ضمنية.',
        'لا نتحمل مسؤولية أي أضرار ناتجة عن استخدام الخدمة.',
        'لا نضمن توفر الخدمة بشكل دائم أو خالٍ من الأخطاء.',
        'أنت تستخدم الخدمة على مسؤوليتك الخاصة.',
      ],
    },
    {
      title: 'الإعلانات',
      icon: '📢',
      content: [
        'قد يحتوي الموقع على إعلانات من شركات طرف ثالث.',
        'نحن غير مسؤولين عن محتوى الإعلانات أو المواقع المرتبطة بها.',
        'النقر على الإعلانات يخضع لسياسات المعلنين.',
        'عائدات الإعلانات تساعدنا في تقديم الخدمة مجاناً.',
      ],
    },
    {
      title: 'السلوك المحظور',
      icon: '🚫',
      content: [
        'محاولة اختراق أو تعطيل الخدمة.',
        'استخدام برامج آلية أو بوتات للوصول للخدمة.',
        'انتحال هوية شخص آخر أو جهة أخرى.',
        'جمع بيانات المستخدمين الآخرين.',
        'استخدام الخدمة لإرسال رسائل غير مرغوبة.',
      ],
    },
    {
      title: 'إنهاء الخدمة',
      icon: '🔚',
      content: [
        'يحق لنا إنهاء أو تعليق وصولك للخدمة في أي وقت.',
        'قد نقوم بذلك دون إشعار مسبق في حالة انتهاك الشروط.',
        'يحق لنا إيقاف الخدمة بالكامل مع إشعار مسبق.',
        'عند الإنهاء، تظل بعض الشروط سارية المفعول.',
      ],
    },
    {
      title: 'القانون المعمول به',
      icon: '⚖️',
      content: [
        'تخضع هذه الشروط للقوانين المعمول بها.',
        'أي نزاع يتم حله بالطرق الودية أولاً.',
        'في حالة عدم الوصول لحل، يتم اللجوء للجهات المختصة.',
        'بطلان أي شرط لا يؤثر على صلاحية باقي الشروط.',
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header Ad */}
      <AdBanner position="إعلان أعلى الصفحة - الشروط" size="leaderboard" />

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">📜</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-l from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          شروط الاستخدام
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا
        </p>
        <div className="text-slate-600 text-sm mt-4">
          آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/20 mb-8">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span>⚠️</span>
          <span>تنبيه مهم</span>
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          باستخدامك لموقع FPS Meter، فإنك توافق على الالتزام بجميع الشروط والأحكام المذكورة أدناه. 
          إذا كنت لا توافق على أي من هذه الشروط، يرجى التوقف عن استخدام الموقع فوراً.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">📑 جدول المحتويات</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sections.map((section, index) => (
            <a
              key={section.title}
              href={`#section-${index}`}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm py-1 transition-colors"
            >
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={section.title} id={`section-${index}`}>
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <span>{index + 1}. {section.title}</span>
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
            
            {/* Insert ads */}
            {index === 2 && <AdBanner position="إعلان وسط الصفحة 1" size="banner" />}
            {index === 5 && <AdBanner position="إعلان وسط الصفحة 2" size="square" />}
          </div>
        ))}
      </div>

      {/* Agreement */}
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-blue-500/20 mt-8 text-center">
        <div className="text-3xl mb-3">🤝</div>
        <h2 className="text-xl font-bold text-white mb-2">الموافقة على الشروط</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto">
          باستخدامك لموقع FPS Meter، فإنك تقر بأنك قرأت وفهمت وتوافق على الالتزام بجميع الشروط والأحكام المذكورة أعلاه.
        </p>
      </div>

      {/* Contact */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mt-8 text-center">
        <div className="text-3xl mb-3">📧</div>
        <h2 className="text-xl font-bold text-white mb-2">أسئلة حول الشروط؟</h2>
        <p className="text-slate-400 mb-4 text-sm">تواصل معنا إذا كان لديك أي استفسارات</p>
        <a href="mailto:ahmedcgx130@gmail.com" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors" dir="ltr">
          <span>✉️ ahmedcgx130@gmail.com</span>
        </a>
      </div>

      {/* Bottom Ad */}
      <AdBanner position="إعلان أسفل المحتوى - الشروط" size="banner" />
    </div>
  );
}
