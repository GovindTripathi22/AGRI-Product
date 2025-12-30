"use client";

import { motion } from "framer-motion";
import { Leaf, Droplets, FlaskConical, Sprout, ShoppingBag, MessageCircle } from "lucide-react";

export default function BrandShowcase() {
    const products = [
        { name: "Vermicompost (गांडूळ खत)", icon: <Sprout className="w-5 h-5" /> },
        { name: "Jeevamrut", icon: <Droplets className="w-5 h-5" /> },
        { name: "Neemastra", icon: <Leaf className="w-5 h-5" /> },
        { name: "AgniAstra", icon: <FlaskConical className="w-5 h-5" /> },
        { name: "Potting Mixture", icon: <ShoppingBag className="w-5 h-5" /> },
        { name: "Bio-pesticides", icon: <FlaskConical className="w-5 h-5" /> },
    ];

    return (
        <section className="relative py-32 px-6 overflow-hidden bg-black">
            {/* Background Texture - Optional if image fails */}
            <div className="absolute inset-0 bg-[url('/assets/sequences/pot-mixture/0001.webp')] bg-cover bg-center opacity-20 blur-xl scale-110 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />

            <div className="relative z-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 space-y-8"
                >
                    <div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] text-xs tracking-widest uppercase mb-6"
                        >
                            <Leaf size={12} />
                            Welcome to Greenary Organics
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight font-[family-name:var(--font-cormorant)] text-white">
                            Where Soil Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-gold)] to-yellow-600">Sustainability</span>
                        </h2>
                        <p className="text-xl text-white/60 font-light mt-6 max-w-lg">
                            Your trusted partner for natural farming & healthy gardening. We bring the essence of nature back to your roots.
                        </p>
                    </div>

                    {/* Product List Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {products.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--accent-gold)]/50 transition-colors group"
                            >
                                <div className="p-2 rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] group-hover:text-black transition-colors">
                                    {item.icon}
                                </div>
                                <span className="font-medium text-white/80">{item.name}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                        <p className="text-sm font-serif italic text-white/50">
                            "Because healthy soil grows healthy food."
                        </p>
                        <a
                            href="https://wa.me/919022166328"
                            className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full font-bold transition-transform hover:scale-105"
                        >
                            <MessageCircle size={20} />
                            Chat on WhatsApp
                        </a>
                    </div>
                </motion.div>

                {/* Right: Visual Showcase (Placeholder for Generated Image) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="flex-1 w-full relative aspect-[4/5] md:aspect-square"
                >
                    {/* Glowing frame effect */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--accent-gold)]/20 to-transparent rounded-[2rem] blur-2xl opacity-50" />

                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                        {/* Try to use the generated image if available, else fallback to promo or existing */}
                        {/* Ideally this src should be the one we generate. For now I'll point to a placeholder logic or the one uploaded if fits */}
                        <img
                            src="/assets/premium_organic_showcase.png"
                            onError={(e) => {
                                e.currentTarget.src = "/assets/vermicompost-promo.jpg"; // Fallback
                            }}
                            alt="Premium Organic Collection"
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        <div className="absolute bottom-8 left-8 right-8 text-center">
                            <p className="text-[var(--accent-gold)] tracking-[0.3em] text-xs uppercase mb-2">100% Organic</p>
                            <h3 className="text-2xl font-serif text-white">Nature's Best Kept Secret</h3>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
