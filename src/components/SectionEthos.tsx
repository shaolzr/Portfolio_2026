const ethosImages = [
  "https://framerusercontent.com/images/KISgPbVNgMcYtzOtqXhSOTqxJlU.jpg",
  "https://framerusercontent.com/images/SvMq7dJRw6nZ0uCDIlsvp71e6A.jpg",
  "https://framerusercontent.com/images/vZpWJNNFe8HzYGAQ9fHT0l0aWc.jpg",
  "https://framerusercontent.com/images/lT3HyzBEuFsJiHR9PsMbGYbMEnM.jpg",
  "https://framerusercontent.com/images/AzrcmlMcNcGVJKsV7GV0nksYt0.jpg",
];

export default function SectionEthos() {
  return (
    <section className="border-t border-white/20">
      <div className="px-5 md:px-5 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
          <div className="flex-1 max-w-3xl">
            <p className="text-white/60 text-sm uppercase tracking-wider mb-4">
              Ethos
            </p>
            <h2 className="text-white font-semibold text-2xl md:text-4xl lg:text-5xl leading-tight mb-8">
              Making brands memorable by creating lasting impressions that
              resonate with audiences
            </h2>
            <a
              href="/about"
              className="inline-flex items-center gap-2 text-white text-sm uppercase tracking-wider hover:opacity-80 transition-opacity"
            >
              About
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </a>
          </div>
          <div className="flex-shrink-0 flex gap-2 md:gap-3">
            {ethosImages.map((src, i) => (
              <div
                key={src}
                className="w-[80px] md:w-[120px] lg:w-[140px] aspect-[3/4] rounded-none overflow-hidden"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
