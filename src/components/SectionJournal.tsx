import { useRef, useState } from "react";

const articles = [
  {
    title: "Studio 34 got 2 awards",
    excerpt:
      "We are thrilled to share that Studio 34 has recently received two prestigious awards for their outstanding work. These accolades recognize the team's exceptional creativity, innovation, and dedication to excellence.",
    image: "https://framerusercontent.com/images/nC1QCD9F0pC9yFGFxz1HuenOBVg.jpg",
    href: "#",
  },
  {
    title: "Welcome Ethan Richards",
    excerpt:
      "We are delighted to welcome Ethan Richards to our team as our new Creative Director. Ethan brings a wealth of experience and a fresh perspective to our organization.",
    image: "https://framerusercontent.com/images/2HSrM4FCfgCR12D0Ffpnheals.jpeg",
    href: "#",
  },
  {
    title: "Monica Ellis launches new template",
    excerpt:
      "The intersection of sustainability and aesthetics in packaging design is reshaping the industry. Consumers today are more environmentally conscious, demanding eco-friendly packaging solutions.",
    image: "https://framerusercontent.com/images/TBs6vhy8lqssqskHUUoRFEjpQ.jpg",
    href: "#",
  },
  {
    title: "Nostalgia in Modern Branding",
    excerpt:
      "Emerged as a powerful tool in modern branding, resonating deeply with consumers. By tapping into fond memories and emotions, brands can create a strong connection with their audience.",
    image: "https://framerusercontent.com/images/TuxtyfqlrrjAYGMYQhms0h42Po.jpeg",
    href: "#",
  },
  {
    title: "Edward Hugo is listed for SOTD",
    excerpt:
      "We are proud to announce that Edward Hugo has been listed for Site of the Day (SOTD) by Awwwards. This prestigious recognition highlights the exceptional creativity and technical prowess.",
    image: "https://framerusercontent.com/images/j5GqtHizxfJ6GtfiKOE7Zjj3ECQ.jpg",
    href: "#",
  },
  {
    title: "When does design end?",
    excerpt:
      "The concept of \"when design ends\" is a thought-provoking question that challenges traditional perceptions. In reality, design is an ever-evolving process that often has no definitive endpoint.",
    image: "https://framerusercontent.com/images/bX9MAbVHvoGPKbGUQ5gWDV0G2JM.jpg",
    href: "#",
  },
  {
    title: "A Letter From the Founders",
    excerpt:
      "We are thrilled to share the exciting journey we have embarked on at Studio Terrace. Our mission has always been to innovate and push the boundaries of what's possible in design and technology.",
    image: "https://framerusercontent.com/images/EaYLa6xqAVRSlkdCyoJGr4NaDP8.jpg",
    href: "#",
  },
  {
    title: "Using AI in design",
    excerpt:
      "Artificial Intelligence (AI) is revolutionizing the design industry, offering unprecedented capabilities and efficiencies. Designers now leverage AI to streamline workflows and enhance creativity.",
    image: "https://framerusercontent.com/images/yiwy4ImwZCLNArkVK47s1frkho.jpg",
    href: "#",
  },
];

export default function SectionJournal() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="journal" className="pb-12 md:pb-16 pl-5 md:pl-5">
      <div className="mr-5 md:mr-10 border-t border-white/20" aria-hidden />
      <div className="pr-5 md:pr-10 pt-12 md:pt-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-white font-semibold text-3xl md:text-4xl">
            Journal
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-10 h-10 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-10 h-10 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar pr-5 md:pr-10 pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {articles.map((article) => (
          <a
            key={article.title}
            href={article.href}
            className="flex-shrink-0 w-[280px] md:w-[320px] group snap-start"
          >
            <div className="aspect-[3/4] rounded-none overflow-hidden mb-4">
              <img
                src={article.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h4 className="text-white font-medium text-lg md:text-xl mb-2 group-hover:underline">
              {article.title}
            </h4>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-2">
              {article.excerpt}
            </p>
            <span className="text-white/50 text-sm">Read More</span>
          </a>
        ))}
      </div>
    </section>
  );
}
