'use client';

import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';

const links = [
    { name: 'Products', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const { isDarkMode, toggleDarkMode } = useStore();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[var(--accent-gold)]">
                            <img
                                src="/assets/logo.jpg"
                                alt="Greenary"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-bold text-sm tracking-wide">
                            GREENARY
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors rounded-full hover:bg-[var(--surface-hover)]"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full hover:bg-[var(--surface-hover)] transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <a
                            href="#products"
                            className="hidden md:inline-flex px-5 py-2 text-sm font-medium bg-[var(--accent)] text-white rounded-full hover:bg-[var(--accent-gold)] hover:text-black transition-all"
                        >
                            Shop Now
                        </a>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden mt-3 mx-4 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl"
                >
                    <div className="flex flex-col gap-1">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-3 text-sm font-medium rounded-xl hover:bg-[var(--surface-hover)] transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#products"
                            onClick={() => setIsOpen(false)}
                            className="mt-2 px-4 py-3 text-sm font-medium text-center bg-[var(--accent)] text-white rounded-xl"
                        >
                            Shop Now
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
