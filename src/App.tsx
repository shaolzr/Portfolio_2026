import { BrowserRouter, useLocation, matchPath, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import CaseStudyPage from "./pages/CaseStudyPage";

// 从 Framer 源码提取的全局页面切换参数
const pageTransition = {
  type: "tween" as const,
  duration: 1.5,
  delay: 0.1,
  ease: [0.76, 0, 0.24, 1] as const,
};

function AnimatedRoutes() {
  const location = useLocation();
  const caseMatch = matchPath({ path: "/case-studies/:slug", end: true }, location.pathname);
  const slug = caseMatch?.params?.slug;
  const key = location.pathname === "/" ? "home" : location.pathname;

  const page =
    location.pathname === "/" ? (
      <HomePage />
    ) : caseMatch ? (
      <CaseStudyPage slug={slug} />
    ) : null;

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
      <Routes>
        <Route path="*" element={<AnimatedRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
