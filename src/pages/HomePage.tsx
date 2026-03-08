import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import HomeHero from "../components/HomeHero";
import FeaturedProjects from "../components/FeaturedProjects";
import SectionResume from "../components/SectionResume";
import Footer from "../components/Footer";
import MenuOverlay from "../components/MenuOverlay";
import { useLanguage } from "../i18n/LanguageContext";
import { homeMessages } from "../i18n/homeMessages";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useLanguage();
  const msg = homeMessages[lang];

  useEffect(() => {
    document.title = msg.meta.siteTitle;
  }, [msg.meta.siteTitle]);

  return (
    <>
      <Header
        onMenuClick={() => setMenuOpen(true)}
        isMenuOpen={menuOpen}
        onMenuClose={() => setMenuOpen(false)}
      />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <HomeHero />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <FeaturedProjects />
          <SectionResume />
          <Footer />
        </motion.div>
      </main>
    </>
  );
}
