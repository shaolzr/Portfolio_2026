import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SectionInfo from "../components/SectionInfo";
import MoreWorks from "../components/MoreWorks";
import Footer from "../components/Footer";
import MenuOverlay from "../components/MenuOverlay";
import DonutChart from "../components/DonutChart";
import { useLanguage } from "../i18n/LanguageContext";
import { caseStudyMessages } from "../i18n/caseStudyMessages";

const MOTION_VIDEO_URL = "https://res.cloudinary.com/dcsejrast/video/upload/v1771875506/move_uu55vq.mp4";
const FREE_CHAT_VIDEO_URL = "https://res.cloudinary.com/dcsejrast/video/upload/v1771882531/free_chat_dpnpfi.mp4";
const LONG_TERM_MEMORY_VIDEO_URL = "https://res.cloudinary.com/dcsejrast/video/upload/v1771888387/longterm_spmicb.mp4";
/** Long term memory 下方全屏滑道使用的 CG 视频 */
const MIRACLE_CG_VIDEO_URL = "https://res.cloudinary.com/dcsejrast/video/upload/v1771894374/Miracle_CG_g166g3.mp4";

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
  const ui = caseStudyMessages[lang].ui;
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
      className="relative border border-white/0 flex flex-col items-end justify-center w-full h-full max-h-[90vh] min-h-0"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 按视频真实宽高比包裹，使暂停/静音按钮始终在视频画面右下角内 */}
      <div
        className="relative w-full max-h-full min-h-0 shrink-0"
        style={{ aspectRatio: videoAspect != null ? String(videoAspect) : "16/9" }}
      >
        <motion.video
          ref={videoRef}
          src={src}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (v.videoWidth && v.videoHeight) setVideoAspect(v.videoWidth / v.videoHeight);
          }}
          className="absolute inset-0 w-full h-full object-contain object-top object-right block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5, once: false }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
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

type CaseStudyPageProps = { slug?: string };

const CASE_SECTION_IDS = [
  "overview",
  "research",
  "the-pivot",
  "system-design",
  "risk-safety",
  "results",
  "reflection",
] as const;

export default function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const { lang } = useLanguage();
  const msg = caseStudyMessages[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [tocHoverIndex, setTocHoverIndex] = useState<number | null>(null);
  const [activeTocIndex, setActiveTocIndex] = useState<number>(0);
  const [leftNavVisible, setLeftNavVisible] = useState(false);
  // const miraParagraphRef = useRef<HTMLParagraphElement | null>(null); // 与 case-study-intro 一起注释
  const tocSectionRef = useRef<HTMLElement | null>(null);
  const moreWorksSectionRef = useRef<HTMLElement | null>(null);
  const [tocSectionInZone, setTocSectionInZone] = useState(false);
  const [moreWorksInBottomFifth, setMoreWorksInBottomFifth] = useState(false);
  const [pastReflection, setPastReflection] = useState(false);
  const longTermMemoryVideoZoneRef = useRef<HTMLDivElement | null>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);
  const [videoOverlayActive, setVideoOverlayActive] = useState(false);
  const [fullscreenVideoPaused, setFullscreenVideoPaused] = useState(false);
  const [fullscreenVideoHover, setFullscreenVideoHover] = useState(false);
  /** 全页视频静音状态统一：System Design 三块 + 全屏 CG 共用一个，点静音/取消静音则全部同步 */
  const [allVideosMuted, setAllVideosMuted] = useState(true);
  const researchDataRef = useRef<HTMLDivElement | null>(null);
  const [animPercent1, setAnimPercent1] = useState(0);
  const [animPercent2, setAnimPercent2] = useState(0);
  const [animAmount1, setAnimAmount1] = useState(0);
  const [animAmount2, setAnimAmount2] = useState(0);
  const [animBar1, setAnimBar1] = useState(0);
  const [animBar2, setAnimBar2] = useState(0);
  const researchAnimDone = useRef(false);
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
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 目录显示：中间 section 在视口内 且 More Works 未进视口 且未滚过 Reflection 且未处于全屏视频滑道
  useEffect(() => {
    setLeftNavVisible(
      tocSectionInZone && !moreWorksInBottomFifth && !videoOverlayActive && !pastReflection
    );
  }, [tocSectionInZone, moreWorksInBottomFifth, videoOverlayActive, pastReflection]);

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

  // Research 右侧数据：仅当滚动到该区域进入视口时才触发百分比 0→73/27、金额 0→300/50 递增动画
  useEffect(() => {
    const el = researchDataRef.current;
    if (!el) return;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const DURATION = 5000;
    const runAnim = () => {
      if (researchAnimDone.current) return;
      researchAnimDone.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        const e = easeOutCubic(t);
        setAnimPercent1(Math.round(73 * e));
        setAnimPercent2(Math.round(27 * e));
        setAnimAmount1(Math.round(300 * e));
        setAnimAmount2(Math.round(50 * e));
        setAnimBar1(85 * e);
        setAnimBar2(35 * e);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const ob = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) runAnim();
      },
      { threshold: 0.2 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

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
        <Hero />
        <SectionInfo />
        <section className="w-full overflow-hidden pb-[20vh]" aria-hidden>
          <motion.img
            src="https://res.cloudinary.com/dcsejrast/image/upload/v1771563868/%E5%BA%8F%E5%88%97%E4%B8%AD%E4%B9%A6_y5eygh.png"
            alt=""
            className="w-full h-52 md:h-72 object-cover object-top block"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.8, once: false }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          />
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
          {/* 左侧占位：最小屏/小屏不占位，md 及以上才留出目录空间 */}
          <div className="hidden md:block shrink-0 w-40 min-[1350px]:w-52" aria-hidden />
          {/* 左侧目录：最小屏/小屏不显示，md 及以上才显示 */}
          <nav
            className={`hidden md:block fixed left-0 top-1/2 -translate-y-1/2 z-10 pl-5 pr-5 py-4 transition-opacity duration-300 ${leftNavVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
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
          <article className="flex-1 min-w-0 pl-[3.5%] pr-5 md:pl-[10%] min-[1350px]:pl-[12%]">
            {msg.sections.flatMap((section) => {
              const sectionEl = (
                <motion.section
                  key={section.id}
                  id={section.id}
                  className="case-study-section pt-12 pb-12 sm:pt-20 sm:pb-20 md:pt-32 md:pb-32"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.45 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                {section.id === "overview" ? (
                  /* Overview 模块：左侧文字可独立滚动，右侧图片 sticky 不动；滚到模块最底后整块划走进入 Research */
                  <div className="flex flex-row items-start gap-8 md:gap-10">
                    <div className="min-w-0 flex-1 max-w-[50%] flex flex-col min-h-[90vh]">
                      <h2 className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-4 sm:mb-8 md:mb-12 lg:mb-20">
                        {section.title}
                      </h2>
                      <div className="mt-auto text-white/80 text-base font-light md:text-lg leading-relaxed">
                        <div className="space-y-0">
                          {section.paragraphs.slice(0, 3).map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                        <p className="mt-8">{section.paragraphs[3]}</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 mt-4 list-none text-white/80 text-base font-light md:text-lg pl-0 [&_li]:flex [&_li]:items-center [&_li]:gap-3 [&_li]:before:content-[''] [&_li]:before:block [&_li]:before:w-3 [&_li]:before:h-3 [&_li]:before:rounded-full [&_li]:before:shrink-0 [&_li]:before:bg-white/60">
                          {msg.overviewSkills.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col items-end sticky top-20 self-start">
                      <motion.img
                        src="https://res.cloudinary.com/dcsejrast/image/upload/v1771656362/Overview_vkwaoq.png"
                        alt=""
                        className="w-[50vw] h-[90vh] object-cover object-top border border-white/10 mt-0 block"
                        aria-hidden
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.5, once: false }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    </div>
                  </div>
                ) : section.id === "research" ? (
                  /* Research 模块：与 Overview 同布局，标题 Research，内容为 Research 段落 */
                  <div className="flex flex-row items-start gap-8 md:gap-10">
                    <div className="min-w-0 flex-1 max-w-[50%] flex flex-col min-h-[90vh]">
                      <h2 className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-4 sm:mb-8 md:mb-12 lg:mb-20">
                        {section.title}
                      </h2>
                      <div className="mt-auto text-white/80 text-base font-light md:text-lg leading-relaxed">
                        <div className="space-y-0">
                          {section.paragraphs.map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                        <p className="mt-10 md:mt-12 text-white/80 text-base font-light md:text-lg">
                          {msg.ui.research.verifyHypothesis}
                        </p>
                        <div className="flex flex-col min-[1440px]:flex-row gap-6 min-[1440px]:gap-12 2xl:gap-16 mt-6 md:mt-8">
                          <div className="flex flex-col min-[1440px]:flex-row min-[1440px]:items-end gap-1 min-[1440px]:gap-4">
                            <span className="text-white text-4xl md:text-5xl font-regular tracking-tight">320</span>
                            <span className="text-white/80 text-base font-light md:text-lg">{msg.ui.research.playerSurveys}</span>
                          </div>
                          <div className="flex flex-col min-[1440px]:flex-row min-[1440px]:items-end gap-1 min-[1440px]:gap-4">
                            <span className="text-white text-4xl md:text-5xl font-regular tracking-tight">30+</span>
                            <span className="text-white/80 text-base font-light md:text-lg">{msg.ui.research.insightInterviews}</span>
                          </div>
                        </div>
                        <p className="mt-10 md:mt-12 text-white/80 text-base font-light md:text-lg leading-relaxed">
                          {msg.ui.research.weFound}
                        </p>
                      </div>
                    </div>
                    <div
                      ref={researchDataRef}
                      className="relative flex-1 min-w-0 flex flex-col items-end sticky top-20 self-start w-[50vw] max-w-[50vw] h-[90vh] overflow-visible border border-white/0 bg-black/0"
                    >
                      <motion.img
                        src="https://res.cloudinary.com/dcsejrast/image/upload/v1771900673/background_tg6e7u.svg"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                        aria-hidden
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ amount: 0.8, once: false }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                      <div className="relative z-10 w-full h-full flex flex-col p-3 sm:p-4 md:p-5 lg:p-6 min-h-0">
                        {/* 上下分布时：20% / 20% / 30% / 30%；xl 时最后两块左右并排 */}
                        {/* 模块一：20% - 性别分布 */}
                        <div className="flex-[0_0_20%] min-h-0 flex flex-col justify-center">
                          <div className="grid grid-cols-2 w-full">
                            <div className="flex items-center gap-1.5 sm:gap-2 justify-self-start">
                              <motion.img
                                src="https://res.cloudinary.com/dcsejrast/image/upload/v1771723064/male_nbafkt.svg"
                                alt=""
                                className="w-4 h-5 sm:w-5 sm:h-6 md:w-6 md:h-8 lg:w-7 lg:h-9 shrink-0"
                                aria-hidden
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ amount: 0.8, once: false }}
                                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                              />
                              <span className="text-white text-xl sm:text-2xl md:text-2xl lg:text-5xl font-light">{animPercent1}%</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 justify-self-start">
                              <motion.img
                                src="https://res.cloudinary.com/dcsejrast/image/upload/v1771723039/female_h37jzu.svg"
                                alt=""
                                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 shrink-0"
                                aria-hidden
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ amount: 0.8, once: false }}
                                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                              />
                              <span className="text-white text-xl sm:text-2xl md:text-2xl lg:text-5xl font-light">{animPercent2}%</span>
                            </div>
                          </div>
                        </div>
                        {/* 模块二：20% - 条状图，字在上条在下 */}
                        <div className="flex-[0_0_20%] min-h-0 flex flex-col justify-center self-start w-full -ml-1 sm:-ml-2 md:-ml-3">
                          <div className="flex flex-col gap-3 w-full">
                            <div className="flex flex-col gap-1">
                              <span className="text-white/80 text-xs sm:text-sm md:text-base text-left shrink-0 whitespace-nowrap">
                                {msg.ui.research.skillEnhancement}
                              </span>
                              <div className="flex w-full flex-row items-center gap-2">
                                <div className="flex-1 min-w-0 h-1.5 sm:h-2 md:h-2.5 rounded-full bg-white/0 overflow-hidden">
                                  <div className="h-full rounded-full bg-amber-300" style={{ width: `${animBar1}%` }} />
                                </div>
                                <span className="text-white/80 text-xs sm:text-sm md:text-base font-medium w-10 sm:w-12 text-right shrink-0">85%</span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-white/80 text-xs sm:text-sm md:text-base text-left shrink-0 whitespace-nowrap">
                                {msg.ui.research.companionship}
                              </span>
                              <div className="flex w-full flex-row items-center gap-2">
                                <div className="flex-1 min-w-0 h-1.5 sm:h-2 md:h-2.5 rounded-full bg-white/0 overflow-hidden">
                                  <div className="h-full rounded-full bg-amber-200" style={{ width: `${animBar2}%` }} />
                                </div>
                                <span className="text-white/80 text-xs sm:text-sm md:text-base font-medium w-10 sm:w-12 text-right shrink-0">35%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* 模块三+四：上下分布时各 30%（共 60%），xl 时左右并排 */}
                        <div className="flex-[0_0_60%] min-h-0 flex flex-col xl:flex-row xl:items-center gap-10 xl:gap-6">
                          {/* 模块三：30% - 两个花费块，上下分布时 icon/字适当缩小 */}
                          <div className="flex-[0_0_50%] xl:flex-[1_1_50%] min-h-0 flex flex-col justify-center gap-10 xl:gap-0">
                            <div className="flex flex-row items-center gap-2 sm:gap-3">
                              <motion.img
                                src="https://res.cloudinary.com/dcsejrast/image/upload/v1771723065/off_game_qruuwo.svg"
                                alt=""
                                className="w-8 h-8 sm:w-10 sm:h-10 xl:w-20 xl:h-20 shrink-0 mt-0.5"
                                aria-hidden
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ amount: 0.8, once: false }}
                                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                              />
                              <div className="flex flex-col gap-0.5 min-w-0">
                                <span className="text-white text-sm sm:text-base xl:text-3xl font-light">~¥{animAmount1}</span>
                                <p className="text-white/80 text-xs sm:text-sm xl:text-sm">{msg.ui.research.companionSpendPerMonth}</p>
                              </div>
                            </div>
                            <div className="flex flex-row items-center gap-2 sm:gap-3 xl:mt-20">
                              <motion.img
                                src="https://res.cloudinary.com/dcsejrast/image/upload/v1771723063/In_game_nu3a38.svg"
                                alt=""
                                className="w-8 h-8 sm:w-10 sm:h-10 xl:w-20 xl:h-20 shrink-0 mt-0.5"
                                aria-hidden
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ amount: 0.8, once: false }}
                                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                              />
                              <div className="flex flex-col gap-0.5 min-w-0">
                                <span className="text-white text-sm sm:text-base xl:text-3xl font-light">~¥{animAmount2}</span>
                                <p className="text-white/80 text-xs sm:text-sm xl:text-sm">{msg.ui.research.inGameSpendPerMonth}</p>
                              </div>
                            </div>
                          </div>
                          {/* 模块四：30% - 饼图 */}
                          <div className="flex-[0_0_50%] xl:flex-[1_1_50%] min-h-0 flex flex-col items-center justify-center">
                            <DonutChart />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : section.id === "the-pivot" ? (
                  /* The Pivot：左侧文字 + 右侧 7 张图左右交替排列 */
                  <div className="flex flex-row items-start gap-8 md:gap-10">
                    <div className="min-w-0 flex-1 max-w-[50%] flex flex-col min-h-[90vh]">
                      <h2 className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-4 sm:mb-8 md:mb-12 lg:mb-20">
                        {section.title}
                      </h2>
                      <div className="mt-auto text-white/80 text-base font-light md:text-lg leading-relaxed space-y-10 md:space-y-12">
                        {section.paragraphs.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-4 md:gap-6 min-h-[90vh] sticky top-20 self-start max-w-[50vw]">
                      {[
                        { src: "https://res.cloudinary.com/dcsejrast/image/upload/v1771795215/Group_30_thc8mu.svg", align: "left" },
                        { src: "https://res.cloudinary.com/dcsejrast/image/upload/v1771795216/Group_31_ekug6a.svg", align: "right" },
                        { src: "https://res.cloudinary.com/dcsejrast/image/upload/v1771795217/Group_32_smovbi.svg", align: "left" },
                        { src: "https://res.cloudinary.com/dcsejrast/image/upload/v1771795219/Group_33_sbynto.svg", align: "right" },
                        { src: "https://res.cloudinary.com/dcsejrast/image/upload/v1771795220/Group_34_q1pc2k.svg", align: "left" },
                        { src: "https://res.cloudinary.com/dcsejrast/image/upload/v1771795222/Group_35_j45psj.svg", align: "right" },
                        { src: "https://res.cloudinary.com/dcsejrast/image/upload/v1771795223/Group_36_nj71xe.svg", align: "left" },
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
                  /* System Design：标题+图一块 + 下面每块均为吸附模块 */
                  <div className="flex flex-col gap-20 md:gap-24 overflow-visible">
                    <div className="flex flex-col gap-6 md:gap-8">
                      <h2 className="text-white text-4xl md:text-5xl font-semibold tracking-tight">
                        {section.title}
                      </h2>
                      <motion.img
                        src="https://res.cloudinary.com/dcsejrast/image/upload/v1771820397/structure_kktejt.svg"
                        alt={msg.systemDesign.structureAlt}
                        className="w-full max-w-full h-auto block"
                        aria-hidden
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.5, once: false }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    </div>
                    {/* 每块：左侧无 max-height 随内容增高，右侧固定高度且 sticky；进入视口时滑显 */}
                    {[0, 2, 4].map((startIdx) => (
                      <motion.div
                        key={startIdx}
                        className={`flex flex-row items-start gap-8 md:gap-10 overflow-visible ${
                          startIdx === 0 ? "" : "mt-16 md:mt-24"
                        }`}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.45 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
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
                        <div className="flex-1 min-w-0 flex flex-col items-end self-start h-[80vh] max-h-[80vh] sticky top-20">
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
                      <h2 className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-4 sm:mb-8 md:mb-12 lg:mb-20">
                        {section.title}
                      </h2>
                      <div className="mt-auto text-white/80 text-base font-light md:text-lg leading-relaxed space-y-10 md:space-y-12">
                        {section.paragraphs.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
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
                      <h2 className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-4 sm:mb-8 md:mb-12 lg:mb-20">
                        {section.title}
                      </h2>
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
                      <h2 className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-4 sm:mb-8 md:mb-12 lg:mb-20">
                        {section.title}
                      </h2>
                      <div className="mt-auto text-white/80 text-base font-light md:text-lg leading-relaxed space-y-10 md:space-y-12">
                        {section.paragraphs.map((para, i) => {
                          const isLast = i === section.paragraphs.length - 1;
                          return (
                            <p
                              key={i}
                              className={
                                isLast
                                  ? "border-l-2 border-white/30 pl-4 text-white/80 italic"
                                  : undefined
                              }
                            >
                              {para}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-4 md:gap-6 h-[90vh] sticky top-20 self-start max-w-[50vw]">
                      <div className="flex justify-end h-full">
                        <motion.img
                          src="https://res.cloudinary.com/dcsejrast/image/upload/v1771914267/sunset_pkcrmh.svg"
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
                    <h2 className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-20 max-w-[60%]">
                      {section.title}
                    </h2>
                    <div className="text-white/80 text-base font-light md:text-lg leading-relaxed space-y-4 max-w-[60%]">
                      {section.paragraphs.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
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
