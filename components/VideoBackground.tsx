"use client";

import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
    src: string;
    poster?: string;
    opacity?: number;
    className?: string; // Allow valid Tailwind classes including margins
}

export default function VideoBackground({ src, poster, opacity = 0.5, className = "" }: VideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8; // Slow motion effect
        }
    }, []);

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                poster={poster}
                className="absolute w-full h-full object-cover"
                style={{ opacity }}
            >
                <source src={src} type="video/mp4" />
                {/* Fallback for safety */}
                <div className="absolute inset-0 bg-black/50" />
            </video>
            {/* Texture/Overlay to make it blend */}
            <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
        </div>
    );
}
