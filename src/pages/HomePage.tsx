import { useState, useEffect, useRef, useCallback } from 'react';
import { AdBanner } from '../components/Layout';

/* ──────────── Types ──────────── */
interface FPSData {
  current: number;
  min: number;
  max: number;
  avg: number;
  frameTime: number;
  elapsed: number;
  history: number[];
}

interface DeviceData {
  isMobile: boolean;
  cores: number;
  memory: number | null;
  screenW: number;
  screenH: number;
  pixelRatio: number;
  gpu: string;
  platform: string;
  connection: string;
}

const INITIAL_FPS: FPSData = {
  current: 0, min: 0, max: 0, avg: 0,
  frameTime: 0, elapsed: 0, history: [],
};

/* ──────────── Helpers ──────────── */
function getGPU(): string {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    if (gl && gl instanceof WebGLRenderingContext) {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      if (ext) return gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || 'غير معروف';
    }
  } catch { /* */ }
  return 'غير معروف';
}

function getDevice(): DeviceData {
  const n = navigator as any;
  return {
    isMobile: /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(n.userAgent),
    cores: n.hardwareConcurrency || 0,
    memory: n.deviceMemory || null,
    screenW: screen.width,
    screenH: screen.height,
    pixelRatio: devicePixelRatio || 1,
    gpu: getGPU(),
    platform: n.platform || 'غير معروف',
    connection: n.connection?.effectiveType || 'غير معروف',
  };
}

function fpsColor(fps: number) {
  if (fps >= 60) return '#10b981';
  if (fps >= 30) return '#f59e0b';
  return '#ef4444';
}

function fpsLabel(fps: number) {
  if (fps >= 120) return { t: 'ممتاز جداً', e: '🚀', c: 'text-emerald-400' };
  if (fps >= 60) return { t: 'ممتاز', e: '✨', c: 'text-green-400' };
  if (fps >= 45) return { t: 'جيد', e: '👍', c: 'text-yellow-400' };
  if (fps >= 30) return { t: 'مقبول', e: '⚠️', c: 'text-orange-400' };
  return { t: 'ضعيف', e: '🐌', c: 'text-red-400' };
}

function fmt(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

/* ══════════════════════════════════════════════ */
/*                  HOME PAGE                     */
/* ══════════════════════════════════════════════ */
export default function HomePage() {
  const [running, setRunning] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [fps, setFps] = useState<FPSData>(INITIAL_FPS);
  const [stress, setStress] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [device] = useState<DeviceData>(getDevice);

  const rafId = useRef(0);
  const frames = useRef(0);
  const lastT = useRef(0);
  const startT = useRef(0);
  const allVals = useRef<number[]>([]);
  const histVals = useRef<number[]>([]);
  const minV = useRef(Infinity);
  const maxV = useRef(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRaf = useRef(0);

  /* ── FPS measurement loop ── */
  useEffect(() => {
    if (!running) return;

    frames.current = 0;
    const now = performance.now();
    lastT.current = now;
    startT.current = now;
    allVals.current = [];
    histVals.current = [];
    minV.current = Infinity;
    maxV.current = 0;

    const tick = (t: number) => {
      frames.current++;
      const d = t - lastT.current;
      if (d >= 400) {
        const f = Math.round((frames.current / d) * 1000);
        const ft = d / frames.current;
        if (f > 0 && f < minV.current) minV.current = f;
        if (f > maxV.current) maxV.current = f;
        allVals.current.push(f);
        histVals.current.push(f);
        if (histVals.current.length > 120) histVals.current = histVals.current.slice(-120);
        const avg = Math.round(allVals.current.reduce((a, b) => a + b, 0) / allVals.current.length);
        setFps({
          current: f,
          min: minV.current === Infinity ? 0 : minV.current,
          max: maxV.current,
          avg,
          frameTime: Math.round(ft * 100) / 100,
          elapsed: (t - startT.current) / 1000,
          history: [...histVals.current],
        });
        frames.current = 0;
        lastT.current = t;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId.current);
  }, [running]);

  /* ── Canvas stress test ── */
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const r = cvs.getBoundingClientRect();
      cvs.width = r.width * devicePixelRatio;
      cvs.height = r.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    if (!running) {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      cancelAnimationFrame(canvasRaf.current);
      window.removeEventListener('resize', resize);
      return;
    }

    const count = stress === 1 ? 200 : stress === 2 ? 600 : 1400;
    const r = cvs.getBoundingClientRect();
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * r.width,
      y: Math.random() * r.height,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      s: Math.random() * 3 + 1,
      h: Math.random() * 360,
      life: Math.random() * 100,
      ml: 100 + Math.random() * 100,
    }));
    let hShift = 0;

    const draw = () => {
      const r2 = cvs.getBoundingClientRect();
      const w = r2.width, h = r2.height;
      ctx.fillStyle = 'rgba(15,23,42,0.18)';
      ctx.fillRect(0, 0, w, h);
      hShift += 0.5;
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.life++;
        p.h = (p.h + 0.5) % 360;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        if (p.life > p.ml) { p.life = 0; p.x = Math.random() * w; p.y = Math.random() * h; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${(p.h + hShift) % 360},80%,60%,${1 - p.life / p.ml})`;
        ctx.fill();
      }
      canvasRaf.current = requestAnimationFrame(draw);
    };
    canvasRaf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(canvasRaf.current);
      window.removeEventListener('resize', resize);
    };
  }, [running, stress]);

  /* ── Actions ── */
  const start = useCallback(() => {
    setFps(INITIAL_FPS);
    setStopped(false);
    setRunning(true);
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
    setStopped(true);
  }, []);

  const resetAll = useCallback(() => {
    setRunning(false);
    setStopped(false);
    setFps(INITIAL_FPS);
  }, []);

  const show = running || stopped;
  const col = fpsColor(fps.current);
  const label = fpsLabel(fps.avg);

  /* ── Gauge arc helpers ── */
  const maxG = 144, rad = 110, sw = 12, cx = 130, cy = 130;
  const pct = Math.min(fps.current, maxG) / maxG;
  const sA = 135, eA = 405, curA = sA + (eA - sA) * pct;
  const arc = (a1: number, a2: number) => {
    const p = (a: number) => {
      const r2 = ((a - 90) * Math.PI) / 180;
      return [cx + rad * Math.cos(r2), cy + rad * Math.sin(r2)];
    };
    const [x1, y1] = p(a1), [x2, y2] = p(a2);
    return `M ${x1} ${y1} A ${rad} ${rad} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  };

  /* ── Graph ── */
  const gW = 560, gH = 130, gP = { t: 8, r: 8, b: 22, l: 36 };
  const gIW = gW - gP.l - gP.r, gIH = gH - gP.t - gP.b;
  const pts = fps.history.map((v, i, a) => ({
    x: gP.l + (a.length > 1 ? (i / (a.length - 1)) * gIW : 0),
    y: gP.t + gIH - (Math.min(v, maxG) / maxG) * gIH,
    v,
  }));
  const line = pts.map((p, i) => `${i ? 'L' : 'M'} ${p.x} ${p.y}`).join(' ');
  const area = pts.length > 1
    ? `${line} L ${pts[pts.length - 1].x} ${gP.t + gIH} L ${pts[0].x} ${gP.t + gIH} Z`
    : '';

  /* ── Stat cards data ── */
  const cards = [
    { l: 'الحالي', v: show ? fps.current : '--', u: 'FPS', ic: '⚡', g: 'from-blue-500/20 to-blue-600/5', b: 'border-blue-500/30' },
    { l: 'الأدنى', v: show && fps.min > 0 ? fps.min : '--', u: 'FPS', ic: '📉', g: 'from-red-500/20 to-red-600/5', b: 'border-red-500/30' },
    { l: 'الأعلى', v: show && fps.max > 0 ? fps.max : '--', u: 'FPS', ic: '📈', g: 'from-green-500/20 to-green-600/5', b: 'border-green-500/30' },
    { l: 'المتوسط', v: show ? fps.avg : '--', u: 'FPS', ic: '📊', g: 'from-purple-500/20 to-purple-600/5', b: 'border-purple-500/30' },
    { l: 'وقت الإطار', v: show ? fps.frameTime : '--', u: 'ms', ic: '⏱️', g: 'from-cyan-500/20 to-cyan-600/5', b: 'border-cyan-500/30' },
    { l: 'المدة', v: show ? fmt(fps.elapsed) : '--:--', u: '', ic: '🕐', g: 'from-amber-500/20 to-amber-600/5', b: 'border-amber-500/30' },
  ];

  const stressOpts = [
    { lv: 1, label: 'خفيف', emoji: '🟢', desc: '200 جسيم' },
    { lv: 2, label: 'متوسط', emoji: '🟡', desc: '600 جسيم' },
    { lv: 3, label: 'مكثف', emoji: '🔴', desc: '1400 جسيم' },
  ];

  const refTable = [
    { r: '120+ FPS', l: 'ممتاز جداً', d: 'أداء فائق - مثالي للألعاب التنافسية', c: 'bg-emerald-500', e: '🚀' },
    { r: '60-119 FPS', l: 'ممتاز', d: 'أداء سلس - مناسب لجميع الاستخدامات', c: 'bg-green-500', e: '✨' },
    { r: '30-59 FPS', l: 'مقبول', d: 'أداء متوسط - قد تلاحظ بعض التقطيع', c: 'bg-yellow-500', e: '⚠️' },
    { r: '< 30 FPS', l: 'ضعيف', d: 'أداء منخفض - تقطيع واضح', c: 'bg-red-500', e: '🐌' },
  ];

  const deviceRows = [
    { l: 'النوع', v: device.isMobile ? '📱 هاتف محمول' : '💻 كمبيوتر' },
    { l: 'المنصة', v: device.platform },
    { l: 'الأنوية', v: device.cores ? `${device.cores} أنوية` : 'غير معروف' },
    { l: 'الذاكرة', v: device.memory ? `${device.memory} GB` : 'غير معروف' },
    { l: 'الشاشة', v: `${device.screenW} × ${device.screenH}` },
    { l: 'كثافة البكسل', v: `${device.pixelRatio}x` },
    { l: 'كرت الشاشة', v: device.gpu },
    { l: 'الاتصال', v: device.connection },
  ];

  /* ══════════ RENDER ══════════ */
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      {/* Top Ad */}
      <AdBanner position="إعلان أعلى الصفحة الرئيسية" size="leaderboard" />

      {/* Hero */}
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-l from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            FPS Meter
          </h1>
          <span className="text-3xl sm:text-4xl">⚡</span>
        </div>
        <p className="text-slate-400 text-sm">قم بقياس أداء جهازك ومعرفة عدد الإطارات في الثانية</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="px-2 py-0.5 bg-slate-800 rounded-full text-xs text-slate-400">
            {device.isMobile ? '📱 هاتف' : '💻 كمبيوتر'}
          </span>
          <span className="px-2 py-0.5 bg-slate-800 rounded-full text-xs text-slate-400">
            {device.screenW}×{device.screenH}
          </span>
        </div>
      </header>

      {/* ── GAUGE ── */}
      <div className="flex justify-center mb-6">
        <svg width="260" height="220" viewBox="0 0 260 220">
          <path d={arc(sA, eA)} fill="none" stroke="#1e293b" strokeWidth={sw + 4} strokeLinecap="round" />
          {show && (
            <path
              d={arc(sA, curA)}
              fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 8px ${col}55)`, transition: 'all .3s ease-out' }}
            />
          )}
          {[0, 30, 60, 90, 120, 144].map(t => {
            const a = sA + (eA - sA) * t / maxG;
            const r2 = ((a - 90) * Math.PI) / 180;
            const ix = cx + (rad - 18) * Math.cos(r2), iy = cy + (rad - 18) * Math.sin(r2);
            const ox = cx + rad * Math.cos(r2), oy = cy + rad * Math.sin(r2);
            const lx = cx + (rad + 18) * Math.cos(r2), ly = cy + (rad + 18) * Math.sin(r2);
            return (
              <g key={t}>
                <line x1={ox} y1={oy} x2={ix} y2={iy} stroke="#475569" strokeWidth={t % 60 === 0 ? 2 : 1} />
                <text x={lx} y={ly} fill="#94a3b8" fontSize="9" textAnchor="middle" dominantBaseline="middle">{t}</text>
              </g>
            );
          })}
          <text x={cx} y={cy - 8} fill={show ? col : '#64748b'} fontSize="48" fontWeight="bold"
            textAnchor="middle" dominantBaseline="middle"
            style={{ filter: show ? `drop-shadow(0 0 10px ${col}55)` : 'none' }}>
            {show ? fps.current : '--'}
          </text>
          <text x={cx} y={cy + 24} fill="#94a3b8" fontSize="15" textAnchor="middle" dominantBaseline="middle">FPS</text>
        </svg>
      </div>

      {/* ── BUTTONS ── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
        {!running ? (
          <button
            type="button"
            onClick={start}
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 shadow-lg shadow-emerald-500/10 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <span>ابدأ القياس</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={stop}
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-lg bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 shadow-lg shadow-red-500/10 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <span>إيقاف</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <rect x="5" y="4" width="3" height="12" rx="1" />
              <rect x="12" y="4" width="3" height="12" rx="1" />
            </svg>
          </button>
        )}

        {stopped && (
          <button
            type="button"
            onClick={resetAll}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-slate-400 border border-slate-700 hover:bg-slate-800 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <span>إعادة تعيين</span>
            <span>🔄</span>
          </button>
        )}
      </div>

      {/* Running/Stopped indicator */}
      {running && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 text-sm font-medium">جارٍ القياس...</span>
        </div>
      )}
      {stopped && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="inline-flex rounded-full h-3 w-3 bg-amber-500" />
          <span className="text-amber-400 text-sm font-medium">تم الإيقاف — النتائج محفوظة</span>
        </div>
      )}

      {/* Performance badge */}
      {show && fps.avg > 0 && (
        <div className="bg-slate-800/50 rounded-2xl p-3 border border-slate-700/50 text-center mb-6">
          <span className="text-2xl">{label.e}</span>
          <span className={`mr-2 text-lg font-bold ${label.c}`}>{label.t}</span>
        </div>
      )}

      {/* ── STRESS LEVEL ── */}
      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 mb-6">
        <h3 className="text-slate-400 text-sm mb-3 text-right flex items-center justify-end gap-2">
          مستوى الضغط على الجهاز <span>🔥</span>
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {stressOpts.map(s => (
            <button key={s.lv} type="button"
              onClick={() => {
                setStress(s.lv);
                if (running) { setRunning(false); setTimeout(() => { setFps(INITIAL_FPS); setStopped(false); setRunning(true); }, 60); }
              }}
              className={`p-3 rounded-xl text-center transition-all duration-200 cursor-pointer border active:scale-95 ${
                stress === s.lv
                  ? 'bg-slate-700/80 border-blue-500/50 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/50 border-slate-700/30 hover:bg-slate-800/50'
              }`}
            >
              <div className="text-xl mb-1">{s.emoji}</div>
              <div className="text-white text-sm font-medium">{s.label}</div>
              <div className="text-slate-500 text-xs mt-0.5">{s.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── CANVAS ── */}
      <div className="relative bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-700/50 mb-6">
        <canvas ref={canvasRef} className="w-full h-48 sm:h-56 block" />
        {running && (
          <div className="absolute top-2 left-2 bg-black/60 text-slate-300 text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
            🎨 {stress === 1 ? 200 : stress === 2 ? 600 : 1400} جسيم
          </div>
        )}
        {!running && !stopped && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
            <div className="text-center"><div className="text-3xl mb-2">🎮</div>منطقة اختبار الرسوميات</div>
          </div>
        )}
      </div>

      {/* Mid Ad */}
      <AdBanner position="إعلان وسط الصفحة" size="square" />

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {cards.map(c => (
          <div key={c.l} className={`bg-gradient-to-br ${c.g} rounded-xl p-3 border ${c.b} backdrop-blur-sm`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg">{c.ic}</span>
              <span className="text-slate-400 text-xs">{c.l}</span>
            </div>
            <div className="text-left">
              <span className="text-white text-xl font-bold">{c.v}</span>
              {c.u && <span className="text-slate-400 text-xs mr-1"> {c.u}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* ── GRAPH ── */}
      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 mb-6">
        <h3 className="text-slate-400 text-sm mb-3 text-right">📊 الرسم البياني للـ FPS</h3>
        {pts.length < 2 ? (
          <div className="flex items-center justify-center h-28 text-slate-500 text-sm">
            ابدأ الاختبار لعرض الرسم البياني
          </div>
        ) : (
          <svg width="100%" viewBox={`0 0 ${gW} ${gH}`} className="overflow-visible">
            <defs>
              <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={col} stopOpacity=".3" />
                <stop offset="100%" stopColor={col} stopOpacity=".02" />
              </linearGradient>
            </defs>
            {[0, 30, 60, 90, 120, 144].map(t => {
              const y = gP.t + gIH - (t / maxG) * gIH;
              return (
                <g key={t}>
                  <line x1={gP.l} y1={y} x2={gW - gP.r} y2={y} stroke="#334155" strokeWidth=".5" strokeDasharray="4 4" />
                  <text x={gP.l - 4} y={y + 3} fill="#64748b" fontSize="8" textAnchor="end">{t}</text>
                </g>
              );
            })}
            <path d={area} fill="url(#ag)" />
            <path d={line} fill="none" stroke={col} strokeWidth="2" strokeLinejoin="round"
              style={{ filter: `drop-shadow(0 0 4px ${col}55)` }} />
            {pts.length > 0 && (
              <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3.5" fill={col}
                style={{ filter: `drop-shadow(0 0 6px ${col})` }} />
            )}
          </svg>
        )}
      </div>

      {/* ── DEVICE INFO ── */}
      <div className="mb-6">
        <button type="button" onClick={() => setShowInfo(!showInfo)}
          className="w-full p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 text-sm hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between active:scale-[.98]">
          <svg className={`w-4 h-4 transition-transform ${showInfo ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="flex items-center gap-2">معلومات الجهاز 📋</span>
        </button>
        {showInfo && (
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 mt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {deviceRows.map(r => (
                <div key={r.l} className="flex items-center justify-between bg-slate-900/50 rounded-lg px-3 py-2">
                  <span className="text-slate-300 text-xs truncate max-w-[60%]" dir="ltr">{r.v}</span>
                  <span className="text-slate-500 text-xs">{r.l}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Banner Ad */}
      <AdBanner position="إعلان بين الأقسام" size="banner" />

      {/* ── INFO CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {[
          { e: '🎯', t: 'ما هو FPS؟', d: 'FPS تعني عدد الإطارات في الثانية. كلما زاد العدد، كانت تجربة الاستخدام أكثر سلاسة' },
          { e: '🏆', t: 'الأداء المثالي', d: '60 FPS هو المعيار المثالي للاستخدام العادي، و 120+ FPS للألعاب الاحترافية' },
          { e: '💡', t: 'نصيحة', d: 'أغلق البرامج الأخرى للحصول على نتائج أكثر دقة وتمثيلاً لأداء جهازك الحقيقي' },
        ].map(c => (
          <div key={c.t} className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 text-right">
            <div className="text-2xl mb-2">{c.e}</div>
            <h4 className="text-white text-sm font-semibold mb-1">{c.t}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>

      {/* ── REF TABLE ── */}
      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 mb-8">
        <h3 className="text-slate-300 text-sm font-semibold mb-3 text-right flex items-center justify-end gap-2">
          جدول مرجعي للـ FPS <span>📖</span>
        </h3>
        <div className="space-y-2">
          {refTable.map(i => (
            <div key={i.r} className="flex items-center gap-3 bg-slate-900/50 rounded-lg p-3">
              <span className="text-xl">{i.e}</span>
              <div className="flex-1 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-slate-400 text-xs">{i.l}</span>
                  <span className={`w-2 h-2 rounded-full ${i.c}`} />
                  <span className="text-white text-sm font-mono font-bold">{i.r}</span>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">{i.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ad */}
      <AdBanner position="إعلان أسفل المحتوى" size="leaderboard" />
    </div>
  );
}
