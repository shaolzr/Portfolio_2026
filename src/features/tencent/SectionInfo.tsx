import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import { sectionInfoMessages } from "./sectionInfoMessages";

function Line() {
  return <div className="h-px w-full bg-white/20" />;
}

const rowVariants = {
  hidden: { opacity: 0, y: 24, x: -16 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

function InfoRow({
  label,
  children,
  variants,
}: {
  label: string;
  children: React.ReactNode;
  variants?: typeof rowVariants;
}) {
  const Wrapper = variants ? motion.div : "div";
  const wrapperProps = variants ? { variants } : {};
  return (
    <Wrapper className="flex flex-col gap-0" {...wrapperProps}>
      <Line />
      <div className="flex flex-row gap-8 pt-2 pb-8 items-start">
        <span className="text-white/60 text-sm uppercase tracking-wider shrink-0 w-20 min-[1350px]:w-24">
          {label}
        </span>
        <div className="text-white text-sm font-semibold text-left min-w-0 flex-1">{children}</div>
      </div>
    </Wrapper>
  );
}

const sectionContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

export default function SectionInfo() {
  const { lang } = useLanguage();
  const msg = sectionInfoMessages[lang];
  return (
    <section id="info" className="pl-5 pr-5 md:pr-10 py-12 md:py-16">
      <motion.div
        className="w-full min-[900px]:w-2/5 space-y-0 text-left ml-auto"
        variants={sectionContainer}
        initial="hidden"
        animate="visible"
      >
        <InfoRow label={msg.labels.client} variants={rowVariants}>
          <span>{msg.values.client}</span>
        </InfoRow>
        <InfoRow label={msg.labels.type} variants={rowVariants}>
          <span>{msg.values.type}</span>
        </InfoRow>
        <InfoRow label={msg.labels.year} variants={rowVariants}>
          <span>{msg.values.year}</span>
        </InfoRow>
        <InfoRow label={msg.labels.about} variants={rowVariants}>
          <p className="text-white leading-relaxed max-w-2xl">
            {msg.values.about}
          </p>
        </InfoRow>
      </motion.div>
    </section>
  );
}
