import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SectionInfo from "../components/SectionInfo";
import SectionContent from "../components/SectionContent";
import MoreWorks from "../components/MoreWorks";
import Footer from "../components/Footer";
import MenuOverlay from "../components/MenuOverlay";

type CaseStudyPageProps = { slug?: string };

export default function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // 进入详情页时滚动到顶部，避免沿用首页的滚动位置
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) setScrollPercent(100);
      else setScrollPercent(Math.round((window.scrollY / docHeight) * 100));
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Header
        scrollPercent={scrollPercent}
        onMenuClick={() => setMenuOpen(true)}
        isMenuOpen={menuOpen}
        onMenuClose={() => setMenuOpen(false)}
      />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <SectionInfo />
        <SectionContent />
        <MoreWorks />
      </main>
      <Footer />
    </>
  );
}
