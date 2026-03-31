import type { Lang } from "../../i18n/LanguageContext";

export const doguSectionInfoMessages: Record<
  Lang,
  {
    labels: { client: string; type: string; year: string; about: string };
    values: { client: string; type: string; year: string; about: string };
  }
> = {
  en: {
    labels: { client: "Client", type: "Type", year: "Year", about: "About" },
    values: {
      client: "DOGU",
      type: "Robotics, AI Agent, AI Product",
      year: "2025-2026",
      about:
        "Iroi is a multimodal robot assistant designed to support hands-on lab learning through real-time, contextual guidance. Instead of providing direct answers, it enables step-by-step learning using speech and image understanding grounded in course materials. By combining robotics and AI, Iroi helps students stay engaged and reduces reliance on shortcut-based learning.",
    },
  },
  zh: {
    labels: { client: "用户", type: "类型", year: "年份", about: "关于" },
    values: {
      client: "《QQ飞车》玩家",
      type: "游戏、AI Agent、AI 产品",
      year: "2025",
      about:
        "米拉是为《QQ飞车》打造的 AI 陪伴系统。它通过基于记忆的互动，让关系随时间与玩家共同成长。系统会结合游戏内表现给出反馈、强化情感回应，并学习用户的长期偏好。它不再只围绕交易式玩法，而是建立持续关系，把“关系驱动的留存”转化为新的增长引擎。",
    },
  },
};
