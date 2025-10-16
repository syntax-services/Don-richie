"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-[var(--brand-purple)] text-white">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-extrabold mb-4"
      >
        Luxury. Style. Confidence.
      </motion.h1>
      <p className="max-w-xl text-lg opacity-90 mb-8">
        Discover timeless fashion from Don Richie Boutique — where elegance meets confidence.
      </p>
      <a
        href="https://wa.me/234XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
      >
        Order via WhatsApp
      </a>
    </section>
  );
}
