// app/demos/don-richie/page.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * Don Richie — Demo landing (single-file)
 * - Next.js 15 client component
 * - Keep metadata in layout.tsx (don't use Head/Script here)
 * - Make sure public/don-richie/ contains images named 1.jpg ... 20.jpg (first 4 use specific names if present)
 */

/* -------------------- PRODUCTS (20) -------------------- */
const PRODUCTS = Array.from({ length: 20 }).map((_, idx) => {
  const n = idx + 1;
  const firstMap: Record<number, string> = {
    1: "/don-richie/coat-1.jpg",
    2: "/don-richie/dress-1.jpg",
    3: "/don-richie/tux-1.jpg",
    4: "/don-richie/shirt-1.jpg",
  };
  return {
    id: `p-${n}`,
    title:
      n === 1
        ? "Heritage Coat"
        : n === 2
        ? "Silk Sash Dress"
        : n === 3
        ? "Midnight Tux"
        : n === 4
        ? "Weekend Shirt"
        : `Collection Item ${n}`,
    price:
      n === 1
        ? "₦85,000"
        : n === 2
        ? "₦55,000"
        : n === 3
        ? "₦110,000"
        : n === 4
        ? "₦22,000"
        : `₦${(18 + n) * 1000}`,
    img: firstMap[n] ?? `/don-richie/${n}.jpg`,
  };
});

/* -------------------- HELPERS -------------------- */
const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------- FancyButton -------------------- */
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
    "inline-flex items-center justify-center gap-2 select-none rounded-full px-5 py-2 md:px-6 md:py-3 font-semibold transition-transform transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400";

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("https://wa.me");
    return (
      <a
        href={href}
        className={`${base} ${className}`}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${base} ${className}`} type="button">
      {children}
    </button>
  );
}

/* -------------------- PAGE -------------------- */
export default function DonRichieDemo(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX.set(Number(nx.toFixed(3)));
      mouseY.set(Number(ny.toFixed(3)));
    };

    el.addEventListener("pointermove", handleMove, { passive: true });
    return () => el.removeEventListener("pointermove", handleMove);
  }, [mouseX, mouseY]);

  const rotateX = useTransform(mouseY, (v) => v * 6);
  const rotateY = useTransform(mouseX, (v) => v * -6);
  const floatY = useTransform(mouseY, (v) => v * 8);

  /* small animation variants */
  const cardVariant = {
    hidden: { opacity: 0, y: 16 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.03, duration: 0.45 } }),
  };

  return (
    <main
      ref={containerRef}
      className="min-h-screen relative overflow-x-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#070707] dark:to-[#020202] transition-colors duration-500 text-slate-900 dark:text-white antialiased selection:bg-amber-600 selection:text-white"
    >
      {/* Background decorative blobs (parallax float) */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          style={{ translateY: floatY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18, scale: 1.03 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-[6%] left-[-8%] w-[520px] h-[520px] bg-amber-500/70 rounded-full blur-3xl mix-blend-soft-light"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 1.4 }}
          className="absolute right-[-15%] bottom-[-8%] w-[720px] h-[720px] bg-gradient-to-tr from-black to-transparent blur-2xl"
        />
      </div>

      {/* NAV NOTE: keep nav in layout/header component; this demo focuses on the page content */}

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* TEXT */}
          <motion.div
            className="md:col-span-6 order-2 md:order-1"
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ rotateX, rotateY }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold leading-tight tracking-tight">
              Don Richie
              <span className="block text-amber-600 dark:text-amber-400">Boutique</span>
            </h1>

            <p className="mt-6 text-base md:text-lg max-w-xl text-slate-700 dark:text-slate-200">
              Curated luxury wear — cut with personality. Fashion that turns presence into art.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <FancyButton href="#shop" className="bg-amber-600 text-black dark:bg-amber-400 dark:text-black hover:bg-amber-500">
                  View Catalogue
                </FancyButton>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <FancyButton
                  href="https://wa.me/234XXXXXXXXXX?text=Hi%2C%20I%20saw%20your%20Don%20Richie%20demo"
                  className="bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  Message on WhatsApp
                </FancyButton>
              </motion.div>
            </div>

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">
              Demo by Victor — Frontend Developer. Built with Next.js 15 & Framer Motion.
            </p>
          </motion.div>

          {/* VISUAL / ART CARD with PLAYBOY WAYS MAN SVG overlay */}
          <motion.div
            className="md:col-span-6 order-1 md:order-2"
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              style={{ rotateY }}
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 90 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
            >
              <div className="grid grid-cols-2 gap-0">
                <div className="relative h-64 sm:h-80 md:h-96">
                  <Image src={PRODUCTS[0].img} alt={PRODUCTS[0].title} fill className="object-cover" priority sizes="(max-width:768px)100vw,50vw" />
                </div>
                <div className="relative h-64 sm:h-80 md:h-96">
                  <Image src={PRODUCTS[1].img} alt={PRODUCTS[1].title} fill className="object-cover" priority sizes="(max-width:768px)100vw,50vw" />
                </div>
              </div>

              {/* small badges + shadow */}
              <div className="absolute top-6 left-6 bg-black/50 px-3 py-1 text-sm text-white/90 rounded-md backdrop-blur-sm shadow">
                NEW DROP
              </div>

              {/* PLAYBOY WAYS-MAN decorative SVG — positioned bottom-right and animates in */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
                className="absolute -bottom-6 -right-6 w-44 h-44 md:w-52 md:h-52 pointer-events-none"
                aria-hidden
              >
                {/* SVG recreation: purple + white text strokes in stacked layout */}
                <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                    <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.25" />
                    </filter>
                  </defs>

                  {/* background rounded rectangle faint */}
                  <rect x="0" y="0" width="200" height="200" rx="16" fill="transparent" />

                  {/* PLAYBOY text (hand-drawn style simulated) */}
                  <g transform="translate(8,36)" filter="url(#f1)">
                    <text
                      x="0"
                      y="0"
                      style={{
                        fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif",
                        fontWeight: 800,
                        fontSize: 36,
                      }}
                      fill="url(#g1)"
                    >
                      PLAYBOY
                    </text>

                    {/* arrows row */}
                    <text
                      x="0"
                      y="36"
                      style={{
                        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
                        fontSize: 18,
                        letterSpacing: 3,
                        fill: "#ffffff",
                        opacity: 0.95,
                      }}
                    >
                      &gt;&gt;&gt;&gt;&gt;
                    </text>

                    {/* WAYSMAN in white stroked */}
                    <text
                      x="0"
                      y="66"
                      style={{
                        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
                        fontSize: 28,
                        fontWeight: 700,
                        fill: "#ffffff",
                      }}
                    >
                      WAYSMAN
                    </text>
                  </g>
                </svg>
              </motion.div>

              {/* subtle shadow at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section id="shop" className="relative z-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-8"
          >
            Featured Pieces
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
            {PRODUCTS.map((p, i) => {
              const oddOffset = i % 3 === 0 ? "-translate-y-2 md:-translate-y-6" : i % 3 === 1 ? "translate-y-1 md:translate-y-4" : "";
              return (
                <motion.article
                  key={p.id}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={cardVariant}
                  className={`rounded-2xl overflow-hidden shadow-xl dark:shadow-black/40 bg-white dark:bg-slate-900 transform-gpu ${oddOffset}`}
                >
                  <div className="relative h-56 md:h-64 lg:h-56">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover"
                      priority={i < 6}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-black text-sm font-medium rounded">
                      {i === 0 ? "Popular" : "New"}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Handpicked fabric • Ready-to-order</p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bold text-amber-600">{p.price}</span>

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 bg-transparent transition hover:bg-slate-50 dark:hover:bg-slate-800"
                        onClick={() => {
                          const text = encodeURIComponent(`Hi, I'm interested in ${p.title} - ${p.price}`);
                          window.open(`https://wa.me/234XXXXXXXXXX?text=${text}`, "_blank", "noopener,noreferrer");
                        }}
                        aria-label={`Order ${p.title}`}
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
          <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-2xl font-semibold text-center mb-6">
            What customers say
          </motion.h3>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { text: "Beautiful fabrics, great fit. Shipping was fast.", who: "— Aisha" },
              { text: "My tux at the wedding turned heads. Quality is top-tier.", who: "— Tunde" },
            ].map((t, idx) => (
              <motion.blockquote
                key={idx}
                initial={{ y: 8, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white/90 dark:bg-slate-900 p-6 rounded-2xl shadow"
              >
                <p className="text-slate-700 dark:text-slate-200 italic">{t.text}</p>
                <cite className="block mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">{t.who}</cite>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h4 initial={{ scale: 0.98, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="text-3xl font-bold mb-4">
            Want a custom shop like this?
          </motion.h4>

          <p className="text-slate-600 dark:text-slate-300 mb-6">I build catalogues that match your brand personality and convert through direct WhatsApp ordering.</p>

          <div className="flex items-center justify-center gap-4">
            <FancyButton href="https://wa.me/234XXXXXXXXXX?text=Hi%20I%20want%20a%20Don%20Richie%20style%20site" className="bg-amber-600 text-black hover:bg-amber-500">
              Start a Quick Demo
            </FancyButton>

            <FancyButton href="mailto:habeebtijanivictor@gmail.com" className="border border-slate-200 dark:border-slate-700">
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
