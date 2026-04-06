"use client";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full container mx-auto py-16 md:py-24"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="flex-1">
          <h2
            data-animate="section-heading"
            className="text-5xl md:text-7xl font-serif mb-4"
          >
            Let&apos;s talk
          </h2>
          <p className="text-zinc-400 text-base">Explain your project</p>
        </div>

        <form
          data-animate="fade-up"
          className="flex-1 flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm text-zinc-400">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="bg-transparent border-b border-zinc-700 pb-2 text-white text-sm outline-none focus:border-zinc-400 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-zinc-400">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="bg-transparent border-b border-zinc-700 pb-2 text-white text-sm outline-none focus:border-zinc-400 transition-colors"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm text-zinc-400">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="bg-transparent border-b border-zinc-700 pb-2 text-white text-sm outline-none focus:border-zinc-400 transition-colors resize-none"
            />
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium px-8 py-3"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
