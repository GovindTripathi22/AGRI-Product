
import LandingParallax, { CollectionSection } from "@/components/LandingParallax";
import PromoSection from "@/components/PromoSection";
import { Truck, Leaf, Sprout } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen bg-[var(--background)]">
            <LandingParallax />
            <CollectionSection />
            <PromoSection />

            {/* Benefits Section */}
            <section id="benefits" className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                            Why Us
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Premium Quality
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Leaf className="w-8 h-8" />,
                                title: "100% Organic",
                                desc: "Certified chemical-free and safe for all crops."
                            },
                            {
                                icon: <Sprout className="w-8 h-8" />,
                                title: "High Yield",
                                desc: "Proven to increase crop productivity by up to 30%."
                            },
                            {
                                icon: <Truck className="w-8 h-8" />,
                                title: "Farm to Home",
                                desc: "Direct delivery from our sustainable farms."
                            }
                        ].map((item, i) => (
                            <div key={i} className="card-premium p-6 text-center">
                                <div className="w-14 h-14 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-4 text-[var(--accent)]">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How To Use */}
            <section id="how-to-use" className="py-24 px-6 bg-[var(--accent)] text-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-sm uppercase tracking-[0.2em] opacity-70 mb-4">
                            Easy Steps
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            How to Use
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "1", title: "Mix", desc: "Mix with soil in 1:4 ratio." },
                            { step: "2", title: "Plant", desc: "Sow seeds or plant saplings." },
                            { step: "3", title: "Water", desc: "Water regularly and watch it grow." }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                                <p className="text-sm opacity-80">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="py-12 px-6 border-t border-[var(--border)] text-center">
                <p className="font-bold text-sm mb-1">GREENARY ORGANICS</p>
                <p className="text-[var(--text-muted)] text-sm mb-2">Contact: +91 90221 66328</p>
                <p className="text-[var(--text-muted)] text-xs mt-6">© 2025 All rights reserved.</p>
            </footer>
        </main>
    );
}
