// Productos
const products = [
    // Laptops
    { id: 1, name: "Laptop Gaming ASUS ROG", description: "Intel i7, 16GB RAM, 512GB SSD, RTX 3060", price: 1299.99, category: "laptops", icon: "🎮" },
    { id: 2, name: "MacBook Air M2", description: "8GB RAM, 256GB SSD, 13.6\" Retina", price: 1199.99, category: "laptops", icon: "💻" },
    { id: 3, name: "Lenovo ThinkPad X1", description: "Intel i5, 16GB RAM, 512GB SSD", price: 999.99, category: "laptops", icon: "💼" },
    // Desktops
    { id: 4, name: "PC Gamer Ultra", description: "Ryzen 7, 32GB RAM, 1TB SSD, RTX 4070", price: 1899.99, category: "desktops", icon: "🖥️" },
    { id: 5, name: "PC Oficina Pro", description: "Intel i5, 16GB RAM, 512GB SSD", price: 699.99, category: "desktops", icon: "🖥️" },
    { id: 6, name: "Mini PC Intel NUC", description: "Intel i3, 8GB RAM, 256GB SSD", price: 449.99, category: "desktops", icon: "📦" },
    // Monitors
    { id: 7, name: "Monitor Samsung 27\"", description: "4K UHD, IPS, 144Hz", price: 349.99, category: "monitors", icon: "🖥️" },
    { id: 8, name: "Monitor LG 24\"", description: "Full HD, 75Hz, FreeSync", price: 149.99, category: "monitors", icon: "📺" },
    { id: 9, name: "Monitor Curvo 32\"", description: "QHD, 165Hz, 1ms", price: 449.99, category: "monitors", icon: "🖥️" },
    // Accessories
    { id: 10, name: "Teclado Mecánico RGB", description: "Switch Blue, iluminación RGB", price: 79.99, category: "accessories", icon: "⌨️" },
    { id: 11, name: "Mouse Gamer Logitech", description: "Wireless, 16000 DPI", price: 49.99, category: "accessories", icon: "🖱️" },
    { id: 12, name: "Audífonos Gaming", description: "7.1 Surround, RGB", price: 89.99, category: "accessories", icon: "🎧" }
];
// Slider images/banners
const slides = [
    { bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", title: "🔥 Laptops Gaming", desc: "Las mejores laptops para gamers y profesionales", category: "laptops" },
    { bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", title: "⚡ Computadoras de Alto Rendimiento", desc: "PCs para diseño, edición y gaming extremo", category: "desktops" },
    { bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", title: "🖥️ Monitores Profesionales", desc: "Calidad 4K, alta frecuencia y curvo", category: "monitors" }
];

let slideActual = 0;
let intervaloSlider;

function cargarBanners() {
    const slider = document.getElementById("slider");

    if (intervaloSlider) {
        clearInterval(intervaloSlider);
    }

    function actualizarSlider() {
        const slide = slides[slideActual];
        slider.innerHTML = `
            <div class="slide p-5 text-center text-white rounded" style="background: ${slide.bg};">
                <div class="slide-content">
                    <h2>${slide.title}</h2>
                    <p>${slide.desc}</p>
                    <a href="#" class="btn btn-light mt-3" data-category="${slide.category}">Ver ${slide.category}</a>
                </div>
            </div>
        `;
        slideActual = (slideActual + 1) % slides.length;
    }

    actualizarSlider();
    intervaloSlider = setInterval(actualizarSlider, 5000);
}

function cargarProductos() {
    const grid = document.getElementById("grid");
    grid.innerHTML = products.map(product => `
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card h-100">
                <div class="card-body text-center">
                    <div style="font-size: 48px;">${product.icon}</div>
                    <h5 class="card-title mt-2">${product.name}</h5>
                    <p class="card-text small">${product.description}</p>
                    <p class="text-success fw-bold fs-4">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary w-100" data-id="${product.id}">Agregar al Carrito 🛒</button>
                </div>
            </div>
        </div>
    `).join("");
}

// iniciar ejecucion
cargarProductos();
cargarBanners();
