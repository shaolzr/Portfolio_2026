import type { Lang } from "./LanguageContext";

export const homeMessages: Record<
  Lang,
  {
    meta: { siteTitle: string };
    hero: { title: string; subtitle: string; scrollToExplore: string };
    menu: { works: string; about: string; contact: string; menu: string; close: string };
    footer: { sitemap: string; social: string; works: string; about: string; contact: string; madeBy: string };
    header: { portfolioTitle: string };
  }
> = {
  en: {
    meta: { siteTitle: "SHAO Linzhengrong" },
    hero: {
      title: "SHAO Linzhengrong",
      subtitle: "AI Product Manager & Robotics Engineer",
      scrollToExplore: "Scroll to explore",
    },
    menu: { works: "Works", about: "About", contact: "Contact", menu: "Menu", close: "Close" },
    footer: {
      sitemap: "Sitemap",
      social: "Social",
      works: "Works",
      about: "About",
      contact: "Contact",
      madeBy: "Made by SHAO Linzhengrong",
    },
    header: { portfolioTitle: "Portfolio 2026" },
  },
  zh: {
    meta: { siteTitle: "邵林峥嵘" },
    hero: {
      title: "SHAO Linzhengrong",
      subtitle: "AI 产品经理 & 机器人工程师",
      scrollToExplore: "向下滚动探索",
    },
    menu: { works: "作品", about: "关于", contact: "联系", menu: "菜单", close: "关闭" },
    footer: {
      sitemap: "站点地图",
      social: "社交",
      works: "作品",
      about: "关于",
      contact: "联系",
      madeBy: "Made by SHAO Linzhengrong",
    },
    header: { portfolioTitle: "作品集 2026" },
  },
};
