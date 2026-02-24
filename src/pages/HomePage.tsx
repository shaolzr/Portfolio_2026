import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import HomeHero from "../components/HomeHero";
import FeaturedProjects from "../components/FeaturedProjects";
import SectionEthos from "../components/SectionEthos";
import SectionJournal from "../components/SectionJournal";
import Footer from "../components/Footer";
import MenuOverlay from "../components/MenuOverlay";

const SITE_TITLE = "SHAO Linzhengrong";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = SITE_TITLE;
  }, []);

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
          <SectionEthos />
          <SectionJournal />
          <Footer />
        </motion.div>
      </main>
    </>
  );
}
