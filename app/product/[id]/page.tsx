'use client';

import { useParams, useRouter } from 'next/navigation';
import { products } from '@/lib/products';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(products.find(p => p.id === id));

    useEffect(() => {
        if (!product) {
            router.push('/');
        }
    }, [product, router]);

    if (!product) return null;

    const whatsappMessage = encodeURIComponent(`Hi, I want to buy ${product.name} priced at ₹${product.price} ${product.unit}.`);
    const whatsappLink = `https://wa.me/919022166328?text=${whatsappMessage}`;

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <Navbar />

            <div className="pt-28 pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-10 transition-colors group text-sm"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card-premium overflow-hidden"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full aspect-square object-cover"
                            />
                        </motion.div>

                        {/* Info Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col"
                        >
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                {product.name}
                            </h1>

                            <div className="inline-flex items-baseline gap-1 text-[var(--accent-gold)] mb-6">
                                <span className="text-xl">₹</span>
                                <span className="text-4xl font-bold">{product.price}</span>
                                <span className="text-sm text-[var(--text-muted)] ml-2">{product.unit}</span>
                            </div>

                            <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="mb-8">
                                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-[var(--text-muted)]">
                                    Benefits
                                </h3>
                                <ul className="space-y-3">
                                    {product.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm">
                                            <div className="w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                                                <Check size={12} className="text-white" />
                                            </div>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:brightness-110 transition-all hover:scale-[1.02]"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                Order on WhatsApp
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

            <footer className="py-10 border-t border-[var(--border)] text-center">
                <p className="font-bold text-sm mb-1">GREENARY ORGANICS</p>
                <p className="text-[var(--text-muted)] text-xs">© 2025 All rights reserved.</p>
            </footer>
        </main>
    );
}
