import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { aboutMessages } from "../i18n/aboutMessages";

function Line() {
  return <div className="h-px w-full bg-white/15" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      className="text-white/50 text-sm uppercase tracking-widest mb-10 px-5"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.p>
  );
}

export default function SectionResume() {
  const { lang } = useLanguage();
  const msg = aboutMessages[lang];

  return (
    <div className="bg-black">
      {/* ── About ──────────────────────────────────────────── */}
      <section id="about" className="px-5 pt-20 pb-10 border-t border-white/20">
        <div className="grid grid-cols-1 min-[1000px]:grid-cols-[1fr_1fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-white/50 text-sm uppercase tracking-widest mb-6">{msg.sections.about}</p>
            <h2 className="text-white font-semibold text-3xl md:text-4xl leading-tight mb-6">
              {msg.aboutBlock.titleLine1}<br />{msg.aboutBlock.titleLine2}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-4 min-[1000px]:pt-14"
          >
            <p className="text-white/65 text-base leading-relaxed">
              {msg.aboutBlock.p1}
            </p>
            <p className="text-white/65 text-base leading-relaxed">
              {msg.aboutBlock.p2}
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="mailto:shaolzr@gmail.com"
                className="text-white text-sm font-semibold inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              >
                {msg.aboutBlock.emailLink}
              </a>
              <a
                href="https://www.linkedin.com/in/shaolzr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm font-semibold inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              >
                {msg.aboutBlock.linkedinLink}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Work Experience ──────────────────────────────── */}
      <section id="experience" className="pt-16 pb-10">
        <SectionLabel>{msg.sections.workExperience}</SectionLabel>
        <div className="flex flex-col">
          {msg.experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="px-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Line />
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 py-10">
                <div className="flex flex-col gap-1">
                  <span className="text-white font-semibold text-sm">{exp.company}</span>
                  <span className="text-white/45 text-xs mt-1">{exp.period}</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-4">{exp.role}</p>
                  <ul className="flex flex-col gap-2.5">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="text-white/60 text-sm leading-relaxed flex items-start gap-3">
                        <span className="mt-[0.45em] shrink-0 w-1.5 h-1.5 rounded-full bg-white/25" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="px-5"><Line /></div>
        </div>
      </section>

      {/* ── Education ────────────────────────────────────── */}
      <section id="education" className="pt-16 pb-10">
        <SectionLabel>{msg.sections.education}</SectionLabel>
        <div className="flex flex-col">
          {msg.education.map((edu, i) => (
            <motion.div
              key={i}
              className="px-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Line />
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 py-8">
                <div className="flex flex-col gap-1">
                  <span className="text-white/45 text-xs">{edu.period}</span>
                  <span className="text-white/35 text-xs mt-1">{msg.labels.gpa} {edu.gpa}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{edu.school}</p>
                  <p className="text-white/50 text-sm">{edu.degree} · {edu.field}</p>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="px-5"><Line /></div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────── */}
      <section id="skills" className="pt-16 pb-20">
        <SectionLabel>{msg.sections.skills}</SectionLabel>
        <div className="flex flex-col">
          {msg.skills.map(({ category, items }, i) => (
            <motion.div
              key={category}
              className="px-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Line />
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 py-8">
                <span className="text-white/45 text-sm">{category}</span>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-white/75 text-xs font-medium border border-white/15 px-3 py-1.5 rounded-full hover:border-white/40 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="px-5"><Line /></div>
        </div>
      </section>
    </div>
  );
}
