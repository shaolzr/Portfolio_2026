import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    slug: "Tencent - QQ Spend",
    title: "Tencent",
    category: "AI Product Manager",
    year: "2025",
    image: "https://res.cloudinary.com/dcsejrast/image/upload/v1771134698/copy_of_mira_e1ab8e.png",
    type: "image",
  },
  {
    slug: "ralph-lauren",
    title: "Ralph Lauren",
    category: "Brand Identity",
    year: "2025",
    video: "https://ena-supply.b-cdn.net/Ellis/5740963-hd_2048_1080_25fps__61pct_smaller.mp4",
    type: "video",
  },
  {
    slug: "arrival",
    title: "Arrival",
    category: "Ad Campaign",
    year: "2024",
    image: "https://framerusercontent.com/images/PkbjjOpAysvbYm51r9I3C3StBI.jpg",
    type: "image",
  },
  {
    slug: "polestar",
    title: "Polestar",
    category: "Digital Experience",
    year: "2024",
    image: "https://framerusercontent.com/images/iyewFXpYmISbx25DNWzC5CzAMk.jpg",
    type: "image",
  },
  {
    slug: "solace-sound",
    title: "Solace Sound",
    category: "Art Direction",
    year: "2024",
    image: "https://framerusercontent.com/images/gmdG4iI9QdPN6ae4Q6FsY8sDbg.jpg",
    type: "image",
  },
  {
    slug: "zara",
    title: "Zara",
    category: "Brand Identity",
    year: "2023",
    image: "https://framerusercontent.com/images/WCjmTRv9XigabJOsFnOrVec0PFc.jpg",
    type: "image",
  },
  {
    slug: "first-round",
    title: "First Round",
    category: "Ad Campaign",
    year: "2022",
    image: "https://framerusercontent.com/images/uESjcdmOXjDY6KJW6pmr4xhx9U.jpg",
    type: "image",
  },
];

type Project = (typeof projects)[number];


// 超小屏：左标题 + 右类别（年份隐藏）；大屏：左/中/右 与 Header 对齐
const titleBarLayout =
  "grid grid-cols-2 min-[1350px]:grid-cols-[780px_auto_1fr] gap-4 items-baseline w-full px-5";
function ProjectBlock({ project }: { project: Project }) {
  const blockRef = useRef<HTMLDivElement>(null);
  // 整段 section 的滚动进度：0=section 顶在视口底，1=section 底在视口顶
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });
  // 标题用另一套进度：1 = section 底到达视口中心（标题不能超出 section，此时必须消失）
  const { scrollYProgress: titleScrollProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end center"],
  });
  // 遮罩黑度：section 越进入视口越亮
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 0.0]);
  // 标题条：section 顶到视口 1/2 时才出现（约 progress 0.33）→ 固定屏幕中间 → section 底到视口 1/2 时消失
  const titleOpacity = useTransform(
    titleScrollProgress,
    [0, 0.35, 0.45, 0.9, 0.98, 1],
    [0, 0, 1, 1, 0, 0]
  );

  return (
    <div ref={blockRef} className="min-h-screen relative cursor-pointer">
      <Link
        to={`/case-studies/${project.slug}`}
        className="block min-h-screen relative cursor-pointer"
      >
        <div className="absolute inset-0">
          {project.type === "video" && project.video ? (
            <video
              src={project.video}
              loop
              muted
              playsInline
              autoPlay
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </div>
        {/* 标题条出现后固定于屏幕正中间，与 header 左/中/右对齐；下一 section 占 50% 时消失 */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
          style={{ opacity: titleOpacity }}
          aria-hidden
        >
          {/* 整体上移一点，避免标题贴到 section 底边被下一块裁切 */}
          <div className={`${titleBarLayout} -translate-y-6`}>
            <h2 className="text-white/95 font-semibold text-xl md:text-2xl min-[1350px]:text-2xl tracking-tight text-left">
              {project.title}
            </h2>
            <span className="text-white/65 font-semibold text-xl md:text-xl min-[1350px]:text-2xl text-right min-[1350px]:text-left min-[1350px]:pl-2">
              {project.category}
            </span>
            <span className="text-white/65 font-semibold text-xl md:text-xl min-[1350px]:text-2xl text-right hidden min-[1350px]:inline">
              {project.year}
            </span>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section className="relative">
      {projects.map((project, index) => (
        <div key={project.slug} className={index === 0 ? "" : "hidden"}>
          <ProjectBlock project={project} />
        </div>
      ))}
    </section>
  );
}
