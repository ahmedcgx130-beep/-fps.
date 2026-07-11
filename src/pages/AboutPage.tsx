import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdBanner } from '../components/Layout';

function getDeviceType(): { type: string; icon: string; details: string } {
  const ua = navigator.userAgent;
  if (/iPad/i.test(ua)) return { type: 'آيباد', icon: '📱', details: 'Apple iPad' };
  if (/iPhone/i.test(ua)) return { type: 'آيفون', icon: '📱', details: 'Apple iPhone' };
  if (/Android.*Mobile/i.test(ua)) return { type: 'هاتف أندرويد', icon: '📱', details: 'Android Phone' };
  if (/Android/i.test(ua)) return { type: 'جهاز لوحي أندرويد', icon: '📱', details: 'Android Tablet' };
  if (/Macintosh/i.test(ua)) return { type: 'ماك', icon: '💻', details: 'Apple Mac' };
  if (/Windows/i.test(ua)) return { type: 'ويندوز', icon: '💻', details: 'Windows PC' };
  if (/Linux/i.test(ua)) return { type: 'لينكس', icon: '🖥️', details: 'Linux PC' };
  if (/CrOS/i.test(ua)) return { type: 'كروم بوك', icon: '💻', details: 'Chromebook' };
  return { type: 'غير معروف', icon: '🖥️', details: 'Unknown' };
}

function getBrowser(): { name: string; icon: string } {
  const ua = navigator.userAgent;
  if (/Edg/i.test(ua)) return { name: 'Microsoft Edge', icon: '🌐' };
  if (/OPR|Opera/i.test(ua)) return { name: 'Opera', icon: '🌐' };
  if (/Chrome/i.test(ua)) return { name: 'Google Chrome', icon: '🌐' };
  if (/Firefox/i.test(ua)) return { name: 'Firefox', icon: '🦊' };
  if (/Safari/i.test(ua)) return { name: 'Safari', icon: '🧭' };
  return { name: 'غير معروف', icon: '🌐' };
}

function getOS(): string {
  const ua = navigator.userAgent;
  if (/Windows NT 10/i.test(ua)) return 'Windows 10/11';
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Mac OS X/i.test(ua)) {
    const match = ua.match(/Mac OS X (\d+[._]\d+)/);
    return match ? `macOS ${match[1].replace('_', '.')}` : 'macOS';
  }
  if (/Android (\d+)/i.test(ua)) {
    const match = ua.match(/Android (\d+(\.\d+)?)/);
    return match ? `Android ${match[1]}` : 'Android';
  }
  if (/iPhone OS (\d+)/i.test(ua)) {
    const match = ua.match(/iPhone OS (\d+[_]\d+)/);
    return match ? `iOS ${match[1].replace('_', '.')}` : 'iOS';
  }
  if (/Linux/i.test(ua)) return 'Linux';
  return 'غير معروف';
}

export default function AboutPage() {
  const [deviceInfo, setDeviceInfo] = useState({
    device: { type: '', icon: '', details: '' },
    browser: { name: '', icon: '' },
    os: '',
    screen: '',
    cores: 0,
    memory: null as number | null,
    gpu: '',
    lang: '',
    online: true,
    touch: false,
  });

  useEffect(() => {
    const nav = navigator as any;
    let gpu = 'غير معروف';
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (gl && gl instanceof WebGLRenderingContext) {
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        if (ext) gpu = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || 'غير معروف';
      }
    } catch { /* */ }

    setDeviceInfo({
      device: getDeviceType(),
      browser: getBrowser(),
      os: getOS(),
      screen: `${screen.width} × ${screen.height} (${devicePixelRatio}x)`,
      cores: nav.hardwareConcurrency || 0,
      memory: nav.deviceMemory || null,
      gpu,
      lang: nav.language || 'غير معروف',
      online: nav.onLine,
      touch: 'ontouchstart' in window || nav.maxTouchPoints > 0,
    });
  }, []);

  const teamMembers = [
    { name: 'فريق التطوير', role: 'مهندسو برمجيات', icon: '👨‍💻' },
    { name: 'فريق التصميم', role: 'مصممو واجهات', icon: '🎨' },
    { name: 'فريق الدعم', role: 'خدمة العملاء', icon: '🤝' },
  ];

  const infoRows = [
    { icon: deviceInfo.device.icon, label: 'نوع الجهاز', value: deviceInfo.device.type },
    { icon: '🖥️', label: 'النظام', value: deviceInfo.os },
    { icon: deviceInfo.browser.icon, label: 'المتصفح', value: deviceInfo.browser.name },
    { icon: '📐', label: 'الشاشة', value: deviceInfo.screen },
    { icon: '⚙️', label: 'أنوية المعالج', value: deviceInfo.cores ? `${deviceInfo.cores} أنوية` : 'غير معروف' },
    { icon: '🧠', label: 'الذاكرة', value: deviceInfo.memory ? `${deviceInfo.memory} GB` : 'غير معروف' },
    { icon: '🎮', label: 'كرت الشاشة', value: deviceInfo.gpu },
    { icon: '🌍', label: 'اللغة', value: deviceInfo.lang },
    { icon: '📡', label: 'الاتصال', value: deviceInfo.online ? 'متصل ✅' : 'غير متصل ❌' },
    { icon: '👆', label: 'شاشة لمس', value: deviceInfo.touch ? 'نعم ✅' : 'لا ❌' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header Ad */}
      <AdBanner position="إعلان أعلى الصفحة - من نحن" size="leaderboard" />

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">👥</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-l from-blue-400 to-purple-400 bg-clip-text text-transparent">
          من نحن
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          نحن فريق من المطورين والمصممين المتحمسين لتقديم أفضل أدوات قياس الأداء للجميع
        </p>
      </div>

      {/* Device Detection Banner */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-2xl p-6 border border-indigo-500/20 mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-indigo-500/20 text-indigo-400 text-xs px-3 py-1 rounded-full">مُكتشف تلقائياً</span>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            جهازك الحالي
            <span className="text-2xl">{deviceInfo.device.icon}</span>
          </h2>
        </div>
        <div className="text-center mb-5">
          <div className="text-5xl mb-2">{deviceInfo.device.icon}</div>
          <div className="text-2xl font-bold text-white">{deviceInfo.device.type}</div>
          <div className="text-slate-500 text-sm" dir="ltr">{deviceInfo.os} • {deviceInfo.browser.name}</div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {infoRows.map(row => (
            <div key={row.label} className="bg-slate-900/60 rounded-lg px-3 py-2 text-center">
              <div className="text-lg mb-0.5">{row.icon}</div>
              <div className="text-slate-500 text-[10px] mb-0.5">{row.label}</div>
              <div className="text-white text-xs font-medium truncate" dir="ltr">{row.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-8">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🎯</div>
          <div>
            <h2 className="text-xl font-bold text-white mb-2">مهمتنا</h2>
            <p className="text-slate-400 leading-relaxed">
              نسعى لتوفير أداة مجانية وسهلة الاستخدام لقياس أداء الأجهزة. نؤمن بأن كل مستخدم يستحق معرفة مدى كفاءة جهازه دون الحاجة لتثبيت برامج معقدة أو دفع أموال.
            </p>
          </div>
        </div>
      </div>

      {/* Mid Ad */}
      <AdBanner position="إعلان وسط الصفحة" size="square" />

      {/* Vision */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-8">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔭</div>
          <div>
            <h2 className="text-xl font-bold text-white mb-2">رؤيتنا</h2>
            <p className="text-slate-400 leading-relaxed">
              نطمح أن نكون المرجع الأول عالمياً لقياس أداء الأجهزة عبر الويب. نعمل باستمرار على تطوير أدواتنا لتشمل المزيد من الاختبارات والقياسات الدقيقة.
            </p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">فريقنا</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {teamMembers.map(member => (
            <div key={member.name} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 text-center hover:border-blue-500/50 transition-colors">
              <div className="text-4xl mb-3">{member.icon}</div>
              <h3 className="text-white font-semibold mb-1">{member.name}</h3>
              <p className="text-slate-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20 text-center">
        <div className="text-3xl mb-3">📧</div>
        <h2 className="text-xl font-bold text-white mb-2">تواصل معنا</h2>
        <p className="text-slate-400 mb-4">هل لديك أسئلة أو اقتراحات؟ نحب أن نسمع منك!</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="mailto:ahmedcgx130@gmail.com" className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-6 py-2.5 rounded-xl hover:bg-blue-500/30 transition-colors" dir="ltr">
            <span>✉️</span>
            <span>ahmedcgx130@gmail.com</span>
          </a>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-6 py-2.5 rounded-xl hover:bg-emerald-500/30 transition-colors">
            <span>صفحة اتصل بنا</span>
            <span>📬</span>
          </Link>
        </div>
      </div>

      {/* Bottom Ad */}
      <AdBanner position="إعلان أسفل المحتوى - من نحن" size="banner" />
    </div>
  );
}
