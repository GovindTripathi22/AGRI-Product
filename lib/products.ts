export interface Product {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    themeColor: string;
    secondaryColor: string;
    frames: string[];
    price: number;
    unit: string;
    image: string;
    benefits: string[];
}

const generateFrames = (dir: string, count: number) => {
    return Array.from({ length: count }, (_, i) => {
        const padIndex = String(i).padStart(3, '0');
        return `/${dir}/frame_${padIndex}_delay-0.04s.webp`;
    });
};

export const products: Product[] = [
    {
        id: 'vermicompost',
        name: 'VERMICOMPOST',
        subtitle: '100% NATURAL • ORGANIC FERTILIZER',
        description: 'Greenary Organics Vermicompost is a nutrient-rich organic manure produced using earthworms. It improves soil structure, fertility, and crop productivity naturally.',
        themeColor: '#d4a53c',
        secondaryColor: '#1b4332',
        frames: generateFrames('frames', 192),
        price: 50,
        unit: 'per kg',
        image: '/assets/product-showcase.jpg',
        benefits: [
            'Improves soil aeration and texture',
            'Enhances water retention capacity',
            'Rich in beneficial microorganisms',
            'Promotes faster root growth'
        ]
    },
    {
        id: 'cow-dung-cakes',
        name: 'COW DUNG CAKES',
        subtitle: 'PURE • TRADITIONAL • NATURAL',
        description: 'Pure and natural Cow Dung Cakes, traditionally used for Hawan, Pooja, and as a natural fuel. Can also be used as a potent organic fertilizer when broken down.',
        themeColor: '#8c6b48',
        secondaryColor: '#1b4332',
        frames: generateFrames('frames', 192),
        price: 15,
        unit: 'per cake',
        image: '/assets/cow-dung-cakes.jpg',
        benefits: [
            '100% natural and sun-dried',
            'Ideal for religious ceremonies',
            'Eco-friendly fuel source',
            'Rich source of organic matter'
        ]
    },
    {
        id: 'cow-dung-manure',
        name: 'COW DUNG MANURE',
        subtitle: 'AGED • DECOMPOSED • POTENT',
        description: 'Aged and decomposed Cow Dung Manure, perfect for vegetable gardening and flowering plants. It provides a balanced supply of Nitrogen, Phosphorus, and Potassium.',
        themeColor: '#4CAF50',
        secondaryColor: '#1b4332',
        frames: generateFrames('frames', 192),
        price: 50,
        unit: 'per kg',
        image: '/assets/cow-dung-manure.jpg',
        benefits: [
            'High nitrogen content for lush growth',
            'Fully decomposed and odor-free',
            'Improves soil fertility instantly',
            'Suitable for all home gardens'
        ]
    },
    {
        id: 'pot-mixture',
        name: 'POT MIXTURE WITH POT',
        subtitle: 'READY TO USE BLEND',
        description: 'Ready-to-use Potting Mix that comes with a premium pot. A balanced blend of soil, cocopeat, vermicompost, and essential nutrients for hassle-free gardening.',
        themeColor: '#d4a53c',
        secondaryColor: '#1b4332',
        frames: generateFrames('frames', 192),
        price: 200,
        unit: 'per pot',
        image: '/assets/pot-mixture.jpg',
        benefits: [
            'Ready to use - just add plants',
            'Balanced pH and nutrition',
            'Includes high-quality pot',
            'Excellent drainage provided'
        ]
    }
];
