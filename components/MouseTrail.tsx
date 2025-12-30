"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    life: number;
}

export default function MouseTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let hue = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticle = (x: number, y: number) => {
            // Natural/Earth colors: Browns, Greens, Golds
            const colors = [
                `hsla(34, 40%, 50%, ${Math.random()})`, // Brownish
                `hsla(100, 40%, 50%, ${Math.random()})`, // Greenish
                `hsla(45, 80%, 60%, ${Math.random()})`   // Gold
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];

            particles.push({
                x,
                y,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1, // Float gently
                color: color,
                life: 1.0,
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;
                p.life -= 0.02; // Fade out
                p.size *= 0.95; // Shrink

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }

            // hue += 0.5; // Cycle hue if we wanted rainbow
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Add multiple particles for trail density
            for (let i = 0; i < 3; i++) {
                createParticle(e.x, e.y);
            }
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
        />
    );
}
