import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import DoguHero from "../components/DoguHero";
import DoguSectionInfo from "../components/DoguSectionInfo";
import MoreWorks from "../components/MoreWorks";
import Footer from "../components/Footer";
import MenuOverlay from "../components/MenuOverlay";
import { useLanguage } from "../i18n/LanguageContext";
import { doguCaseStudyMessages } from "../i18n/doguCaseStudyMessages";

const MOTION_VIDEO_URL = "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/move.mp4";
const FREE_CHAT_VIDEO_URL = "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/free%20chat.mp4";
const LONG_TERM_MEMORY_VIDEO_URL = "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/longterm.mp4";
/** Long term memory 下方全屏滑道使用的 CG 视频 */
const MIRACLE_CG_VIDEO_URL = "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Miracle%20CG.mp4";

/** System Design 右侧视频：同高、等比例宽、循环；hover 时右下角显示暂停/静音。静音状态由父组件统一控制。 */
function SystemDesignVideo({
  src = MOTION_VIDEO_URL,
  isMuted,
  onMutedToggle,
}: {
  src?: string;
  isMuted: boolean;
  onMutedToggle: () => void;
}) {
  const { lang } = useLanguage();
  const ui = doguCaseStudyMessages[lang].ui;
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  /** 视频宽高比，用于包裹「视频+按钮」的容器，使按钮始终在视频画面右下角内 */
  const [videoAspect, setVideoAspect] = useState<number | null>(null);

  const isPlaying = isInView && !userPaused;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) v.play().catch(() => {});
    else v.pause();
  }, [isPlaying]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
  }, [isMuted]);

  return (
    <div
      ref={containerRef}
      className="relative border border-white/0 flex flex-col items-end justify-center w-full h-full min-h-0"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 按视频真实宽高比包裹，使暂停/静音按钮始终在视频画面右下角内 */}
      <div
        className="relative ml-auto h-full max-w-full min-h-0 shrink-0 overflow-hidden"
        style={{ aspectRatio: videoAspect != null ? String(videoAspect) : "16/9" }}
      >
        <video
          ref={videoRef}
          src={src}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (v.videoWidth && v.videoHeight) setVideoAspect(v.videoWidth / v.videoHeight);
          }}
          className="absolute inset-0 w-full h-full object-contain object-center block"
          loop
          muted={isMuted}
          playsInline
          aria-label={ui.video.systemDesignAria}
        />
        {isHovering && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-black/70 px-2 py-1.5">
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            className="text-white hover:text-white/80 transition-colors"
            aria-label={isPlaying ? ui.video.pause : ui.video.play}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>
          <button
            type="button"
            onClick={onMutedToggle}
            className="text-white hover:text-white/80 transition-colors"
            aria-label={isMuted ? ui.video.unmute : ui.video.mute}
          >
            {isMuted ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.5 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.5 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
            )}
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

function MagicWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── WebGL 初始化 ──────────────────────────────────────────────────────────
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return;

    const VERT = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    // 与原 JS 算法完全相同的 domain-warping fBm，移到 GPU 执行
    const FRAG = `
      precision mediump float;
      uniform float u_t;
      uniform vec2  u_res;

      float h(float x, float y) {
        return fract(sin(x * 127.1 + y * 311.7) * 43758.5453);
      }
      float vn(float x, float y) {
        float ix = floor(x), iy = floor(y);
        float fx = fract(x), fy = fract(y);
        float ux = fx*fx*(3.-2.*fx), uy = fy*fy*(3.-2.*fy);
        return h(ix,iy)*(1.-ux)*(1.-uy) + h(ix+1.,iy)*ux*(1.-uy)
             + h(ix,iy+1.)*(1.-ux)*uy   + h(ix+1.,iy+1.)*ux*uy;
      }
      float n3(float x, float y, float z) {
        float iz = floor(z), fz = fract(z);
        float uz = fz*fz*(3.-2.*fz);
        return vn(x+iz*7.3, y+iz*3.7)*(1.-uz)
             + vn(x+(iz+1.)*7.3, y+(iz+1.)*3.7)*uz;
      }
      float fbm(float x, float y, float z) {
        return n3(x,y,z)*.500 + n3(x*2.1,y*2.1,z*1.1)*.250
             + n3(x*4.2,y*4.2,z*1.2)*.125 + n3(x*8.4,y*8.4,z*1.3)*.063;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_res;
        float nx = uv.x * 3.2;
        float ny = (1.0 - uv.y) * 2.2;
        float z  = u_t;

        float q0 = fbm(nx,           ny,           z);
        float q1 = fbm(nx + 5.2,     ny + 1.3,     z);
        float r0 = fbm(nx + 1.7*q0,          ny + 1.7*q1,          z + 0.3);
        float r1 = fbm(nx + 1.7*q0 + 3.7,    ny + 1.7*q1 + 1.9,    z + 0.3);
        float v  = fbm(nx + 1.7*r0, ny + 1.7*r1, z);

        v = pow(max(0.0, v * 1.8 - 0.3), 1.8);
        float b = clamp(v * 1.333, 0.0, 1.0);
        gl_FragColor = vec4(b, b, b, 1.0);
      }
    `;

    const mkShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // 覆盖整个 viewport 的两个三角形
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uT   = gl.getUniformLocation(prog, "u_t");
    const uRes = gl.getUniformLocation(prog, "u_res");

    const resize = () => {
      // 0.4x 分辨率渲染，CSS 放大（噪声图本来就模糊，看不出差别）
      canvas.width  = Math.ceil((canvas.offsetWidth  || window.innerWidth)  * 0.4);
      canvas.height = Math.ceil((canvas.offsetHeight || window.innerHeight) * 0.4);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let animId: number;
    let t = 0;
    let frame = 0;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      frame++;
      if (frame % 2 !== 0) return; // 限制到 ~30fps
      gl.uniform1f(uT,  t * 0.004);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      t++;
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
      {/* 胶片颗粒 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
          backgroundRepeat: "repeat",
          opacity: 0.06,
          mixBlendMode: "overlay",
        }}
      />
      {/* 底部渐隐 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 45%, #000 100%)" }}
      />
    </div>
  );
}

function SystemDesignHeader({
  title,
  imageSrc,
  imageAlt,
  onFullscreenChange,
}: {
  title: string;
  imageSrc: string;
  imageAlt: string;
  onFullscreenChange: (v: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // amount:0 = 占位 div 一进入视口底部就立刻显示 overlay，不露白
  const isInView = useInView(ref, { amount: 0.15 });
  // 用占位 div 的滚动进度驱动图片位移
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["30%", "-50%"]);

  useEffect(() => {
    onFullscreenChange(isInView);
  }, [isInView, onFullscreenChange]);

  return (
    <>
      {/* 文档流占位：200vh 给足滚动空间驱动图片动画 */}
      <div ref={ref} style={{ height: "200vh" }} />

      {/* 真正全屏覆盖层，进入/离开视口时 500ms 淡入淡出 */}
      <div
        className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none transition-opacity duration-500"
        style={{ opacity: isInView ? 1 : 0 }}
      >
        <MagicWaveBackground />
        <div className="relative z-10 w-full h-full">
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 shrink-0 -rotate-90 whitespace-nowrap">
            <span className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
              {title}
            </span>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw]">
            <motion.div style={{ y: imageY }}>
              <img src={imageSrc} alt={imageAlt} className="w-full h-auto" aria-hidden />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

/** 标题逐词 clip 上滑动画（Framer 风格） */
function AnimatedTitle({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const words = children.split(" ");
  return (
    <h2 ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-flex", overflow: "hidden", verticalAlign: "top" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span style={{ display: "inline-block", width: "0.3em" }} />}
        </span>
      ))}
    </h2>
  );
}

/** 段落列表：每段错位淡入上移 */
function AnimatedParagraphs({
  paragraphs,
  containerClassName,
  paraClassName,
  baseDelay = 0,
}: {
  paragraphs: React.ReactNode[];
  containerClassName?: string;
  paraClassName?: string;
  baseDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <div ref={ref} className={containerClassName}>
      {paragraphs.map((para, i) => (
        <motion.p
          key={i}
          className={paraClassName}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: baseDelay + i * 0.14 }}
        >
          {para}
        </motion.p>
      ))}
    </div>
  );
}

type CaseStudyPageProps = { slug?: string };

const CASE_SECTION_IDS = [
  "research",
  "the-pivot",
  "system-design",
  "risk-safety",
  "results",
  "reflection",
] as const;
const SECTION_REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function DoguCaseStudyPage({ slug }: CaseStudyPageProps) {
  const { lang } = useLanguage();
  const msg = doguCaseStudyMessages[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [tocHoverIndex, setTocHoverIndex] = useState<number | null>(null);
  const [activeTocIndex, setActiveTocIndex] = useState<number>(0);
  // const miraParagraphRef = useRef<HTMLParagraphElement | null>(null); // 与 case-study-intro 一起注释
  const tocSectionRef = useRef<HTMLElement | null>(null);
  const moreWorksSectionRef = useRef<HTMLElement | null>(null);
  const [tocSectionInZone, setTocSectionInZone] = useState(false);
  const [beforeResearch, setBeforeResearch] = useState(true);
  const [moreWorksInBottomFifth, setMoreWorksInBottomFifth] = useState(false);
  const [pastReflection, setPastReflection] = useState(false);
  const longTermMemoryVideoZoneRef = useRef<HTMLDivElement | null>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);
  const [videoOverlayActive, setVideoOverlayActive] = useState(false);
  const [fullscreenVideoPaused, setFullscreenVideoPaused] = useState(false);
  const [fullscreenVideoHover, setFullscreenVideoHover] = useState(false);
  /** 全页视频静音状态统一：System Design 三块 + 全屏 CG 共用一个，点静音/取消静音则全部同步 */
  const [allVideosMuted, setAllVideosMuted] = useState(true);
  const [isStructureFullscreen, setIsStructureFullscreen] = useState(false);

  const resultsContentRef = useRef<HTMLDivElement | null>(null);
  const resultsAnimDone = useRef(false);
  const [resultVal1, setResultVal1] = useState(0);
  const [resultVal2, setResultVal2] = useState(0);
  const [resultVal3, setResultVal3] = useState(0);

  // 进入详情页时滚动到顶部，避免沿用首页的滚动位置
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // 案例页使用独立标题：项目名 | 站点名
  useEffect(() => {
    const siteSuffix = msg.meta.siteSuffix;
    document.title = slug ? `${decodeURIComponent(slug)} | ${siteSuffix}` : siteSuffix;
    return () => {
      document.title = msg.meta.defaultDocumentTitle;
    };
  }, [slug, msg.meta.defaultDocumentTitle, msg.meta.siteSuffix]);

  useEffect(() => {
    const onScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) setScrollPercent(100);
      else setScrollPercent(Math.round((window.scrollY / docHeight) * 100));
      const center = window.innerHeight / 2;
      let found = -1;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < CASE_SECTION_IDS.length; i++) {
        const el = document.getElementById(CASE_SECTION_IDS[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= center && center <= rect.bottom) {
          found = i;
          break;
        }
        const mid = (rect.top + rect.bottom) / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setActiveTocIndex(found >= 0 ? found : best);
      // research 顶部进入视口下半段前，隐藏目录
      const researchEl = document.getElementById("research");
      if (researchEl) {
        setBeforeResearch(researchEl.getBoundingClientRect().top > window.innerHeight * 0.5);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  // 中间 section 是否与视口有交集（任意重叠即算）；不裁 rootMargin，上下滑边界一致
  useEffect(() => {
    const el = tocSectionRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setTocSectionInZone(entry.isIntersecting));
      },
      { threshold: 0, rootMargin: "0px 0px -90% 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  // More Works 任意部分进入视口即隐藏目录，离开视口再显示（避免滚到 More Works 时目录先消失又出现）
  useEffect(() => {
    const el = moreWorksSectionRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setMoreWorksInBottomFifth(entry.isIntersecting));
      },
      { threshold: 0, rootMargin: "0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  // 滚过 Reflection 后左侧目录一并消失（Reflection 顶部一离开视口就隐藏，无 More Works 的案例页如 Tencent 也生效）
  useEffect(() => {
    const el = document.getElementById("reflection");
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      setPastReflection(rect.top < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Results 与 Reflection 之间全屏视频滑道：进入视口时显示全屏 overlay，离开时恢复
  useEffect(() => {
    const el = longTermMemoryVideoZoneRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVideoOverlayActive(entry.isIntersecting));
      },
      { threshold: 0.25, rootMargin: "0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  // 全屏视频 overlay 显示时根据用户暂停状态播放/暂停，隐藏时暂停
  useEffect(() => {
    const v = fullscreenVideoRef.current;
    if (!v) return;
    if (videoOverlayActive && !fullscreenVideoPaused) v.play().catch(() => {});
    else {
      v.pause();
      if (!videoOverlayActive) v.currentTime = 0;
    }
  }, [videoOverlayActive, fullscreenVideoPaused]);

  useEffect(() => {
    const v = fullscreenVideoRef.current;
    if (!v) return;
    v.muted = allVideosMuted;
  }, [allVideosMuted, videoOverlayActive]);


  // Results 三项数据：仅当滚动到该区域进入视口时才触发 0→7000 / 0→1.75M / 0→65 递增动画
  useEffect(() => {
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const DURATION = 2500;
    const runAnim = () => {
      if (resultsAnimDone.current) return;
      resultsAnimDone.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / DURATION, 1);
        const e = easeOutCubic(t);
        setResultVal1(Math.round(7000 * e));
        setResultVal2(175 * e);
        setResultVal3(Math.round(65 * e));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    let ob: IntersectionObserver | null = null;
    const setup = () => {
      const el = document.getElementById("results");
      if (!el) return;
      ob = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) runAnim();
        },
        { threshold: 0.1 }
      );
      ob.observe(el);
    };
    const t = setTimeout(setup, 100);
    return () => {
      clearTimeout(t);
      ob?.disconnect();
    };
  }, []);

  return (
    <>
      <Header
        scrollPercent={scrollPercent}
        onMenuClick={() => setMenuOpen(true)}
        isMenuOpen={menuOpen}
        onMenuClose={() => setMenuOpen(false)}
      />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      {/* Results 与 Reflection 之间全屏视频滑道：仅 header 保留，左侧目录隐藏，视频左右铺满，左下角 Scroll to Continue、右下角暂停/静音 */}
      <AnimatePresence>
        {videoOverlayActive && (
          <motion.div
            className="fixed left-0 right-0 bottom-0 top-0 z-40 bg-black flex items-center justify-center"
            aria-hidden
            onMouseEnter={() => setFullscreenVideoHover(true)}
            onMouseLeave={() => setFullscreenVideoHover(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.video
              ref={fullscreenVideoRef}
              src={MIRACLE_CG_VIDEO_URL}
              className="absolute inset-0 w-full h-full object-cover"
              loop
              muted={allVideosMuted}
              playsInline
              aria-label={msg.ui.video.miracleCgAria}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
            <motion.p
              className="absolute left-6 bottom-8 md:left-10 md:bottom-12 text-white text-sm md:text-base font-semibold tracking-wide z-10"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {msg.ui.scrollToContinue}
            </motion.p>
            {fullscreenVideoHover && (
              <div className="absolute bottom-8 right-6 md:bottom-12 md:right-10 flex items-center gap-2 rounded-lg bg-black/70 px-2 py-1.5 z-10">
                <button
                  type="button"
                  onClick={() => setFullscreenVideoPaused((p) => !p)}
                  className="text-white hover:text-white/80 transition-colors"
                  aria-label={fullscreenVideoPaused ? msg.ui.video.play : msg.ui.video.pause}
                >
                  {fullscreenVideoPaused ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setAllVideosMuted((m) => !m)}
                  className="text-white hover:text-white/80 transition-colors"
                  aria-label={allVideosMuted ? msg.ui.video.unmute : msg.ui.video.mute}
                >
                  {allVideosMuted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.5 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.5 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <main>
        <DoguHero />
        <DoguSectionInfo />
        {/* ========== 全屏背景视频 ========== */}
        <section className="relative w-full h-screen overflow-hidden">
          <video
            src="https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Dogu_back.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-110"
            style={{ filter: "blur(30px)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          {/* Overview 文字居中叠在视频上 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
            <div className="space-y-4 text-white/85 text-base font-light md:text-lg leading-relaxed max-w-xl text-left">
              {doguCaseStudyMessages[lang].sections[0].paragraphs.slice(0, 4).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {doguCaseStudyMessages[lang].overviewSkills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-lg border border-white/30 text-white/70 text-sm font-light"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ========== 上一个 section：Mira 那句话（已注释） ========== */}
        {/* <section id="case-study-intro" className="bg-black">
          <p
            ref={miraParagraphRef}
            className="bg-black text-white text-center text-xl md:text-2xl font-bold opacity-90 mt-6 md:mt-8 py-6 md:py-8 px-5 md:px-20 flex items-center justify-center gap-2 flex-wrap"
          >
            <img
              src="https://res.cloudinary.com/dcsejrast/image/upload/v1771631281/small_mira_gec2wr.png"
              alt=""
              className="inline-block w-[2.5em] h-[2.5em] object-contain shrink-0"
              aria-hidden
            />
            <span>Miracle is QQ Speed's first AI companion, always there when you return.</span>
          </p>
        </section> */}

        {/* ========== 中间 section：左侧目录 + Overview 等右侧内容 ========== */}
        <section ref={tocSectionRef} id="case-study-toc-content" className="flex bg-black min-h-[60vh] pt-12 md:pt-16">
          {/* 左侧占位 */}
          <div className="hidden md:block shrink-0 w-40 min-[1350px]:w-52" aria-hidden />
          {/* 左侧目录：overview 时隐藏 */}
          <nav
            className={`hidden md:block fixed left-0 top-1/2 -translate-y-1/2 z-10 pl-5 pr-5 py-4 transition-opacity duration-300 ${
              beforeResearch || isStructureFullscreen || pastReflection
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
            aria-label="Case study sections"
          >
            <ul className="flex flex-col text-left list-none p-0 m-0">
              {msg.toc.map((item, i) => {
                const isHovered = tocHoverIndex === i;
                const isActiveByScroll = tocHoverIndex === null && activeTocIndex === i;
                const isAdjacent =
                  tocHoverIndex !== null
                    ? i === tocHoverIndex - 1 || i === tocHoverIndex + 1
                    : i === activeTocIndex - 1 || i === activeTocIndex + 1;
                const isHighlight = isHovered || isActiveByScroll;
                const weight = isHovered || isActiveByScroll ? 500 : isAdjacent ? 500 : undefined;
                // 选中/悬停时的缩放：非最大屏用 scale-150(1.5)，最大屏(≥1350px)用 scale-200(2)
                const scaleClass = isHighlight
                  ? "scale-150 min-[1350px]:scale-200"
                  : isAdjacent
                    ? "scale-100"
                    : "scale-200";
                return (
                  <li key={item.id} className="leading-none">
                    <a
                      href={`#${item.id}`}
                      className={`inline-block py-2.5 text-sm md:text-lg font-medium origin-left transition-[transform,color,font-weight] duration-500 ease-out ${scaleClass}`}
                      style={{
                        color: isHighlight ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)",
                        fontWeight: weight,
                      }}
                      onMouseEnter={() => setTocHoverIndex(i)}
                      onMouseLeave={() => setTocHoverIndex(null)}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(item.id);
                        if (!el) return;
                        // 以右侧 section 内的标题（h2）为基准，让标题贴近视口顶部
                        const title = el.querySelector("h2");
                        const targetEl = title ?? el;
                        const rect = targetEl.getBoundingClientRect();
                        const topOffset = 56; // 标题距离视口顶部的距离（留出固定导航）
                        const targetY = rect.top + window.scrollY - topOffset;
                        window.scrollTo({ top: targetY, behavior: "smooth" });
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          {/* 右侧内容区：可滚动；右边缘与 header 对齐用 pr-5 */}
          <article className="flex-1 min-w-0 px-5 md:px-10 min-[1350px]:px-16">
            {msg.sections.flatMap((section) => {
              const shouldAnimateSection = section.id !== "overview" && section.id !== "system-design";
              const sectionEl = (
                <motion.section
                  key={section.id}
                  id={section.id}
                  className={`case-study-section ${
                    section.id === "system-design" ? "pt-[200px] pb-[200px]" : "pt-12 pb-12 sm:pt-20 sm:pb-20 md:pt-32 md:pb-32"
                  } ${section.id === "overview" ? "" : "min-h-[100vh]"}`}
                  initial={shouldAnimateSection ? { opacity: 0, y: 48 } : undefined}
                  whileInView={shouldAnimateSection ? { opacity: 1, y: 0 } : undefined}
                  viewport={shouldAnimateSection ? { amount: 0.55, once: false } : undefined}
                  transition={shouldAnimateSection ? { duration: 0.85, ease: SECTION_REVEAL_EASE } : undefined}
                >
                {section.id === "overview" ? null
                : section.id === "research" ? (
                  <div className="flex flex-col max-w-[50%] min-h-[90vh]">
                    <AnimatedTitle className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-4 sm:mb-8 md:mb-12 lg:mb-20">
                      {section.title}
                    </AnimatedTitle>
                    <div className="mt-auto text-white/80 text-base font-light md:text-lg leading-relaxed">
                      <AnimatedParagraphs
                        paragraphs={section.paragraphs}
                        containerClassName="space-y-0"
                      />
                    </div>
                  </div>
                ) : section.id === "the-pivot" ? (
                  /* The Pivot：左侧文字 + 右侧 7 张图左右交替排列 */
                  <div className="flex flex-row items-start gap-8 md:gap-10">
                    <div className="min-w-0 flex-1 max-w-[50%] flex flex-col min-h-[90vh]">
                      <AnimatedTitle className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-4 sm:mb-8 md:mb-12 lg:mb-20">
                        {section.title}
                      </AnimatedTitle>
                      <AnimatedParagraphs
                        paragraphs={section.paragraphs}
                        containerClassName="mt-auto space-y-10 md:space-y-12"
                        paraClassName="text-white/80 text-base font-light md:text-lg leading-relaxed"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-4 md:gap-6 min-h-[90vh] sticky top-20 self-start max-w-[50vw]">
                      {[
                        { src: "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Group%2030.svg", align: "left" },
                        { src: "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Group%2031.svg", align: "right" },
                        { src: "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Group%2032.svg", align: "left" },
                        { src: "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Group%2033.svg", align: "right" },
                        { src: "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Group%2034.svg", align: "left" },
                        { src: "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Group%2035.svg", align: "right" },
                        { src: "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Group%2036.svg", align: "left" },
                      ].map((img, i) => (
                        <div key={i} className={`flex flex-1 min-h-0 ${img.align === "left" ? "justify-start" : "justify-end"}`}>
                          <motion.img
                            src={img.src}
                            alt=""
                            className="max-w-full max-h-full w-auto h-full object-contain object-top border border-white/0 block"
                            aria-hidden
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: 0.5, once: false }}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : section.id === "system-design" ? (
                  /* System Design：标题+图滚动全屏动画 + 下面每块均为吸附模块 */
                  <div className="flex flex-col gap-12 md:gap-16 overflow-visible">
                    <SystemDesignHeader
                      title={section.title}
                      imageSrc="https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Dogu_system.png"
                      imageAlt={msg.systemDesign.structureAlt}
                      onFullscreenChange={setIsStructureFullscreen}
                    />
                    {/* 每块：左侧无 max-height 随内容增高，右侧固定高度且 sticky；进入视口时滑显 */}
                    {[0, 2, 4].map((startIdx) => (
                      <motion.div
                        key={startIdx}
                        className={`flex flex-row items-start gap-8 md:gap-10 overflow-visible min-h-[100vh] ${
                          startIdx === 0 ? "" : "mt-16 md:mt-24"
                        }`}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.35 }}
                        transition={{ duration: 0.85, ease: SECTION_REVEAL_EASE }}
                      >
                        <div className="min-w-0 flex-1 max-w-[50%] flex flex-col min-h-[80vh] overflow-visible">
                            {startIdx === 0 ? (
                              <>
                                <h3 className="text-white text-3xl md:text-4xl font-semibold tracking-tight shrink-0">
                                  {msg.systemDesign.blocks.interaction3d.title}
                                </h3>
                              <div className="hidden md:block flex-1 min-h-0" aria-hidden />
                              <div className="text-white/80 text-base font-light md:text-lg leading-relaxed space-y-10 md:space-y-12 shrink-0 mt-4 sm:mt-6 md:mt-0">
                                {msg.systemDesign.blocks.interaction3d.paragraphs.map((p, idx) => (
                                  <p key={idx}>{p}</p>
                                ))}
                              </div>
                            </>
                            ) : startIdx === 2 ? (
                              <>
                                <h3 className="text-white text-3xl md:text-4xl font-semibold tracking-tight shrink-0">
                                  {msg.systemDesign.blocks.freeChat.title}
                                </h3>
                                <div className="hidden md:block flex-1 min-h-0" aria-hidden />
                                <div className="text-white/80 text-base font-light md:text-lg leading-relaxed space-y-10 md:space-y-12 shrink-0 mt-4 sm:mt-6 md:mt-0">
                                  {msg.systemDesign.blocks.freeChat.paragraphs.map((p, idx) => (
                                    <p key={idx}>{p}</p>
                                  ))}
                                </div>
                              </>
                            ) : startIdx === 4 ? (
                              <>
                                <h3 className="text-white text-3xl md:text-4xl font-semibold tracking-tight shrink-0">
                                  {msg.systemDesign.blocks.longTermMemory.title}
                                </h3>
                                <div className="hidden md:block flex-1 min-h-0" aria-hidden />
                                <div className="text-white/80 text-base font-light md:text-lg leading-relaxed space-y-10 md:space-y-12 shrink-0 mt-4 sm:mt-6 md:mt-0">
                                  {msg.systemDesign.blocks.longTermMemory.paragraphs.map((p, idx) => (
                                    <p key={idx}>{p}</p>
                                  ))}
                                </div>
                              </>
                            ) : (
                            <div className="mt-auto text-white/80 text-base font-light md:text-lg leading-relaxed space-y-10 md:space-y-12">
                              <p className="text-white/80">
                                <span className="font-medium text-white">{section.paragraphs[startIdx]}</span>
                                {section.paragraphs[startIdx + 1]}
                              </p>
                            </div>
                          )}
                        </div>
                        {/* 右列铺满至内容区右边缘，与 header 右缘（pr-5）对齐；视频在列内右对齐 */}
                        <div className="flex-1 min-w-0 flex flex-col items-end self-start h-screen sticky top-0">
                          <SystemDesignVideo
                            src={startIdx === 0 ? MOTION_VIDEO_URL : startIdx === 2 ? FREE_CHAT_VIDEO_URL : LONG_TERM_MEMORY_VIDEO_URL}
                            isMuted={allVideosMuted}
                            onMutedToggle={() => setAllVideosMuted((m) => !m)}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : section.id === "risk-safety" ? (
                  /* Risk & Safety：与 The Pivot 同布局，左侧标题顶对齐、正文底对齐，右侧占位假装有图 */
                  <div className="flex flex-row items-start gap-8 md:gap-10">
                    <div className="min-w-0 flex-1 max-w-[50%] flex flex-col min-h-[90vh]">
                      <AnimatedTitle className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-4 sm:mb-8 md:mb-12 lg:mb-20">
                        {section.title}
                      </AnimatedTitle>
                      <AnimatedParagraphs
                        paragraphs={section.paragraphs}
                        containerClassName="mt-auto space-y-10 md:space-y-12"
                        paraClassName="text-white/80 text-base font-light md:text-lg leading-relaxed"
                      />
                    </div>
                    <div className="flex-1 min-w-0 min-h-[90vh] sticky top-20 self-start max-w-[50vw]" aria-hidden />
                  </div>
                ) : section.id === "results" ? (
                  /* Results：标题 + 三项指标（数字从 0 递增），右侧占位假装有图 */
                  <div className="flex flex-row items-start gap-8 md:gap-10">
                    <div
                      ref={resultsContentRef}
                      className="min-w-0 flex-1 max-w-[50%] flex flex-col min-h-[90vh]"
                    >
                      <AnimatedTitle className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-4 sm:mb-8 md:mb-12 lg:mb-20">
                        {section.title}
                      </AnimatedTitle>
                      <div className="mt-auto flex flex-col gap-10 md:gap-12">
                        <div className="flex items-baseline gap-6 md:gap-8">
                          <span className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight w-[7rem] sm:w-[8.5rem] md:w-[10rem] shrink-0">
                            {resultVal1.toLocaleString()}+
                          </span>
                          <span className="text-white/80 text-base font-light md:text-lg">
                            {msg.ui.results.payingUsersIn5Days}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-6 md:gap-8">
                          <span className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight w-[7rem] sm:w-[8.5rem] md:w-[10rem] shrink-0">
                            {(resultVal2 / 100).toFixed(2)}M
                          </span>
                          <span className="text-white/80 text-base font-light md:text-lg">
                            {msg.ui.results.firstWeekRevenue}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-6 md:gap-8">
                          <span className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight w-[7rem] sm:w-[8.5rem] md:w-[10rem] shrink-0">
                            {resultVal3}%+
                          </span>
                          <span className="text-white/80 text-base font-light md:text-lg">
                            {msg.ui.results.sevenDayRetention}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 min-h-[90vh] sticky top-20 self-start max-w-[50vw]" aria-hidden />
                  </div>
                ) : section.id === "reflection" ? (
                  /* Reflection：与 The Pivot 同布局，左侧标题+段落，右侧单图 sticky */
                  <div className="flex flex-row items-start gap-8 md:gap-10">
                    <div className="min-w-0 flex-1 max-w-[50%] flex flex-col min-h-[90vh]">
                      <AnimatedTitle className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-4 sm:mb-8 md:mb-12 lg:mb-20">
                        {section.title}
                      </AnimatedTitle>
                      <AnimatedParagraphs
                        paragraphs={section.paragraphs}
                        containerClassName="mt-auto space-y-10 md:space-y-12"
                        paraClassName="text-white/80 text-base font-light md:text-lg leading-relaxed"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-4 md:gap-6 h-[90vh] sticky top-20 self-start max-w-[50vw]">
                      <div className="flex justify-end h-full">
                        <motion.img
                          src="https://pub-9285c469b2704f748f528c81e977b846.r2.dev/tc.JPG"
                          alt=""
                          className="h-full w-auto object-cover border border-white/0 block"
                          aria-hidden
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ amount: 0.5, once: false }}
                          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <AnimatedTitle className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-20 max-w-[60%]">
                      {section.title}
                    </AnimatedTitle>
                    <AnimatedParagraphs
                      paragraphs={section.paragraphs}
                      containerClassName="space-y-4 max-w-[60%]"
                      paraClassName="text-white/80 text-base font-light md:text-lg leading-relaxed"
                    />
                  </>
                )}
              </motion.section>
              );
              if (section.id === "results") {
                return [
                  sectionEl,
                  <div
                    key="cg-video-zone"
                    ref={longTermMemoryVideoZoneRef}
                    className="min-h-[100vh] w-full shrink-0"
                    aria-hidden
                  />,
                ];
              }
              return [sectionEl];
            })}
          </article>
        </section>

        {/* ========== 下一个 section：More Works；Tencent 项目页隐藏 ========== */}
        {!(slug && decodeURIComponent(slug).toLowerCase().includes("tencent")) && (
          <section ref={moreWorksSectionRef} id="case-study-more-works">
            <MoreWorks />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
