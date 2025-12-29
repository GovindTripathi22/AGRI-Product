"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar"; // Import Navbar
import { ChevronRight, ArrowRight, Instagram, Facebook, MessageCircle, ShoppingBag } from "lucide-react"; // Assuming lucide is installed
import styles from "./LandingParallax.module.css";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;

export default function LandingParallax() {
    const router = useRouter();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Single Variant - Pot Mixture
    const variant = {
        name: "POT MIXTURE",
        subtitle: "PREMIUM BLEND",
        description: "The perfect balance of Black Soil, Red Soil, and Vermicompost. Ready to use with a sustainable clay pot.",
        price: "₹250",
        themeColor: "#000000",
        index: "01",
        sequencePath: "assets/sequences/pot-mixture/",
    };

    // Load Images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const frameNum = String(i).padStart(3, "0");
                    // Use the public folder path
                    img.src = `/${variant.sequencePath}frame_${frameNum}_delay-0.04s.webp`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = () => resolve(); // prevent blocking
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Canvas Drawing & ScrollTrigger
    useEffect(() => {
        if (!isLoaded || !images.length || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Render Function (Cover Logic)
        const renderFrame = (index: number) => {
            const img = images[index];
            if (!img) return;

            // Clear (with bg color to prevent flicker)
            ctx.fillStyle = variant.themeColor; // Fill background with theme color (or black if preferred)
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Object Fit: CONTAIN Logic (Math.min)
            // Object Fit: CONTAIN Logic (Math.min)
            // Reverted to 0.75x Contain to fix "too big" issue.
            // This ensures the pot floats nicely in the center.
            const cropBottom = 60;
            const sourceHeight = Math.max(0, img.height - cropBottom);

            const scale = Math.min(canvas.width / img.width, canvas.height / sourceHeight);

            const zoom = 1.05;
            const finalScale = scale * zoom;

            const destWidth = img.width * finalScale;
            const destHeight = sourceHeight * finalScale;

            const x = (canvas.width - destWidth) / 2;
            const y = (canvas.height - destHeight) / 2;

            // Draw cropped image
            // source (0,0,w,h-60) -> dest (x,y,w*scale, (h-60)*scale)
            ctx.drawImage(img, 0, 0, img.width, sourceHeight, x, y, destWidth, destHeight);
        };

        // Set canvas size
        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(0); // Initial render
        };

        // Resize Observer could be better but window resize is std
        window.addEventListener("resize", updateSize);
        updateSize();

        // ScrollTrigger
        const st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%", // Reduced scroll length slightly for punchier feel
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
                const frameIndex = Math.floor(self.progress * (FRAME_COUNT - 1));
                renderFrame(frameIndex);
            },
        });

        return () => {
            st.kill();
            window.removeEventListener("resize", updateSize);
        };
    }, [isLoaded, images]);

    const handleEnterSite = () => {
        // Fade out entire container
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                router.push("/main"); /* User requested to go to VERMICOMPOST page, which is /main */
            }
        });
    };

    return (
        <div ref={containerRef} className="relative h-screen bg-black text-white">
            {/* Navbar */}
            <Navbar />

            {/* Viewing Area - Handled by GSAP Pin */}
            <div className="relative h-full overflow-hidden">

                {/* Content Grid (Layers over Canvas) */}
                <div className="relative z-20 h-full max-w-7xl mx-auto px-6 grid grid-cols-12 pointer-events-none">

                    {/* Left Content */}
                    <div className="col-span-12 md:col-span-5 h-full flex flex-col justify-center pointer-events-auto">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl md:text-2xl font-light tracking-[0.2em] text-[var(--accent-gold)] mb-2">
                                    {variant.subtitle}
                                </h3>
                                <h1 className="text-5xl md:text-8xl font-black uppercase leading-tight">
                                    {variant.name.split(' ').map((word, i) => (
                                        <span key={i} className="block">{word}</span>
                                    ))}
                                </h1>
                            </div>

                            <p className="text-lg md:text-xl text-gray-300 max-w-md leading-relaxed" dangerouslySetInnerHTML={{ __html: variant.description }} />

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button
                                    className="px-8 py-3 rounded-full border border-white text-white font-medium hover:bg-white hover:text-black transition-all uppercase tracking-wider"
                                    onClick={handleEnterSite}
                                >
                                    Buy Now
                                </button>
                                <a
                                    href="https://wa.me/919022166328?text=Hi, I want to buy Pot Mixture"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3 rounded-full bg-[#25D366] text-white font-medium hover:brightness-110 transition-all uppercase tracking-wider flex items-center gap-2"
                                >
                                    <MessageCircle size={20} />
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Center Spacer for Product Visibility */}
                    <div className="col-span-0 md:col-span-4"></div>

                    {/* Right Navigation */}
                    <div className="col-span-12 md:col-span-3 h-full flex flex-col justify-center items-end pointer-events-auto">
                        <div className="flex items-center gap-6">
                            {/* Static 01 / 02 Display */}
                            <div className="flex flex-col items-end gap-2 font-bold text-white/80">
                                <div className="text-6xl text-[var(--accent-gold)]">01</div>
                                <button
                                    onClick={handleEnterSite}
                                    className="text-xl opacity-40 hover:opacity-100 transition-opacity"
                                >
                                    02
                                </button>
                            </div>

                            {/* Nav Arrows (Visual Match) */}
                            <div className="flex flex-col items-center gap-4 text-xs tracking-widest opacity-50">
                                <div className="flex flex-col items-center gap-1">
                                    <ChevronRight size={16} className="-rotate-90" />
                                    PREV
                                </div>
                                <div className="w-[1px] h-12 bg-white/20"></div>
                                <div className="flex flex-col items-center gap-1">
                                    NEXT
                                    <ChevronRight size={16} className="rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Socials & Buy Now - Centered */}
                <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-6 pointer-events-auto z-30">
                    <a
                        href="https://instagram.com/greenary_organic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 transition-transform hover:scale-110 hover:text-[#E1306C]"
                        title="Instagram"
                    >
                        <Instagram size={24} />
                    </a>
                    <a
                        href="https://wa.me/919022166328?text=Hi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 transition-transform hover:scale-110 hover:text-[#25D366]"
                        title="WhatsApp"
                    >
                        <MessageCircle size={24} />
                    </a>
                    <a
                        href="#"
                        className="text-white/60 transition-transform hover:scale-110 hover:text-[#1877F2]"
                        title="Facebook"
                    >
                        <Facebook size={24} />
                    </a>
                    <div className="w-[1px] h-6 bg-white/20 mx-2"></div>
                    <button
                        className="px-6 py-2 rounded-full bg-[var(--accent-gold)] hover:bg-white hover:text-[var(--accent-gold)] transition-colors text-black font-bold flex items-center gap-2 text-sm"
                        onClick={handleEnterSite}
                        title="Buy Now"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Buy Now</span>
                    </button>
                </div>

                {/* Canvas Background (Z-10) */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none mix-blend-screen opacity-90"
                />

                {/* Vignette/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40 z-0 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-0 pointer-events-none" />

                {/* Seamless Transition Overlay - Fades bottom to solid black to merge with next section */}
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-black z-20 pointer-events-none" />
            </div>

            {/* Loading Overlay */}
            {
                !isLoaded && (
                    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center text-white">
                        <div className="text-center">
                            <div className="text-xl font-serif mb-4 tracking-widest">LOADING EXPERIENCE</div>
                            <div className="w-48 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
                                <div className="h-full bg-[var(--accent)] animate-pulse w-1/2"></div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );

}

// Separate component for the Collection Grid to be added below
export function CollectionSection() {
    const products = [
        {
            id: 'vermicompost',
            name: 'VERMICOMPOST',
            price: 50,
            unit: 'per kg',
            image: '/assets/product-showcase.jpg'
        },
        {
            id: 'cow-dung-cakes',
            name: 'COW DUNG CAKES',
            price: 15,
            unit: 'per cake',
            image: '/assets/cow-dung-cakes.jpg'
        },
        {
            id: 'cow-dung-manure',
            name: 'COW DUNG MANURE',
            price: 50,
            unit: 'per kg',
            image: '/assets/cow-dung-manure.jpg'
        },
        {
            id: 'pot-mixture',
            name: 'POT MIXTURE WITH POT',
            price: 200,
            unit: 'per pot',
            image: '/assets/pot-mixture.jpg'
        }
    ];

    return (
        <section className="py-24 px-6 bg-[var(--background)] relative z-10" style={{ marginTop: '-1px' }}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                        Our Collection
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Premium <span className="text-[var(--accent-gold)]">Products</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => {
                        // Dynamic Routing Logic
                        let href = `/product/${product.id}`;
                        if (product.id === 'vermicompost') href = '/main';
                        if (product.id === 'pot-mixture') href = '/';

                        return (
                            <a href={href} key={product.id} className="group block card-premium overflow-hidden bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
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
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
