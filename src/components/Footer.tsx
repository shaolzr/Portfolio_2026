const sitemap = [
  { label: "Works", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Careers", href: "/#careers" },
  { label: "Contact", href: "/#contact" },
];

const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shaolzr" },
];

export default function Footer() {
  return (
    <footer className="bg-black flex flex-col min-h-[400px] md:min-h-[400px]">
      <div className="mx-5 md:mx-5 border-t border-white/20 shrink-0" aria-hidden />
      <div className="flex-1 flex flex-col px-5 md:px-5 pt-5 md:pt-5">
        <div className="flex flex-col gap-12 md:gap-20 min-[1350px]:grid min-[1350px]:grid-cols-[800px_1fr] min-[1350px]:gap-x-0 min-[1350px]:gap-y-12">
          <div>
            <a
              href="/"
              className="text-white text-xl md:text-xl font-semibold block mb-8"
            >
              SHAO Linzhengrong
            </a>
          </div>
          {/* Sitemap 与 Social 的横向间距：改 md:gap-x-* 即可 */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-y-0 md:gap-x-40">
            <div>
              <p className="text-white/50 text-sm font-bold uppercase tracking-wider mb-4">
                Sitemap
              </p>
              <ul className="flex flex-col gap-2">
                {sitemap.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white opacity-80 text-sm font-bold md:text-sm hover:opacity-100 transition-opacity font-bold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white/50 text-sm font-bold uppercase tracking-wider mb-4">
                Social
              </p>
              <ul className="flex flex-col gap-2">
                {social.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white opacity-80 text-sm font-bold md:text-sm hover:opacity-100 transition-opacity font-bold">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* 页面最下方：©2026 横向位置不变，Made by 与 Menu 对齐，二者同一行横向对齐 */}
      <div className="px-5 md:px-5 pt-4 pb-6 md:pb-4 shrink-0 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-white/30 min-[1350px]:grid min-[1350px]:grid-cols-[800px_1fr] min-[1350px]:gap-x-0 min-[1350px]:items-center">
        <p className="text-white/30 text-xs">©2026</p>
        <span>Made by SHAO Linzhengrong</span>
      </div>
    </footer>
  );
}
