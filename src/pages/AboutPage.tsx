import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuOverlay from "../components/MenuOverlay";
import { useLanguage } from "../i18n/LanguageContext";
import { aboutMessages } from "../i18n/aboutMessages";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function Line() {
  return <div className="h-px w-full bg-white/15" />;
}

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useLanguage();
  const msg = aboutMessages[lang];

  useEffect(() => {
    document.title = lang === "zh" ? "关于 | 邵林正荣" : "About | SHAO Linzhengrong";
    window.scrollTo(0, 0);
  }, [lang]);

  return (
    <>
      <Header
        onMenuClick={() => setMenuOpen(true)}
        isMenuOpen={menuOpen}
        onMenuClose={() => setMenuOpen(false)}
      />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="bg-black min-h-screen">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="px-5 pt-40 pb-16 md:pb-24">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 min-[1000px]:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <motion.p
                className="text-white/50 text-sm uppercase tracking-widest mb-4"
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                {msg.aboutPageHero.label}
              </motion.p>
              <motion.h1
                className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-8"
                custom={0.1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                SHAO<br />Linzhengrong
              </motion.h1>
              <motion.p
                className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl"
                custom={0.2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                {msg.aboutPageHero.intro}
              </motion.p>
            </div>

            {/* 联系方式 */}
            <motion.div
              className="flex flex-col gap-3 min-[1000px]:text-right"
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <a
                href="mailto:shaolinzr@163.com"
                className="text-white/60 text-sm font-medium hover:text-white transition-colors"
              >
                shaolinzr@163.com
              </a>
              <a
                href="https://www.linkedin.com/in/shaolzr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 text-sm font-medium hover:text-white transition-colors"
              >
                LinkedIn ↗
              </a>
              <span className="text-white/40 text-sm">+86 133 1384 7307</span>
            </motion.div>
          </div>
        </section>

        {/* ── Work Experience ──────────────────────────────── */}
        <section id="experience" className="px-5 py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto">
            <motion.p
              className="text-white/50 text-sm uppercase tracking-widest mb-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {msg.sections.workExperience}
            </motion.p>

            <div className="flex flex-col gap-0">
              {msg.experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Line />
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 py-10">
                    {/* 左列：公司 + 时间 */}
                    <div className="flex flex-col gap-1">
                      <span className="text-white font-semibold text-base">{exp.company}</span>
                      <span className="text-white/50 text-sm">{exp.period}</span>
                      <span className="text-white/40 text-xs mt-1">{exp.location}</span>
                    </div>
                    {/* 右列：职位 + 描述 */}
                    <div>
                      <p className="text-white font-medium text-base mb-4">{exp.role}</p>
                      <ul className="flex flex-col gap-2.5">
                        {exp.bullets.map((bullet, j) => (
                          <li
                            key={j}
                            className="text-white/65 text-sm leading-relaxed flex items-start gap-3"
                          >
                            <span className="mt-[0.45em] shrink-0 w-1.5 h-1.5 rounded-full bg-white/30" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
              <Line />
            </div>
          </div>
        </section>

        {/* ── Education ────────────────────────────────────── */}
        <section id="education" className="px-5 py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto">
            <motion.p
              className="text-white/50 text-sm uppercase tracking-widest mb-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {msg.sections.education}
            </motion.p>

            <div className="flex flex-col gap-0">
              {msg.education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Line />
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 py-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-white/50 text-sm">{edu.period}</span>
                      <span className="text-white/40 text-xs mt-1">{msg.labels.gpa} {edu.gpa}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-base mb-1">{edu.school}</p>
                      <p className="text-white/60 text-sm">{edu.degree} · {edu.field}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <Line />
            </div>
          </div>
        </section>

        {/* ── Skills ───────────────────────────────────────── */}
        <section id="skills" className="px-5 py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto">
            <motion.p
              className="text-white/50 text-sm uppercase tracking-widest mb-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {msg.sections.skills}
            </motion.p>

            <div className="flex flex-col gap-0">
              {msg.skills.map(({ category, items }, i) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Line />
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 py-8">
                    <span className="text-white/50 text-sm">{category}</span>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="text-white/80 text-sm font-medium border border-white/15 px-3 py-1.5 rounded-full hover:border-white/40 hover:text-white transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
              <Line />
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="px-5 py-24 md:py-32">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-white font-semibold text-3xl md:text-5xl leading-tight max-w-2xl">
                Let's build something meaningful together.
              </h2>
              <a
                href="mailto:shaolinzr@163.com"
                className="inline-flex items-center gap-2 text-white text-sm uppercase tracking-wider hover:opacity-70 transition-opacity w-fit"
              >
                Get in touch
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
