import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// 与主页 HomeHero 的 SHAO Linzhengrong 一致：逐字 y:8→0，相同节奏
const EASE = [0.25, 0.1, 0.25, 1] as const;
const LETTER_DURATION = 0.55;
const LETTER_STAGGER = 0.06;
const LETTER_DELAY_CHILDREN = 0.06;

const numberContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: LETTER_STAGGER, delayChildren: LETTER_DELAY_CHILDREN },
  },
};
const numberChar = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

// 右边标题：整块从下到上，等左边 01 逐字出完后再出现
const titleBlock = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const numberText = "02";

export default function DoguHero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section className="pt-[200px] md:pt-[200px]">
      <div className="w-full bg-black flex flex-col md:flex-row md:items-center md:justify-between gap-4 pl-5 pr-5 md:pr-10 pt-6 md:pt-8 pb-4 min-h-[5.5rem] md:min-h-[6.5rem]">
        <motion.div
          className="text-white font-semibold text-4xl md:text-6xl lg:text-6xl tracking-tight flex"
          variants={numberContainer}
          initial="hidden"
          animate="visible"
        >
          {numberText.split("").map((char, i) => (
            <motion.span
              key={i}
              style={{ display: "inline-block" }}
              variants={numberChar}
              transition={{ duration: LETTER_DURATION, ease: EASE }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        <motion.h1
          className="text-white font-semibold text-4xl md:text-6xl lg:text-7xl tracking-tight text-left md:text-right"
          variants={titleBlock}
          initial="hidden"
          animate="visible"
        >
          DOGU
        </motion.h1>
      </div>
      <div ref={imgRef} className="w-full aspect-[4/3] md:aspect-[2/1] lg:min-h-[80vh] relative overflow-hidden">
        <motion.video
          src="https://pub-9285c469b2704f748f528c81e977b846.r2.dev/Hero_iroi.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[125%] object-cover object-center"
          aria-label="DOGU"
        />
      </div>
    </section>
  );
}
