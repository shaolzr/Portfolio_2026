import type { Lang } from "./LanguageContext";

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

export type EducationEntry = {
  school: string;
  degree: string;
  field: string;
  period: string;
  gpa: string;
};

export type SkillsEntry = { category: string; items: string[] };

export const aboutMessages: Record<
  Lang,
  {
    sections: { about: string; workExperience: string; education: string; skills: string };
    labels: { gpa: string };
    aboutBlock: {
      titleLine1: string;
      titleLine2: string;
      p1: string;
      p2: string;
      emailLink: string;
      linkedinLink: string;
    };
    aboutPageHero: { label: string; intro: string };
    experiences: ExperienceEntry[];
    education: EducationEntry[];
    skills: SkillsEntry[];
  }
> = {
  en: {
    sections: {
      about: "About",
      workExperience: "Work Experience",
      education: "Education",
      skills: "Skills",
    },
    labels: { gpa: "GPA" },
    aboutBlock: {
      titleLine1: "AI Product Manager",
      titleLine2: "& Robotics Engineer",
      p1: "I bridge the gap between cutting-edge AI capability and real human needs — turning research insights into products that people genuinely feel.",
      p2: "My work spans AI companion systems, academic agents, and data platforms, always anchored in rigorous user research and business impact.",
      emailLink: "Email ↗",
      linkedinLink: "LinkedIn ↗",
    },
    aboutPageHero: {
      label: "About",
      intro:
        "AI Product Manager & Robotics Engineer with a track record of building emotionally intelligent products at scale. I bridge the gap between cutting-edge AI capability and real human needs — turning research insights into products that people genuinely feel.",
    },
    experiences: [
      {
        company: "Tencent",
        role: "AI Product Manager Intern",
        period: "Jun 2025 – Sep 2025",
        location: "Shenzhen, China",
        bullets: [
          "Led end-to-end product strategy and AI system design for Miracle, QQ Speed's first AI companion agent.",
          "Delivered 7,000+ paying users, ¥1.75M first-week revenue, and 65%+ seven-day retention within 5 days of launch.",
        ],
      },
      {
        company: "AI Company · Academic Agent Project",
        role: "AI Product Manager",
        period: "Jul 2023 – Jul 2024",
        location: "China",
        bullets: [
          "Owned the product lifecycle of an Academic Agent chatbot serving university students.",
          "Grew DAU by 30%+ and achieved 50% user satisfaction improvement through iterative product releases.",
        ],
      },
      {
        company: "BigData & UX Platform",
        role: "Product Manager",
        period: "Mar 2022 – Sep 2024",
        location: "China",
        bullets: [
          "Defined and executed product roadmaps across big-data and UX analytics platforms.",
          "Led user research and translated insights into feature requirements and prioritisation frameworks.",
        ],
      },
    ],
    education: [
      { school: "University of Washington · US News Rank #7", degree: "Engineering", field: "Robotics", period: "Sep 2024 – Apr 2026", gpa: "3.9 / 4.0" },
      { school: "University of St Andrews · QS Rank #96", degree: "Computer Science", field: "Human Computer Interaction", period: "Sep 2020 – Nov 2021", gpa: "16.6 / 20.0" },
      { school: "Soochow University", degree: "Science", field: "Psychology", period: "Sep 2015 – Jul 2019", gpa: "3.7 / 4.0" },
    ],
    skills: [
      { category: "Product", items: ["Product Strategy", "System Design", "User Research", "Competitive Analysis", "Roadmapping", "Data Strategy", "Problem Definition", "Evaluation"] },
      { category: "AI & Engineering", items: ["Prompt Engineering", "RAG", "Model Selection", "Risk Control", "Python", "JavaScript", "SQL", "Vibe-coding"] },
      { category: "Design & Tools", items: ["Figma", "Sketch", "Axure", "Tableau", "Adobe Suite"] },
    ],
  },
  zh: {
    sections: {
      about: "关于",
      workExperience: "工作经历",
      education: "教育背景",
      skills: "技能",
    },
    labels: { gpa: "平均绩点" },
    aboutBlock: {
      titleLine1: "AI 产品经理",
      titleLine2: "& 机器人工程师",
      p1: "将前沿 AI 能力与真实用户需求结合，将研究洞察转化为人们真正有需要的产品",
      p2: "工作涵盖 AI 陪伴系统、学术智能体与数据平台",
      emailLink: "邮箱 ↗",
      linkedinLink: "LinkedIn ↗",
    },
    aboutPageHero: {
      label: "关于",
      intro:
        "AI 产品经理与机器人工程师，擅长将情感智能产品规模化落地。我连接前沿 AI 能力与真实用户需求，将研究洞察转化为人们真正有感知的产品。",
    },
    experiences: [
      {
        company: "腾讯",
        role: "AI 产品经理实习生",
        period: "2025年6月 – 2025年9月",
        location: "中国深圳",
        bullets: [
          "主导米拉（QQ 飞车首个 AI 陪伴智能体）的端到端产品策略与 AI 系统设计。",
          "上线 5 天内达成 7,000+ 付费用户、首周收入 ¥175 万、七日留存 65%+。",
        ],
      },
      {
        company: "AI 项目 · 学术智能体项目",
        role: "AI 产品经理",
        period: "2023年7月 – 2024年7月",
        location: "中国",
        bullets: [
          "负责面向大学生的学术智能体聊天机器人全生命周期。",
          "通过迭代发布实现 DAU 提升 30%+、用户满意度提升 50%。",
        ],
      },
      {
        company: "中国建设银行-建信金科",
        role: "产品经理 & UX用研",
        period: "2022年3月 – 2024年9月",
        location: "中国",
        bullets: [
          "定义并推进大数据与 UX 分析平台的产品路线图。",
          "主导用户研究，将洞察转化为功能需求与优先级框架。",
        ],
      },
    ],
    education: [
      { school: "美国华盛顿大学 · US News 排名 #7", degree: "硕士", field: "机器人", period: "2024年9月 – 2026年4月", gpa: "3.9 / 4.0" },
      { school: "英国圣安德鲁斯大学 · QS 排名 #96", degree: "硕士", field: "人机交互", period: "2020年9月 – 2021年11月", gpa: "16.6 / 20.0" },
      { school: "台湾东吴大学", degree: "本科", field: "心理学", period: "2015年9月 – 2019年7月", gpa: "3.7 / 4.0" },
    ],
    skills: [
      { category: "产品", items: ["产品策略", "系统设计", "用户研究", "竞品分析", "路线图", "数据策略", "问题定义", "评估"] },
      { category: "AI 与工程", items: ["提示词工程", "RAG", "模型选型", "风险控制", "Python", "JavaScript", "SQL", "Vibe-coding"] },
      { category: "设计与工具", items: ["Figma", "Sketch", "Axure", "Tableau", "Adobe Suite"] },
    ],
  },
};
