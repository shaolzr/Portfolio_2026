import { motion } from "framer-motion";

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
    <Wrapper className="flex flex-col gap-2" {...wrapperProps}>
      <Line />
      <div className="flex flex-col gap-1 py-2">
        <span className="text-white/60 text-sm uppercase tracking-wider">
          {label}
        </span>
        <div className="text-white text-base">{children}</div>
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
  return (
    <section id="info" className="px-5 md:px-10 py-12 md:py-16">
      <motion.div
        className="max-w-4xl space-y-0"
        variants={sectionContainer}
        initial="hidden"
        animate="visible"
      >
        <InfoRow label="Client" variants={rowVariants}>
          <span>QQ SPEED</span>
        </InfoRow>
        <InfoRow label="Type" variants={rowVariants}>
          <span>Game, AI Agent, AI Product</span>
        </InfoRow>
        <InfoRow label="Year" variants={rowVariants}>
          <span>2025</span>
        </InfoRow>
        <InfoRow label="About" variants={rowVariants}>
          <p className="text-white/90 leading-relaxed max-w-2xl">
            I am Luca Derene, a Digital Designer & Art Director based in Toronto,
            Canada. With more than 10 years of experience in digital design and
            print for national and international clients such as Balenciaga,
            Sensa, Apex Films and Filippo Monelli. Currently working at Basic as
            Creative Director. Their innovative approach and personalized
            solutions have helped clients achieve remarkable growth and
            establish a strong market presence. Curiously working at Basic as
            Creative Director.
          </p>
        </InfoRow>
      </motion.div>
    </section>
  );
}
