import { create } from 'zustand';
import { products, Product } from '@/lib/products';

interface AppState {
    currentProductIndex: number;
    currentProduct: Product;
    isDarkMode: boolean;
    isLoading: boolean;

    nextProduct: () => void;
    prevProduct: () => void;
    setProductIndex: (index: number) => void;
    toggleDarkMode: () => void;
    setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
    currentProductIndex: 0,
    currentProduct: products[0],
    isDarkMode: true,
    isLoading: true,

    nextProduct: () => {
        const { currentProductIndex } = get();
        const nextIndex = (currentProductIndex + 1) % products.length;
        set({
            currentProductIndex: nextIndex,
            currentProduct: products[nextIndex]
        });
    },

    prevProduct: () => {
        const { currentProductIndex } = get();
        const prevIndex = (currentProductIndex - 1 + products.length) % products.length;
        set({
            currentProductIndex: prevIndex,
            currentProduct: products[prevIndex]
        });
    },

    setProductIndex: (index) => {
        if (index >= 0 && index < products.length) {
            set({
                currentProductIndex: index,
                currentProduct: products[index]
            });
        }
    },

    toggleDarkMode: () => {
        set((state) => {
            const newMode = !state.isDarkMode;
            if (typeof document !== 'undefined') {
                if (newMode) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
            return { isDarkMode: newMode };
        });
    },

    setLoading: (loading) => set({ isLoading: loading }),
}));
