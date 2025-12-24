/**
 * Greenary Organics - Premium Parallax Engine
 * Scroll-controlled WebP sequence animation with multi-variant support
 * Using LOCAL frame files for optimal performance
 */

// ===================================
// Configuration
// ===================================
const config = {
    products: [
        {
            name: "VERMICOMPOST",
            subtitle: "100% Natural • Organic Fertilizer",
            description: "A nutrient-rich organic manure produced using earthworms. It improves soil structure, fertility, and crop productivity naturally. Where Soil Meets Sustainability.",
            themeColor: "#d4a53c",
            mode: "dark",
            // Local frame directory
            frameDir: "frames",
            frameCount: 192 // 0-191
        },
        {
            name: "BULK PACK",
            subtitle: "5KG Farm Saver",
            description: "Go big with our 5Kg Bulk Pack. Ideal for larger gardens and small farms. All the organic goodness, now in a value-size pack for serious growers.",
            themeColor: "#4CAF50",
            mode: "dark",
            frameDir: "frames",
            frameCount: 192
        }
    ],
    currentVariant: 0,
};

// ===================================
// DOM Elements
// ===================================
const canvas = document.getElementById('parallax-canvas');
const ctx = canvas.getContext('2d');
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const percentText = document.getElementById('loading-percent');
const heroOverlay = document.querySelector('.hero-overlay');
const scrollPrompt = document.querySelector('.scroll-prompt');
const heroSocial = document.querySelector('.hero-social-bottom');

const elName = document.getElementById('product-name');
const elSubtitle = document.getElementById('product-subtitle');
const elDesc = document.getElementById('product-description');
const elIndex = document.getElementById('variant-index');
const elThemeToggle = document.getElementById('theme-toggle');
const elVariantLoader = document.getElementById('variant-loader');
const root = document.documentElement;

// ===================================
// State
// ===================================
let images = [];
let imagesLoaded = 0;
let totalImages = 0;
let currentFrameIndex = 0;
let isLoading = true;
let rafId = null;

// ===================================
// Canvas Setup
// ===================================
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (images[currentFrameIndex]) {
        renderFrame(currentFrameIndex);
    }
}

window.addEventListener('resize', resizeCanvas);

// ===================================
// Frame URL Generator (LOCAL)
// ===================================
function getFrameUrl(frameDir, index) {
    const padIndex = String(index).padStart(3, '0');
    return `${frameDir}/frame_${padIndex}_delay-0.04s.webp`;
}

// ===================================
// Image Preloading
// ===================================
async function preloadImages(variantIndex, showFullLoader = true) {
    const product = config.products[variantIndex];
    images = [];
    imagesLoaded = 0;
    totalImages = product.frameCount;

    if (showFullLoader) {
        progressBar.style.width = '0%';
        percentText.textContent = '0%';
        loadingScreen.classList.remove('hidden');
    } else {
        elVariantLoader.classList.add('visible');
    }

    // Create all image load promises
    const loadPromises = [];

    for (let i = 0; i < totalImages; i++) {
        const promise = new Promise((resolve) => {
            const img = new Image();

            img.onload = () => {
                images[i] = img;
                imagesLoaded++;
                const percent = Math.round((imagesLoaded / totalImages) * 100);

                if (showFullLoader) {
                    progressBar.style.width = `${percent}%`;
                    percentText.textContent = `${percent}%`;
                }
                resolve();
            };

            img.onerror = () => {
                console.warn(`Failed to load frame ${i}`);
                imagesLoaded++;
                const percent = Math.round((imagesLoaded / totalImages) * 100);
                if (showFullLoader) {
                    progressBar.style.width = `${percent}%`;
                    percentText.textContent = `${percent}%`;
                }
                resolve();
            };

            img.src = getFrameUrl(product.frameDir, i);
        });

        loadPromises.push(promise);
    }

    await Promise.all(loadPromises);

    // Hide loader
    if (showFullLoader) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            isLoading = false;
            resizeCanvas();
        }, 400);
    } else {
        elVariantLoader.classList.remove('visible');
        resizeCanvas();
    }
}

// ===================================
// Frame Rendering
// ===================================
function renderFrame(index) {
    const img = images[index];
    if (!img) return;

    // Cover-style drawing
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = img.width * (canvas.height / img.height);
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    } else {
        drawWidth = canvas.width;
        drawHeight = img.height * (canvas.width / img.width);
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

// ===================================
// Scroll Handler
// ===================================
function onScroll() {
    if (isLoading) return;

    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight * 2.5; // 2.5 viewports for animation
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    const product = config.products[config.currentVariant];
    const frameIndex = Math.floor(progress * (product.frameCount - 1));

    if (frameIndex !== currentFrameIndex && images[frameIndex]) {
        currentFrameIndex = frameIndex;
        renderFrame(currentFrameIndex);
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide hero overlay when scrolling into content
    const contentStart = window.innerHeight * 2;
    if (scrollY > contentStart) {
        heroOverlay.classList.add('hidden');
        if (scrollPrompt) scrollPrompt.style.opacity = '0';
        if (heroSocial) heroSocial.style.opacity = '0';
    } else {
        heroOverlay.classList.remove('hidden');
        if (scrollPrompt) scrollPrompt.style.opacity = '1';
        if (heroSocial) heroSocial.style.opacity = '1';
    }
}

window.addEventListener('scroll', () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(onScroll);
}, { passive: true });

// ===================================
// UI Updates
// ===================================
function updateProductUI(variantIndex) {
    const product = config.products[variantIndex];

    // Fade out
    [elName, elSubtitle, elDesc].forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
    });

    setTimeout(() => {
        elName.textContent = product.name;
        elSubtitle.textContent = product.subtitle;
        elDesc.textContent = product.description;
        elIndex.textContent = String(variantIndex + 1).padStart(2, '0');

        // Update accent color
        root.style.setProperty('--accent', product.themeColor);

        // Fade in
        [elName, elSubtitle, elDesc].forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, i * 100);
        });
    }, 400);
}

// ===================================
// Variant Switching
// ===================================
async function switchVariant(direction) {
    let newIndex = config.currentVariant + direction;
    if (newIndex < 0) newIndex = config.products.length - 1;
    if (newIndex >= config.products.length) newIndex = 0;

    config.currentVariant = newIndex;
    updateProductUI(newIndex);

    // For variants with same frames, just update UI. 
    // If different frame sets, uncomment:
    // await preloadImages(newIndex, false);

    renderFrame(currentFrameIndex);
}

// ===================================
// Theme Toggle
// ===================================
function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
    }
}

// ===================================
// Smooth Scroll for Nav Links
// ===================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===================================
// Event Listeners
// ===================================
document.getElementById('prev-btn').addEventListener('click', () => switchVariant(-1));
document.getElementById('next-btn').addEventListener('click', () => switchVariant(1));
elThemeToggle.addEventListener('click', toggleTheme);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') switchVariant(-1);
    if (e.key === 'ArrowRight') switchVariant(1);
});

// ===================================
// Initialization
// ===================================
(async function init() {
    loadSavedTheme();
    resizeCanvas();
    await preloadImages(0, true);
})();
