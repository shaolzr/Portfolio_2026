import { BrowserRouter, useLocation, matchPath, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import CaseStudyPage from "./pages/CaseStudyPage";
import DoguComingSoonPage from "./pages/DoguComingSoonPage";
import AboutPage from "./pages/AboutPage";
import { LanguageProvider } from "./i18n/LanguageContext";
import { useLenis } from "./lib/useLenis";

// 从 Framer 源码提取的全局页面切换参数
const pageTransition = {
  type: "tween" as const,
  duration: 1.5,
  delay: 0.1,
  ease: [0.76, 0, 0.24, 1] as const,
};

function AnimatedRoutes() {
  useLenis();
  const location = useLocation();
  const { pathname } = location;

  // Strip /zh prefix to get the base path for route matching
  const isZh = pathname === "/zh" || pathname.startsWith("/zh/");
  const basePath = isZh ? (pathname.slice(3) || "/") : pathname;

  const caseMatch = matchPath({ path: "/case-studies/:slug", end: true }, basePath);
  const slug = caseMatch?.params?.slug;
  const decodedSlug = slug ? decodeURIComponent(slug) : "";
  const isDoguCase = decodedSlug.toLowerCase() === "dogu - iroi";
  const key = pathname;

  const page =
    basePath === "/" || basePath === ""
      ? <HomePage />
      : basePath === "/about"
      ? <AboutPage />
      : caseMatch
      ? (isDoguCase ? <DoguComingSoonPage /> : <CaseStudyPage slug={slug} />)
      : null;

  return (
    <AnimatePresence mode="wait">
      {page && (
        <motion.div
          key={key}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 1 }}
          transition={pageTransition}
          style={{ minHeight: "100vh" }}
        >
          {page}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="*" element={<AnimatedRoutes />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
