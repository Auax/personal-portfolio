import { skills } from "@/lib/data";

export default function AboutSection() {
  return (
    <section className="w-full container mx-auto py-16 md:py-24" id="about">
      <h2
        data-animate="section-heading"
        className="text-5xl md:text-7xl font-serif mb-12"
      >
        About me
      </h2>

      <p
        data-animate="fade-up"
        className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl mb-16"
      >
        I build machine learning systems that go beyond notebooks and into
        production — where data actually changes decisions.
      </p>

      <div
        data-animate="fade-up"
        className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-800 pt-10"
      >
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h4 className="text-sm text-zinc-500 uppercase tracking-wider mb-4">
              {category}
            </h4>
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li key={item} className="text-sm text-zinc-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
