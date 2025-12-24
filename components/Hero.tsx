'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
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
    const { scrollYProgress } = useScroll();

    // Transform scroll (0 to 1) to frame index (0 to 239)
    // We assume the animation plays out over the first 200vh of scrolling? 
    // Or simply map 0-1 of the whole page if it's not too long.
    // Let's make the Hero sticky for a bit (CSS sticky) or just map standard scroll.
    // Standard scroll:
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, currentProduct.frames.length - 1]);

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
        <div ref={containerRef} className="relative h-[200vh]">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* Background Layer: Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Overlay Gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10 pointer-events-none" />

                {/* Content Layer */}
                <div className="relative z-20 h-full max-w-7xl mx-auto px-6 grid grid-cols-12 pointer-events-none">

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
                                <h1 className="text-5xl md:text-7xl font-black uppercase mb-6 leading-tight text-white">
                                    {currentProduct.name}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-md leading-relaxed">
                                    {currentProduct.description}
                                </p>

                                <div className="flex gap-4">
                                    <button className="px-8 py-3 rounded-full border border-white text-white font-medium hover:bg-white hover:text-black transition-all">
                                        BUY NOW
                                    </button>
                                    <button
                                        className="px-8 py-3 rounded-full font-medium transition-all hover:brightness-110"
                                        style={{ backgroundColor: currentProduct.themeColor, color: '#fff' }}
                                    >
                                        LEARN MORE
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Center Empty */}
                    <div className="col-span-0 md:col-span-4"></div>

                    {/* Right Navigation */}
                    <div className="col-span-12 md:col-span-3 h-full flex flex-col justify-center items-end pointer-events-auto">
                        <div className="flex items-center gap-6">
                            <div className="text-6xl font-bold text-white/20">
                                0{currentProductIndex + 1}
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <button
                                    onClick={prevProduct}
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
            </div>
        </div>
    );
}
