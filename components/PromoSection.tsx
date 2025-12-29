import { Check, Truck, MapPin, Phone, Instagram } from 'lucide-react';

export default function PromoSection() {
    return (
        <section className="py-24 px-6 bg-black relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[var(--accent)]/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">

                {/* Image Side */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-[var(--accent-gold)] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                    <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl border border-white/10">
                        <img
                            src="/assets/vermicompost-promo.jpg"
                            alt="Greenary Organics Vermicompost"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>

                {/* Content Side */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--accent-gold)] mb-4 font-medium">
                            Premium Care
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Nourish your plants <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-gold)]">Naturally.</span>
                        </h3>
                        <p className="mt-4 text-white/60 text-lg">
                            Elevate your home garden with our 100% organic, nutrient-rich Vermicompost.
                        </p>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4">
                        {[
                            "Ideal for flowering plants",
                            "Best for kitchen gardening",
                            "100% organic & eco-friendly"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-white/80 text-lg">
                                <div className="p-1 rounded-full bg-[var(--accent)]/20 text-[var(--accent)]">
                                    <Check size={16} />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="w-full h-[1px] bg-white/10" />

                    {/* Delivery & Contact Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-white/90">
                                <Truck className="text-[var(--accent-gold)]" />
                                <span>Delivery all over Maharashtra</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/90">
                                <MapPin className="text-[var(--accent-gold)]" />
                                <span>Free delivery in Amravati</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <a href="tel:+919022166328" className="flex items-center gap-3 text-white/90 hover:text-[var(--accent-gold)] transition-colors">
                                <Phone className="text-white/50" />
                                <span className="font-mono text-lg tracking-wide">90221 66328</span>
                            </a>
                            <a href="https://instagram.com/greenary_organic" target="_blank" className="flex items-center gap-3 text-white/90 hover:text-[var(--accent-gold)] transition-colors">
                                <Instagram className="text-white/50" />
                                <span>@greenary_organic</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
