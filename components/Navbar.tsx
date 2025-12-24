'use client';

import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const links = [
    { name: 'Benefits', href: '#benefits' },
    { name: 'How to Use', href: '#how-to-use' },
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
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-opacity-80 transition-colors duration-500"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="text-xl font-bold tracking-wider text-brand-green dark:text-brand-light flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-brand-dark font-serif font-black">
                        G
                    </div>
                    <span>GREENARY ORGANICS</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors dark:text-gray-300"
                        >
                            {link.name}
                        </a>
                    ))}

                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden bg-brand-light dark:bg-brand-dark absolute top-full left-0 right-0 border-b border-white/10"
                >
                    <div className="flex flex-col p-6 gap-4">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium hover:text-brand-gold"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
