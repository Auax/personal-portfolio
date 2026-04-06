import Image from "next/image";

export default function HeroSection() {
    return (
        <section data-animate="hero-section" className="relative min-h-screen flex items-center overflow-hidden">
            <div data-animate="hero-bg" className="absolute inset-0 hero-bg-mask">
                <Image
                    src="/background.jpg"
                    alt=""
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

            <div className="relative z-10 w-full container mx-auto pt-32 pb-24">
                <div data-animate="hero-text" className="flex flex-col gap-4">
                    <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] tracking-tight">
                        Hi! I&apos;m a <em className="italic">full-stack</em>
                        <br />
                        web developer
                    </h1>
                    <p className="text-center text-base mx-auto md:text-lg text-zinc-400 max-w-md mt-2">
                        Full-stack developer based in Barcelona, Spain
                    </p>
                </div>
                <div data-animate="hero-cta" className="mt-8 text-center">
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium px-6 py-3"
                    >
                        Contact me
                    </a>
                </div>
            </div>
        </section>
    );
}
