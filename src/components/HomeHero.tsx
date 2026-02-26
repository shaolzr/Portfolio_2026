import { motion } from "framer-motion";

// 与 Framer Monica Ellis 一致：按词分组，词内每字独立 span；统一放慢、节奏一致
const EASE = [0.25, 0.1, 0.25, 1] as const;
const LETTER_DURATION = 0.55;
const LETTER_STAGGER = 0.06;
const LETTER_DELAY_CHILDREN = 0.06;

const letterContainer = {
  visible: {
    transition: { staggerChildren: LETTER_STAGGER, delayChildren: LETTER_DELAY_CHILDREN },
  },
};
const letter = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const TITLE = "SHAO Linzhengrong";
const TITLE_WORDS = TITLE.split(" ");

export default function HomeHero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-end px-5 pb-6 bg-black">
      <div className="relative w-full grid grid-cols-1 sm:grid-cols-[1fr_auto] min-[1350px]:grid-cols-[minmax(0,780px)_1fr] items-start sm:items-end min-[1350px]:items-end gap-2">
        <motion.h1
          className="text-white font-bold text-4xl sm:text-5xl min-[1350px]:text-7xl"
          aria-label={TITLE}
          initial="hidden"
          animate="visible"
          variants={letterContainer}
        >
          {TITLE_WORDS.map((word, wi) => (
            <span key={wi} style={{ whiteSpace: "nowrap" }}>
              {word.split("").map((char, ci) => (
                <motion.span
                  key={ci}
                  style={{ display: "inline-block", willChange: "transform" }}
                  variants={letter}
                  transition={{ duration: LETTER_DURATION, ease: EASE }}
                >
                  {char}
                </motion.span>
              ))}
              {wi < TITLE_WORDS.length - 1 ? "\u00A0" : null}
            </span>
          ))}
        </motion.h1>
        <motion.div
          className="flex flex-col items-start text-left sm:items-end sm:text-right min-[1350px]:flex-row min-[1350px]:justify-between min-[1350px]:items-end min-[1350px]:text-left pl-5 pr-0 min-[1350px]:pr-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: LETTER_DURATION, delay: 0.5, ease: EASE }}
        >
          <p className="text-white text-sm min-[1350px]:text-sm leading-[1.6] font-semibold opacity-80">
            AI Product Manager & Robotics Engineer
          </p>
          <motion.p
            className="hidden min-[1350px]:block text-white text-xs min-[1350px]:text-sm font-semibold tracking-wide shrink-0"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Scroll to explore
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
