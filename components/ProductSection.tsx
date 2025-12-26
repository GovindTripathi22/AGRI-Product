'use client';

import { products } from '@/lib/products';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ProductSection() {
    return (
        <section id="products" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                        Our Collection
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Premium <span className="text-[var(--accent-gold)]">Products</span>
                    </h2>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={`/product/${product.id}`}
                                className="group block card-premium overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1 group-hover:text-[var(--accent-gold)] transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-[var(--accent-gold)] font-bold">
                                                ₹{product.price}
                                                <span className="text-xs text-[var(--text-muted)] font-normal ml-1">
                                                    {product.unit}
                                                </span>
                                            </p>
                                        </div>
                                        <ArrowUpRight
                                            size={18}
                                            className="text-[var(--text-muted)] group-hover:text-[var(--accent-gold)] transition-colors mt-1"
                                        />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
