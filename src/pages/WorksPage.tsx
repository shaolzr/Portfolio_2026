import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuOverlay from "../components/MenuOverlay";

const projects = [
  {
    index: "01",
    title: "Tencent",
    category: "Robotics & AI",
    year: "2025",
    href: "/case-studies/Tencent%20-%20QQ%20Spend",
    image: "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Tencent_Hero.png",
  },
  {
    index: "02",
    title: "DOGU",
    category: "Game & AI Product",
    year: "2025-2026",
    href: "/case-studies/DOGU%20-%20IROI",
    image: "https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Dogu_future.jpg",
  },
];

type ColCount = 2 | 3 | 4;

const gridCols: Record<ColCount, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

function GridIcon({ cols }: { cols: ColCount }) {
  const count = cols;
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {Array.from({ length: count }).map((_, i) => {
        const w = 16 / count;
        const gap = count > 2 ? 1 : 1.5;
        const total = w * count + gap * (count - 1);
        const offsetX = (16 - total) / 2 + 1;
        return (
          <rect
            key={i}
            x={offsetX + i * (w + gap)}
            y="1"
            width={w}
            height="16"
            rx="0.5"
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
}

export default function WorksPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cols, setCols] = useState<ColCount>(2);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Works — SHAO Linzhengrong";
  }, []);

  return (
    <>
      <Header
        onMenuClick={() => setMenuOpen(true)}
        isMenuOpen={menuOpen}
        onMenuClose={() => setMenuOpen(false)}
      />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="min-h-screen bg-black px-5 md:px-10 pt-32 md:pt-40 pb-20">
        {/* Header row */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-white text-4xl md:text-6xl font-semibold tracking-tight leading-none">
            Works
          </h1>
        </div>


        {/* Project grid */}
        <motion.ul
          layout
          className={`grid gap-5 md:gap-6 ${gridCols[cols]}`}
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, i) => (
              <motion.li
                key={project.index}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.05 }}
              >
                <Link
                  to={project.href}
                  className="block group relative overflow-hidden"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-white/5">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredIndex === i ? 1.04 : 1,
                      }}
                      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                    {/* Dim overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-black pointer-events-none"
                      animate={{ opacity: hoveredIndex === i ? 0.25 : 0 }}
                      transition={{ duration: 0.35 }}
                    />
                  </div>

                  {/* Card footer */}
                  <div className="flex items-baseline justify-between pt-3 pb-1">
                    <span className="text-white text-sm md:text-base font-semibold leading-snug tracking-tight">
                      {project.title}
                    </span>
                    <span className="text-white/40 text-xs font-light leading-snug shrink-0 ml-4">
                      {project.category}
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* View toggle — centered below grid */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <span className="text-white/30 text-xs font-light select-none">View</span>
          {([2, 3, 4] as ColCount[]).map((c) => (
            <button
              key={c}
              onClick={() => setCols(c)}
              className={`flex items-center justify-center transition-colors ${
                cols === c ? "text-white" : "text-white/25 hover:text-white/60"
              }`}
              aria-label={`${c} columns`}
            >
              <GridIcon cols={c} />
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
