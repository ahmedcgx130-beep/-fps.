import { Link, useLocation } from 'react-router-dom';

/* ── Ad Component ── */
export function AdBanner({ position, size = 'banner' }: { position: string; size?: 'banner' | 'square' | 'leaderboard' }) {
  const sizes = {
    banner: 'h-20 sm:h-24',
    square: 'h-64 sm:h-72',
    leaderboard: 'h-24 sm:h-28',
  };

  return (
    <div className={`w-full ${sizes[size]} bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl border border-dashed border-slate-600/50 flex items-center justify-center my-4`}>
      <div className="text-center">
        <div className="text-slate-500 text-xs mb-1">📢 مساحة إعلانية</div>
        <div className="text-slate-600 text-[10px]">{position}</div>
        <div className="text-slate-700 text-[9px] mt-1">
          {size === 'banner' && '728 × 90'}
          {size === 'square' && '300 × 250'}
          {size === 'leaderboard' && '970 × 90'}
        </div>
      </div>
    </div>
  );
}

/* ── Sidebar Ad ── */
export function SidebarAd() {
  return (
    <div className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 w-40 z-40">
      <div className="bg-gradient-to-b from-slate-800/50 to-slate-700/50 rounded-xl border border-dashed border-slate-600/50 h-[600px] flex items-center justify-center">
        <div className="text-center p-2">
          <div className="text-slate-500 text-xs mb-1">📢</div>
          <div className="text-slate-600 text-[10px]">إعلان جانبي</div>
          <div className="text-slate-700 text-[9px] mt-1">160 × 600</div>
        </div>
      </div>
    </div>
  );
}

/* ── Header ── */
function Header() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'الرئيسية', icon: '🏠' },
    { path: '/about', label: 'من نحن', icon: '👥' },
    { path: '/why-us', label: 'لماذا نحن', icon: '⭐' },
    { path: '/contact', label: 'اتصل بنا', icon: '📬' },
  ];

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <span className="text-xl">⚡</span>
            <span className="text-lg font-bold bg-gradient-to-l from-blue-400 to-emerald-400 bg-clip-text text-transparent hidden sm:inline">
              FPS Meter
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap ${
                  location.pathname === link.path
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span className="hidden sm:inline">{link.icon} </span>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-slate-900/80 border-t border-slate-800 mt-12">
      {/* Footer Ad */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <AdBanner position="إعلان أسفل الصفحة" size="leaderboard" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-bold text-white">FPS Meter</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              أداة مجانية لقياس أداء جهازك ومعرفة عدد الإطارات في الثانية.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-white font-semibold mb-3">روابط سريعة</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-slate-400 hover:text-white text-sm transition-colors">الرئيسية</Link>
              <Link to="/about" className="block text-slate-400 hover:text-white text-sm transition-colors">من نحن</Link>
              <Link to="/why-us" className="block text-slate-400 hover:text-white text-sm transition-colors">لماذا نحن</Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="text-center">
            <h4 className="text-white font-semibold mb-3">القانونية</h4>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-slate-400 hover:text-white text-sm transition-colors">سياسة الخصوصية</Link>
              <Link to="/terms" className="block text-slate-400 hover:text-white text-sm transition-colors">شروط الاستخدام</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-3">تواصل معنا</h4>
            <div className="space-y-2">
              <Link to="/contact" className="block text-slate-400 hover:text-white text-sm transition-colors">📬 اتصل بنا</Link>
              <a href="mailto:ahmedcgx130@gmail.com" className="block text-slate-400 hover:text-white text-sm transition-colors" dir="ltr">
                ✉️ ahmedcgx130@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 text-center">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} FPS Meter. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Layout Wrapper ── */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col" dir="rtl">
      <Header />
      <SidebarAd />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
