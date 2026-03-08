import { motion } from "framer-motion";

// ─── 工作经历 ───────────────────────────────────────────────
const experiences = [
  {
    company: "Tencent",
    role: "AI Product Manager Intern",
    period: "Jun 2025 – Sep 2025",
    bullets: [
      "Led product strategy and AI system design for Miracle, QQ Speed's first AI companion agent.",
      "Conducted 320+ player surveys and 30+ in-depth interviews to uncover the emotional-companionship gap.",
      "Pivoted from skill enhancement to relationship-driven retention, outperforming the original brief.",
      "Designed a multi-layer risk-control framework (prompt guardrails, hallucination mitigation, stability).",
      "Delivered 7,000+ paying users, ¥1.75M first-week revenue, and 65%+ seven-day retention within 5 days.",
    ],
  },
  {
    company: "AI Company · Academic Agent",  // TODO: 填入公司名
    role: "AI Product Manager",
    period: "Jul 2023 – Jul 2024",
    bullets: [
      "Owned the full product lifecycle of an Academic Agent chatbot serving university students.",
      "Designed RAG-based knowledge retrieval pipelines to ground answers in verified academic sources.",
      "Integrated GPT API, DeepSeek (int4/fp8/fp16), and Qwen; A/B tested to balance quality and cost.",
      "Built badcase review workflows that reduced hallucination rate by ~95%.",
      "Grew DAU by 30%+ and achieved 50% satisfaction improvement through iterative releases.",
    ],
  },
  {
    company: "BigData & UX Platform",         // TODO: 填入公司名
    role: "Product Manager",
    period: "Mar 2022 – Sep 2024",
    bullets: [
      "Defined and executed roadmaps across big-data and UX analytics platforms.",
      "Collaborated with engineering and design to deliver AML-integrated data pipelines.",
      "Led user research and translated insights into feature requirements and prioritisation frameworks.",
    ],
  },
];

// ─── 教育背景 ───────────────────────────────────────────────
const education = [
  {
    school: "University · US News Rank #7",  // TODO: 填入学校名
    degree: "Master's Degree",
    field: "Information Systems / HCI",       // TODO: 填入专业
    period: "Sep 2024 – Apr 2026",
    gpa: "3.9 / 4.0",
  },
  {
    school: "University · QS Rank #96",       // TODO: 填入学校名
    degree: "Exchange / Postgraduate",
    field: "Engineering",                      // TODO: 填入专业
    period: "Sep 2020 – Nov 2021",
    gpa: "16.6 / 20.0",
  },
  {
    school: "Bachelor's University",           // TODO: 填入学校名
    degree: "Bachelor's Degree",
    field: "Engineering / Computer Science",   // TODO: 填入专业
    period: "Sep 2015 – Jul 2019",
    gpa: "3.7 / 4.0",
  },
];

// ─── 技能 ───────────────────────────────────────────────────
const skills: Record<string, string[]> = {
  "Product": ["Product Strategy", "System Design", "User Research", "Competitive Analysis", "Roadmapping", "Data Strategy", "Problem Definition", "Evaluation"],
  "AI & Engineering": ["Prompt Engineering", "RAG", "Model Selection", "Risk Control", "Python", "JavaScript", "SQL", "Vibe-coding"],
  "Design & Tools": ["Figma", "Sketch", "Axure", "Tableau", "Adobe Suite"],
};

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
            <p className="text-white/50 text-sm uppercase tracking-widest mb-6">About</p>
            <h2 className="text-white font-semibold text-3xl md:text-4xl leading-tight mb-6">
              AI Product Manager<br />& Robotics Engineer
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
              I bridge the gap between cutting-edge AI capability and real human needs —
              turning research insights into products that people genuinely feel.
            </p>
            <p className="text-white/65 text-base leading-relaxed">
              My work spans AI companion systems, academic agents, and data platforms,
              always anchored in rigorous user research and business impact.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="mailto:shaolinzr@163.com"
                className="text-white text-sm font-semibold inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              >
                Email ↗
              </a>
              <a
                href="https://www.linkedin.com/in/shaolzr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm font-semibold inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              >
                LinkedIn ↗
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Work Experience ──────────────────────────────── */}
      <section id="experience" className="pt-16 pb-10">
        <SectionLabel>Work Experience</SectionLabel>
        <div className="flex flex-col">
          {experiences.map((exp, i) => (
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
        <SectionLabel>Education</SectionLabel>
        <div className="flex flex-col">
          {education.map((edu, i) => (
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
                  <span className="text-white/35 text-xs mt-1">GPA {edu.gpa}</span>
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
        <SectionLabel>Skills</SectionLabel>
        <div className="flex flex-col">
          {Object.entries(skills).map(([category, items], i) => (
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
