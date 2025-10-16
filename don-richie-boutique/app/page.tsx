"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

// ✅ Moved all metadata to layout.tsx for proper Next.js 15 handling
// (Don’t use <Head> or <Script> in client components)

  { id: "p-1", title: "Heritage Coat", price: "₦85,000", img: "/don-richie/coat-1.jpg" },
  { id: "p-2", title: "Silk Sash Dress", price: "₦55,000", img: "/don-richie/dress-1.jpg" },
  { id: "p-3", title: "Midnight Tux", price: "₦110,000", img: "/don-richie/tux-1.jpg" },
  { id: "p-4", title: "Weekend Shirt", price: "₦22,000", img: "/don-richie/shirt-1.jpg" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function FancyButton({
  children,
  href,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 select-none rounded-full px-6 py-3 font-semibold transition-transform transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400";
  if (href) {
    return (
      <a href={href} className={`${base} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  );
}

export default function DonRichiePage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const handleMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX.set(nx);
      mouseY.set(ny);
    };
    const el = containerRef.current;
    el?.addEventListener("pointermove", handleMove);
    return () => el?.removeEventListener("pointermove", handleMove);
  }, [mouseX, mouseY]);

  const rotateX = useTransform(mouseY, (v) => v * 6);
  const rotateY = useTransform(mouseX, (v) => v * -6);
  const floatingY = useTransform(mouseY, (v) => v * 8);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-slate-50 dark:bg-[#070707] transition-colors duration-500 text-slate-900 dark:text-slate-100 antialiased selection:bg-amber-600 selection:text-white relative overflow-x-hidden"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          style={{ translateY: floatingY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-[8%] left-[-10%] w-[520px] h-[520px] bg-amber-500/70 rounded-full blur-3xl mix-blend-soft-light"
        />
        <div className="absolute right-[-15%] bottom-[-8%] w-[640px] h-[640px] bg-gradient-to-tr from-[#0b0b0b] to-transparent opacity-5 blur-2xl" />
      </div>

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <motion.div
            className="md:col-span-6 order-2 md:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ rotateX, rotateY }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold leading-tight tracking-tight">
              Don Richie{" "}
              <span className="block text-amber-600 dark:text-amber-400">Boutique</span>
            </h1>
            <p className="mt-6 text-base md:text-lg max-w-xl text-slate-700 dark:text-slate-300">
              Curated luxury wear — cut with personality. A shop built for presence, confidence and
              conversation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <FancyButton
                href="#shop"
                className="bg-amber-600 text-black dark:bg-amber-400 dark:text-black hover:bg-amber-500"
              >
                View Catalogue
              </FancyButton>
              <FancyButton
                href="https://wa.me/234XXXXXXXXXX"
                className="bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              >
                Message on WhatsApp
              </FancyButton>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-6 order-1 md:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              style={{ rotateY }}
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 90 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-0">
                <div className="relative h-64 sm:h-80 md:h-96">
                  <Image
                    src={PRODUCTS[0].img}
                    alt={PRODUCTS[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 sm:h-80 md:h-96">
                  <Image
                    src={PRODUCTS[1].img}
                    alt={PRODUCTS[1].title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute top-6 left-6 bg-black/40 px-3 py-1 text-sm text-white/90 rounded-md backdrop-blur-sm">
                NEW DROP
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section id="shop" className="relative z-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-8"
          >
            Featured Pieces
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p, i) => {
              const offset =
                i % 2 === 0 ? "-translate-y-2 md:-translate-y-4" : "translate-y-1 md:translate-y-6";
              return (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.02, translateY: -6 }}
                  className={`rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-slate-900 ${offset} transform-gpu`}
                >
                  <div className="relative h-60">
                    <Image src={p.img} alt={p.title} fill className="object-cover" />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-black text-sm font-medium rounded">
                      {i === 0 ? "Popular" : "New"}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold text-amber-600">{p.price}</span>
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 bg-transparent transition hover:bg-slate-50 dark:hover:bg-slate-800"
                        onClick={() => {
                          const text = encodeURIComponent(
                            `Hi, I'm interested in ${p.title} - ${p.price}`
                          );
                          window.open(`https://wa.me/234XXXXXXXXXX?text=${text}`, "_blank");
                        }}
                      >
                        Order
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold text-center mb-6"
          >
            What customers say
          </motion.h3>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { text: "Beautiful fabrics, great fit. Shipping was fast.", who: "— Aisha" },
              { text: "My tux at the wedding turned heads. Quality is top.", who: "— Tunde" },
            ].map((t, idx) => (
              <motion.blockquote
                key={idx}
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white/90 dark:bg-slate-900 p-6 rounded-2xl shadow"
              >
                <p className="text-slate-700 dark:text-slate-200 italic">{t.text}</p>
                <cite className="block mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {t.who}
                </cite>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h4
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Want a custom shop like this?
          </motion.h4>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            I build catalogues that match your brand personality and convert through direct WhatsApp
            ordering.
          </p>
          <div className="flex items-center justify-center gap-4">
            <FancyButton
              href="https://wa.me/234XXXXXXXXXX?text=Hi%20I%20want%20a%20site"
              className="bg-amber-600 text-black hover:bg-amber-500"
            >
              Start a Quick Demo
            </FancyButton>
            <FancyButton
              href="mailto:habeebtijanivictor@gmail.com"
              className="border border-slate-200 dark:border-slate-700"
            >
              Email Victor
            </FancyButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center text-sm text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} Don Richie Boutique — Demo by Victor (Frontend)
        </div>
      </footer>
    </main>
  );
        }
