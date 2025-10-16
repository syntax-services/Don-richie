import Image from "next/image";

const items = [
  { id: 1, name: "Classic Suit", price: "₦25,000", img: "/clothes/outfit1.jpg" },
  { id: 2, name: "Casual Wear", price: "₦15,000", img: "/clothes/outfit2.jpg" },
  { id: 3, name: "Luxury Jacket", price: "₦30,000", img: "/clothes/outfit3.jpg" },
  { id: 4, name: "Native Set", price: "₦20,000", img: "/clothes/outfit4.jpg" },
];

export default function Catalogue() {
  return (
    <section className="py-16 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <h2 className="text-3xl font-bold text-center mb-10">Our Collection</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {items.map((item) => (
          <div key={item.id} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            <Image src={item.img} alt={item.name} width={300} height={300} className="w-full h-56 object-cover" />
            <div className="p-3 flex flex-col items-center">
              <p className="font-semibold">{item.name}</p>
              <span className="text-sm text-gray-500">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
