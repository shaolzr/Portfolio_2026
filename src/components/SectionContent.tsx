const images = [
  "https://framerusercontent.com/images/trBkST6ew4GErkKVkNgzVKcDI.jpg",
  "https://framerusercontent.com/images/5xGSBzCL1JEHdeXXr3lsPBe3k.jpg",
  "https://framerusercontent.com/images/mtAUMdoC86LrILqsIfZExFiTUY.jpg",
];

export default function SectionContent() {
  return (
    <section className="px-5 md:px-10 py-8 md:py-12 space-y-6 md:space-y-8">
      <div className="w-full aspect-[16/10] rounded-none overflow-hidden">
        <img
          src={images[0]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={images[1]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={images[2]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
