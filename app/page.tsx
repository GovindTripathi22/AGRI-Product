import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import { Truck, Leaf, Sprout } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-6 bg-brand-light dark:bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Why Choose Greenary?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Leaf className="w-12 h-12 text-brand-green" />,
                title: "100% Organic",
                desc: "Certified chemical-free and safe for all crops."
              },
              {
                icon: <Sprout className="w-12 h-12 text-brand-gold" />,
                title: "High Yield",
                desc: "Proven to increase crop productivity by up to 30%."
              },
              {
                icon: <Truck className="w-12 h-12 text-brand-green" />,
                title: "Farm to Home",
                desc: "Direct delivery from our sustainable farms to your door."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold/50 transition-colors">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How To Use */}
      <section id="how-to-use" className="py-24 px-6 bg-brand-green text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Simple Application</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-3xl font-bold mb-6">1</div>
              <h3 className="text-xl font-bold mb-2">Mix</h3>
              <p className="opacity-80">Mix with soil in 1:4 ratio.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-3xl font-bold mb-6">2</div>
              <h3 className="text-xl font-bold mb-2">Plant</h3>
              <p className="opacity-80">Sow seeds or plant saplings.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-3xl font-bold mb-6">3</div>
              <h3 className="text-xl font-bold mb-2">Water</h3>
              <p className="opacity-80">Water regularly and watch it grow.</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="py-12 bg-black text-white/50 text-center">
        <p className="mb-4 text-white">Greenary Organics</p>
        <p>Contact: +91 9022166328</p>
        <p className="mt-8 text-sm">© 2025 Greenary Organics. All rights reserved.</p>
      </footer>
    </main>
  );
}
