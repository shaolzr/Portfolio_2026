import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { homeMessages } from "../i18n/homeMessages";

interface HeaderProps {
  scrollPercent?: number;
  onMenuClick: () => void;
  isMenuOpen?: boolean;
  onMenuClose?: () => void;
}

export default function Header({
  scrollPercent,
  onMenuClick,
  isMenuOpen = false,
  onMenuClose,
}: HeaderProps) {
  const isDetailPage = typeof scrollPercent === "number";
  const { lang } = useLanguage();
  const msg = homeMessages[lang];
  const prefix = lang === "zh" ? "/zh" : "";
  const menuLinks = [
    { label: msg.menu.works, to: `${prefix}/works` },
    { label: msg.menu.about, to: `${prefix}/about` },
    { label: msg.menu.contact, to: "mailto:shaolzr@gmail.com" },
  ];

  return (
    <nav
      className="fixed top-2 left-0 right-0 z-50 w-full py-5"
      data-framer-name={isMenuOpen ? "Freelance - Open" : "Freelance Closed"}
    >
      <div className="absolute left-5 top-1 h-10 inline-flex items-baseline">
        <a href={prefix + "/"} className="inline-block">
          <span className="text-white text-xs md:text-sm font-semibold opacity-90 leading-none">
            SHAO Linzhengrong
          </span>
        </a>
      </div>
      {/* 大屏：中间 Menu + 内联链接 */}
      <div className="absolute top-1 h-10 left-[800px] hidden min-[1350px]:flex flex-row items-baseline gap-px px-5">
        <div className="shrink-0 w-[3.25rem] text-left leading-none">
          {isMenuOpen ? (
            <button
              type="button"
              onClick={onMenuClose}
              className="text-white text-xs md:text-sm font-semibold leading-none transition-colors whitespace-nowrap py-0 pl-2 pr-1"
              aria-label="Close menu"
            >
              {msg.menu.close}
            </button>
          ) : (
            <button
              type="button"
              onClick={onMenuClick}
              className="text-white text-xs md:text-sm font-semibold leading-none transition-opacity whitespace-nowrap py-0 pl-2 pr-1"
              aria-label="Open menu"
              data-framer-name="Menu/Close"
            >
              {msg.menu.menu}
            </button>
          )}
        </div>
        <div className="min-w-[260px] min-h-[2.5rem] flex items-baseline shrink-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="menu-links"
                className="flex flex-row items-baseline gap-px shrink-0"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.015, delayChildren: 0 },
                  },
                  closed: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0,
                      staggerDirection: -1,
                    },
                  },
                }}
              >
                {menuLinks.map((link) => (
                  <motion.div
                    key={link.label}
                    variants={{
                      open: { opacity: 1 },
                      closed: { opacity: 0 },
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Link
                      to={link.to}
                      onClick={onMenuClose}
                      className="text-gray-400 text-xs md:text-sm font-semibold leading-none hover:text-white transition-colors shrink-0 whitespace-nowrap py-0 px-1 block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div
                key="menu-placeholders"
                className="flex flex-row items-baseline gap-px shrink-0 font-semibold text-xs md:text-sm"
              >
                {menuLinks.map((link) => (
                  <span
                    key={`placeholder-${link.label}`}
                    className="shrink-0 whitespace-nowrap py-0 px-1 invisible"
                    aria-hidden
                  >
                    {link.label}
                  </span>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* 右侧：Portfolio 2026 与 Menu/Close，同样的 top 值和字号，保证与左侧 SHAO 在同一高度 */}
      <div
        className="absolute right-5 top-1 flex items-center justify-end text-white text-xs md:text-sm font-semibold"
     
      >
        <span className="hidden min-[1350px]:inline leading-none">
          {isDetailPage ? `${scrollPercent}%` : msg.header.portfolioTitle}
        </span>
        <span className="min-[1350px]:hidden inline leading-none">
          {isMenuOpen ? (
            <button
              type="button"
              onClick={onMenuClose}
              className="text-white text-xs md:text-sm font-semibold leading-none transition-opacity p-0 m-0 border-0 bg-transparent cursor-pointer"
              aria-label="Close menu"
            >
              {msg.menu.close}
            </button>
          ) : (
            <button
              type="button"
              onClick={onMenuClick}
              className="text-white text-xs md:text-sm font-semibold leading-none transition-opacity p-0 m-0 border-0 bg-transparent cursor-pointer"
              aria-label="Open menu"
            >
              {msg.menu.menu}
            </button>
          )}
        </span>
      </div>
    </nav>
  );
}
