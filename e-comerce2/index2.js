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

let cart = [];
let currentCategory = "all";
let currentSearch = "";
let currentSlide = 0;
let slideInterval;

// Slider images/banners
const slides = [
    { bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", title: "🔥 Laptops Gaming", desc: "Las mejores laptops para gamers y profesionales", category: "laptops" },
    { bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", title: "⚡ Computadoras de Alto Rendimiento", desc: "PCs para diseño, edición y gaming extremo", category: "desktops" },
    { bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", title: "🖥️ Monitores Profesionales", desc: "Calidad 4K, alta frecuencia y curvo", category: "monitors" }
];

// Initialize slider
function initSlider() {
    const sliderContainer = document.getElementById("slider");
    const slidesHtml = slides.map((slide, index) => `
                <div class="slide ${index === 0 ? 'active' : ''}" style="background: ${slide.bg}">
                    <div class="slide-content">
                        <h2>${slide.title}</h2>
                        <p>${slide.desc}</p>
                        <a href="#" class="slide-btn" data-category="${slide.category}">Ver ${slide.category === "laptops" ? "Laptops" : slide.category === "desktops" ? "Computadoras" : "Monitores"}</a>
                    </div>
                </div>
            `).join("");

    const dotsHtml = slides.map((_, index) => `
                <div class="dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>
            `).join("");

    sliderContainer.innerHTML = slidesHtml + `<div class="dots">${dotsHtml}</div>`;

    // Add dot click handlers
    document.querySelectorAll(".dot").forEach(dot => {
        dot.addEventListener("click", () => {
            goToSlide(parseInt(dot.dataset.slide));
        });
    });

    // Add slide button handlers
    document.querySelectorAll(".slide-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const category = btn.dataset.category;
            document.querySelector(`.category-btn[data-category="${category}"]`).click();
        });
    });

    // Start auto-slide
    startAutoSlide();
}

function goToSlide(index) {
    const slidesElements = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    slidesElements[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = index;

    slidesElements[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

function nextSlide() {
    let next = currentSlide + 1;
    if (next >= slides.length) next = 0;
    goToSlide(next);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Filter products by category and search
function filterProducts() {
    let filtered = products;

    // Filter by category
    if (currentCategory !== "all") {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Filter by search term
    if (currentSearch.trim() !== "") {
        const searchLower = currentSearch.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );
    }

    return filtered;
}

// Render products
function renderProducts() {
    const filtered = filterProducts();
    const grid = document.getElementById("productsGrid");

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="no-results">🔍 No se encontraron productos "${currentSearch}"</div>`;
        return;
    }

    grid.innerHTML = filtered.map(product => `
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

    // Add event listeners to buttons
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });
}

// Search function
function performSearch() {
    const searchInput = document.getElementById("searchInput");
    currentSearch = searchInput.value;
    renderProducts();
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`${product.name} agregado al carrito`);
}

// Update cart UI
function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = count;

    // Update modal
    const cartItemsDiv = document.getElementById("cartItems");
    if (cartItemsDiv) {
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = "<p style='text-align:center; padding: 2rem;'>Tu carrito está vacío</p>";
        } else {
            cartItemsDiv.innerHTML = cart.map(item => `
                        <div class="cart-item">
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <p class="cart-item-price">$${item.price.toFixed(2)} c/u</p>
                            </div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                                <button class="quantity-btn" onclick="removeItem(${item.id})" style="background-color:#ff6b6b; color:white;">✕</button>
                            </div>
                        </div>
                    `).join("");
        }
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartTotalDiv = document.getElementById("cartTotal");
    if (cartTotalDiv) {
        cartTotalDiv.innerHTML = `Total: $${total.toFixed(2)}`;
    }
}

// Update quantity
window.updateQuantity = function (productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        updateCartUI();
    }
}

// Remove item
window.removeItem = function (productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCartUI();
    showToast("Producto eliminado del carrito");
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showToast("Tu carrito está vacío");
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = cart.map(item => `${item.name} x${item.quantity}`).join("\n");

    alert(`🛒 RESUMEN DE COMPRA\n\n${itemsList}\n\n💰 Total: $${total.toFixed(2)}\n\n¡Gracias por tu compra! Te contactaremos pronto.`);

    cart = [];
    updateCartUI();
    document.getElementById("cartModal").classList.remove("active");
    showToast("¡Compra realizada con éxito!");
}

// Modal handlers
document.getElementById("cartIcon").addEventListener("click", () => {
    updateCartUI();
    document.getElementById("cartModal").classList.add("active");
});

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("cartModal").classList.remove("active");
});

document.getElementById("checkoutBtn").addEventListener("click", checkout);

// Close modal on outside click
window.addEventListener("click", (e) => {
    const modal = document.getElementById("cartModal");
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// Category filters
document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.dataset.category;
        renderProducts();
    });
});

// Search handlers
document.getElementById("searchBtn").addEventListener("click", performSearch);
document.getElementById("searchInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") performSearch();
});

// Logo click to reset filters
document.querySelector(".logo").addEventListener("click", () => {
    currentCategory = "all";
    currentSearch = "";
    document.getElementById("searchInput").value = "";
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    document.querySelector('.category-btn[data-category="all"]').classList.add("active");
    renderProducts();
});

// Initial render
initSlider();
renderProducts();