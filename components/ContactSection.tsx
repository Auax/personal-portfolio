"use client";

import { FormEvent, useState } from "react";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { useLocale } from "@/lib/i18n";

type SubmissionState = "idle" | "submitting" | "success" | "error" | "unconfigured";

export default function ContactSection() {
  const { messages } = useLocale();
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmissionState("unconfigured");
      return;
    }

    setSubmissionState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("subject", "New portfolio contact");
    formData.append("from_name", "Ibai Farina Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("Web3Forms rejected the submission");
      }

      form.reset();
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  };

  const feedbackMessage =
    submissionState === "success"
      ? messages.contact.success
      : submissionState === "error"
        ? messages.contact.error
        : submissionState === "unconfigured"
          ? messages.contact.unconfigured
          : "";

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
            {messages.contact.title}
          </h2>
          <p data-animate="fade-up" className="text-zinc-400 text-base">
            {messages.contact.intro}
          </p>
          <div
            data-animate="fade-up"
            className="mt-8 flex flex-col items-start gap-3"
            aria-label={messages.contact.socials}
          >
            <a
              href="https://www.linkedin.com/in/ibai-farina-del-olmo-3bb55b243/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-[color,text-decoration-color] hover:text-white hover:decoration-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <BsLinkedin size={17} aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href="https://github.com/ibaifarina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-[color,text-decoration-color] hover:text-white hover:decoration-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <BsGithub size={18} aria-hidden="true" />
              GitHub
            </a>
            <a
              href="mailto:ibaifo8@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-[color,text-decoration-color] hover:text-white hover:decoration-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <EnvelopeSimple size={19} weight="regular" aria-hidden="true" />
              ibaifo8@gmail.com
            </a>
          </div>
        </div>

        <form
          data-animate="fade-up"
          className="flex-1 flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm text-zinc-400">
                {messages.contact.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={100}
                required
                className="bg-transparent border-b border-zinc-700 pb-2 text-white text-sm outline-none focus:border-zinc-400 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-zinc-400">
                {messages.contact.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                className="bg-transparent border-b border-zinc-700 pb-2 text-white text-sm outline-none focus:border-zinc-400 transition-colors"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm text-zinc-400">
              {messages.contact.description}
            </label>
            <textarea
              id="description"
              name="message"
              rows={4}
              maxLength={5000}
              required
              className="bg-transparent border-b border-zinc-700 pb-2 text-white text-sm outline-none focus:border-zinc-400 transition-colors resize-none"
            />
          </div>
          <div className="mt-2">
            <button
              type="submit"
              disabled={submissionState === "submitting"}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/60 disabled:cursor-wait transition-colors text-white text-sm font-medium px-8 py-3 cursor-pointer"
            >
              {submissionState === "submitting"
                ? messages.contact.sending
                : messages.contact.send}
            </button>
          </div>
          <p
            aria-live="polite"
            className={`min-h-5 text-sm ${
              submissionState === "success" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {feedbackMessage}
          </p>
        </form>
      </div>
    </section>
  );
}
