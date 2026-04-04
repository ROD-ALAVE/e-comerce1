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

function cargarBanners() {
    const slider = document.getElementById("slider");
    slider.innerHTML = slides.map(slide => `
        <div class="slide" data-slide="${slide.category}">
            <div class="slide-content">
                <h2>${slide.title}</h2>
                <p>${slide.desc}</p>
                <a href="#" class="slide-btn" data-category="${slide.category}">Ver ${slide.category}</a>
            </div>
        </div>
    `).join("");
}

function cargarProductos() {
    const grid = document.getElementById("grid");
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
            </div>
        </div>
    `).join("");
}

// iniciar ejecucion
cargarProductos();
cargarBanners();
