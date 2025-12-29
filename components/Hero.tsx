'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring, motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ArrowLeft, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Hero() {
    const { currentProduct, nextProduct, prevProduct, currentProductIndex } = useStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);

    // Scroll progress for the entire page/hero section
    // In a real parallax setup, the hero might be sticky for a while (pinning).
    // For this single page, we map the first 2-3 viewports of scroll to the animation.
    // For this single page, we map the first 2-3 viewports of scroll to the animation.
    const { scrollYProgress } = useScroll();

    // Smooth scroll progress using spring physics
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Transform scroll (0 to 1) to frame index
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, currentProduct.frames.length - 1]);

    useEffect(() => {
        // Preload images when product changes
        const newImages: HTMLImageElement[] = [];
        let count = 0;

        // Safety check for empty frames
        if (!currentProduct.frames || currentProduct.frames.length === 0) return;

        // Optimization: Load first one immediately, others progressively
        const loadFrame = (src: string, index: number) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                count++;
                setLoadedCount(prev => prev + 1);
                if (index === 0) {
                    // Draw first frame immediately
                    drawFrame(0, img);
                }
            };
            newImages[index] = img;
        };

        currentProduct.frames.forEach((src, i) => loadFrame(src, i));
        setImages(newImages);
        setLoadedCount(0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProduct.id]);

    const drawFrame = (index: number, imgInstance?: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = imgInstance || images[index];
        if (!img || !img.complete) return;

        // Maintain aspect ratio cover
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw image centered
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    // Animation Loop
    useEffect(() => {
        const unsubscribe = frameIndex.on('change', (latest) => {
            const idx = Math.floor(latest);
            if (idx >= 0 && idx < images.length) {
                drawFrame(idx);
            }
        });
        return () => unsubscribe();
    }, [frameIndex, images]);

    // Initial Draw on Resize
    useEffect(() => {
        const handleResize = () => {
            drawFrame(Math.floor(frameIndex.get()));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [images]);

    return (
        <div ref={containerRef} className="relative h-[300vh]">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* Content Layer (Behind Product) */}
                <div className="relative z-0 h-full max-w-7xl mx-auto px-6 grid grid-cols-12 pointer-events-none">

                    {/* Left Content */}
                    <div className="col-span-12 md:col-span-5 h-full flex flex-col justify-center pointer-events-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentProduct.id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] mb-2" style={{ color: currentProduct.themeColor }}>
                                    {currentProduct.subtitle}
                                </h2>
                                <h1
                                    className="text-5xl md:text-8xl font-black uppercase mb-6 leading-tight text-white/90"
                                >
                                    {currentProduct.name}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-md leading-relaxed">
                                    {currentProduct.description}
                                </p>

                                <div className="flex gap-4 pointer-events-auto">
                                    <a
                                        href="#products"
                                        className="px-8 py-3 rounded-full border border-white text-white font-medium hover:bg-white hover:text-black transition-all"
                                    >
                                        BUY NOW
                                    </a>
                                    <a
                                        href={`https://wa.me/919022166328?text=Hi, I want to buy ${currentProduct.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-3 rounded-full font-medium transition-all hover:brightness-110 text-center flex items-center justify-center"
                                        style={{ backgroundColor: '#25D366', color: '#fff' }}
                                    >
                                        WHATSAPP
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Center Empty */}
                    <div className="col-span-0 md:col-span-4"></div>

                    {/* Right Navigation */}
                    <div className="col-span-12 md:col-span-3 h-full flex flex-col justify-center items-end pointer-events-auto">
                        <div className="flex items-center gap-6">
                            {/* Static 01 / 02 Display */}
                            <div className="flex flex-col items-end gap-2 font-bold text-white/80">
                                <a href="/" className="text-xl opacity-40 hover:opacity-100 transition-opacity">01</a>
                                <div className="text-6xl text-[var(--accent-gold)]">02</div>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <button
                                    onClick={() => {
                                        // Logic: If on first item, go to Home. Else prev product.
                                        if (currentProductIndex === 0) {
                                            window.location.href = '/';
                                        } else {
                                            prevProduct();
                                        }
                                    }}
                                    className="p-2 hover:text-brand-gold text-white/50 transition-colors uppercase text-xs tracking-widest flex flex-col items-center gap-1"
                                >
                                    <ArrowLeft size={16} className="rotate-90" />
                                    Prev
                                </button>

                                <div className="w-[1px] h-12 bg-white/20"></div>

                                <button
                                    onClick={nextProduct}
                                    className="p-2 hover:text-brand-gold text-white transition-colors uppercase text-xs tracking-widest flex flex-col items-center gap-1"
                                >
                                    Next
                                    <ArrowRight size={16} className="rotate-90" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Socials */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6 pointer-events-auto">
                        <a href="#" className="text-white/60 hover:text-white transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="text-white/60 hover:text-white transition-colors"><Facebook size={20} /></a>
                    </div>

                </div>

                {/* Product Layer (Floating on Top) */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none mix-blend-lighten"
                />

                {/* Optional: Subtle top gradient for text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-0 pointer-events-none" />
            </div>
        </div>
    );
}
