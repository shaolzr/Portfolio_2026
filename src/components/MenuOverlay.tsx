import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const links = [
  { label: "Works", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Careers", to: "/#careers" },
  { label: "Contact", to: "/#contact" },
];

const OVERLAY_BREAKPOINT = 1350;

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${OVERLAY_BREAKPOINT - 1}px)`);
    const update = () => setIsNarrow(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // 只有小屏（Menu 在右侧、Portfolio 消失）时点击 Menu 才出现遮罩；大屏点击 Menu 只展开 header 内联链接，无遮罩
  const showOverlay = isOpen && isNarrow;

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col"
        >
          {/* 顶部：左上 SHAO，右上 Close（加 mt-5，与外层 Header 的 py-5 视觉高度对齐） */}
          <header className="relative h-10 px-5 md:px-8 flex items-center justify-between shrink-0">
            <button
              onClick={onClose}
              className="absolute right-5 top-3 text-white text-xs md:text-sm font-semibold leading-none transition-opacity"
              aria-label="Close menu"
            >
              Close
            </button>
          </header>
          {/* 左侧大号垂直链接：从下到上依次出现 */}
          <nav className="flex-1 flex flex-col justify-center pl-5 md:pl-8 pr-5 overflow-hidden">
            <motion.ul
              className="flex flex-col gap-6 md:gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                },
              }}
            >
              {links.map((link) => (
                <motion.li
                  key={link.label}
                  variants={{
                    hidden: { y: 28, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className="text-white font-semibold text-2xl md:text-3xl lg:text-4xl hover:opacity-80 transition-opacity block"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
