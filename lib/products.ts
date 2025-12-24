export interface Product {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    themeColor: string; // Hex for accent
    secondaryColor: string; // Hex for secondary accent
    frames: string[]; // List of URLs for the sequence
}

// Placeholder: Using the single available signed URL for all frames in the mockup
const MOCK_FRAME_URL = "https://esmdbjbvjrzoxbzjkuha.supabase.co/storage/v1/object/sign/Product%20Front%201/farmm/frame_000_delay-0.04s.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZTBiOWEzNy02MTMyLTQyYzgtYTM0Mi0xMTg5ZDM2ODdiOWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQcm9kdWN0IEZyb250IDEvZmFybW0vZnJhbWVfMDAwX2RlbGF5LTAuMDRzLndlYnAiLCJpYXQiOjE3NjY1NjY3MjEsImV4cCI6MTc5ODEwMjcyMX0.C4XMhyqYE4O65HO4k4I2FuBMwH_5D72fZgxXjMRxASg";

// Create a mock sequence of 240 frames (all same image for now)
const generateMockFrames = (count: number) => Array(count).fill(MOCK_FRAME_URL);

export const products: Product[] = [
    {
        id: "01",
        name: "VERMICOMPOST",
        subtitle: "100% NATURAL • ORGANIC FERTILIZER",
        description: "A nutrient-rich organic manure produced using earthworms. It improves soil structure, fertility, and crop productivity naturally. Where Soil Meets Sustainability.",
        themeColor: "#1b4332", // Forest Green
        secondaryColor: "#d4af37", // Gold
        frames: generateMockFrames(240),
    },
    {
        id: "02",
        name: "BULK PACK",
        subtitle: "5KG FARM SAVER",
        description: "Ideal for larger home gardens and small farms. The same premium quality in a value-sized pack for extended nutrition.",
        themeColor: "#d4af37", // Gold/Earth
        secondaryColor: "#1b4332",
        frames: generateMockFrames(240),
    },
    {
        id: "03",
        name: "POT POTTING MIX",
        subtitle: "READY TO USE BLEND",
        description: "A perfect blend of coco peat, vermicompost, and red soil. Ready-to-use mixture for your pots and planters.",
        themeColor: "#8c6b48", // Earthy Brown
        secondaryColor: "#74c69d",
        frames: generateMockFrames(240),
    },
];
