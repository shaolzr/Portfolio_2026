import { useRef } from "react";

function VideoThumbnail({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onMouseEnter = () => videoRef.current?.play();
  const onMouseLeave = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };
  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  );
}

const projects = [
  {
    title: "Saint Lauren",
    category: "Brand Identity",
    href: "#",
    image:
      "https://framerusercontent.com/images/yL1Tzp86HnTmiPFOdH9t2prwXg.jpg",
    type: "image",
  },
  {
    title: "Tommas Quinn",
    category: "Art Direction",
    href: "#",
    video:
      "https://ena-supply.b-cdn.net/Ellis/540593_Posing%20Model%20Architecture%20Building_By_Cinematic_Vision_Artlist_HD_smaller.mp4",
    type: "video",
  },
  {
    title: "Cut & Paste",
    category: "Digital Experience",
    href: "#",
    image:
      "https://framerusercontent.com/images/tLBzII75sk1kD5ZSVUxPVyf9VSQ.jpg",
    type: "image",
  },
];

export default function MoreWorks() {
  return (
    <section className="px-5 md:px-10 py-12 md:py-20">
      <div className="border-t border-white/20 pt-8 md:pt-12">
        <p className="text-white/60 text-sm uppercase tracking-wider mb-8 md:mb-12">
          More works
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className="group block"
            >
              <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden mb-4">
                {project.type === "video" && project.video ? (
                  <VideoThumbnail src={project.video} />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-white font-medium text-lg md:text-xl group-hover:underline">
                  {project.title}
                </span>
                <span className="text-white/40 text-sm md:text-base">
                  {project.category}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
