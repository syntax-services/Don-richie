export default function CTASection() {
  return (
    <section className="text-center py-20 bg-[var(--brand-purple)] text-white">
      <h2 className="text-3xl font-bold mb-4">Want to Order?</h2>
      <p className="mb-8 text-lg">Chat with us directly to get your perfect outfit today.</p>
      <a
        href="https://wa.me/234XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
      >
        Chat on WhatsApp
      </a>
    </section>
  );
}
