// Ejemplo de un producto individual
const producto = {
    id: 1,
    name: "Laptop Lenovo IdeaPad 3",
    spec: "Ryzen 5 · 8GB RAM · 512GB SSD",
    price: 3850,
    cat: "Laptops",
    icon: "💻",
    badge: "hot"
};
const products = [
    { id: 1, name: "Laptop Lenovo IdeaPad 3", spec: "Ryzen 5 · 8GB RAM · 512GB SSD", price: 3850, cat: "Laptops", icon: "💻", badge: "hot" },
    { id: 2, name: "Laptop HP Pavilion 15", spec: "Intel i5 · 16GB RAM · 1TB SSD", price: 4200, cat: "Laptops", icon: "💻", badge: "new" },
    { id: 3, name: 'Monitor LG 24" Full HD', spec: "1920x1080 · 75Hz · IPS", price: 1250, cat: "Monitores", icon: "🖥️", badge: "" },
    { id: 4, name: 'Monitor Samsung 27" QHD', spec: "2560x1440 · 144Hz · VA", price: 2100, cat: "Monitores", icon: "🖥️", badge: "sale" },
    { id: 5, name: "Teclado Mecánico Redragon", spec: "Switch Red · RGB · TKL", price: 380, cat: "Periféricos", icon: "⌨️", badge: "hot" },
    { id: 6, name: "Mouse Logitech MX Master 3", spec: "7 botones · 4000 DPI · Inalámbrico", price: 520, cat: "Periféricos", icon: "🖱️", badge: "" },
    { id: 7, name: "Disco SSD Samsung 1TB", spec: "NVMe M.2 · 3500 MB/s lectura", price: 580, cat: "Almacenamiento", icon: "💾", badge: "new" },
    { id: 8, name: "HDD Seagate 2TB", spec: '7200 RPM · SATA III · 3.5"', price: 320, cat: "Almacenamiento", icon: "💾", badge: "" },
    { id: 9, name: "Tarjeta Gráfica RTX 3060", spec: "12GB GDDR6 · DLSS · Ray Tracing", price: 3400, cat: "Componentes", icon: "🎮", badge: "hot" },
    { id: 10, name: "Procesador AMD Ryzen 7", spec: "8 núcleos · 4.7GHz · AM4", price: 1800, cat: "Componentes", icon: "⚙️", badge: "new" },
    { id: 11, name: "RAM Corsair 16GB DDR4", spec: "3200MHz · CL16 · Kit 2x8GB", price: 420, cat: "Componentes", icon: "🔩", badge: "sale" },
    { id: 12, name: "Webcam Logitech C920", spec: "1080p · 30fps · Micrófono dual", price: 480, cat: "Periféricos", icon: "📷", badge: "" },
];

const cats = ["Todos", ...new Set(products.map(p => p.cat))];
let cart = [];
let activecat = "Todos";
let searchq = "";

// Tu variable global
let products1 = [];

// Función para obtener productos
async function obtenerProductos() {
    try {
        const response = await axios.get('http://localhost:8080/api/productos');
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudieron cargar los productos');
        return [];
    }
}

// Tu función para mostrar productos (ajústala a tu código)
// function renderizarProductos() {
//     const contenedor = document.getElementById('grid');
//     if (!contenedor) return;

//     contenedor.innerHTML = products.map(product => `
//         <div class="product-card">
//             <div class="product-image">${product.icon}</div>
//             <h3>${product.name}</h3>
//             <p>${product.spec}</p>
//             <p class="price">$${product.price}</p>
//             <button>Agregar al carrito</button>
//         </div>
//     `).join('');
// }

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', async () => {
    products1 = await obtenerProductos();
    console.log(products1);

    // renderizarProductos();
});

// ── Render categories ──
function renderCats() {
    document.getElementById("cats").innerHTML = cats.map(c =>
        `<div class="cat${c === activecat ? " active" : ""}" onclick="setCat('${c}')">${c}</div>`
    ).join("");
}

function setCat(c) { activecat = c; renderCats(); renderGrid(); }

function filterSearch(v) { searchq = v.toLowerCase(); renderGrid(); }

// ── Render product grid ──
function renderGrid() {
    const filtered = products.filter(p => {
        const matchCat = activecat === "Todos" || p.cat === activecat;
        const matchQ = p.name.toLowerCase().includes(searchq) || p.spec.toLowerCase().includes(searchq);
        return matchCat && matchQ;
    });

    const el = document.getElementById("grid");

    if (!filtered.length) {
        el.innerHTML = `<div class="empty-msg">No se encontraron productos para "<strong>${searchq}</strong>".</div>`;
        return;
    }

    el.innerHTML = filtered.map(p => {
        const inCart = cart.find(c => c.id === p.id);
        const badgeHTML = p.badge
            ? `<div class="badge ${p.badge}">${p.badge === "new" ? "Nuevo" : p.badge === "hot" ? "Popular" : "Oferta"}</div>`
            : "";
        const oldPrice = p.badge === "sale"
            ? `<div class="price-old">Bs. ${Math.round(p.price * 1.15).toLocaleString()}</div>`
            : "";
        return `
        <div class="card">
          <div class="img-box">${p.icon}</div>
          ${badgeHTML}
          <div class="pname">${p.name}</div>
          <div class="pspec">${p.spec}</div>
          <div class="price-row">
            <div>
              <div class="price">Bs. ${p.price.toLocaleString()}</div>
              ${oldPrice}
            </div>
            <button class="add-btn${inCart ? " added" : ""}" onclick="addToCart(${p.id})">
              ${inCart ? "✓ Añadido" : "+ Añadir"}
            </button>
          </div>
        </div>`;
    }).join("");
}

// ── Cart logic ──
function addToCart(id) {
    const p = products.find(x => x.id === id);
    if (!cart.find(c => c.id === id)) {
        cart.push({ ...p });
        showToast(`${p.icon} ${p.name} añadido al carrito`);
    }
    updateCart();
    renderGrid();
}

function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    updateCart();
    renderGrid();
}

function updateCart() {
    document.getElementById("cart-count").textContent = cart.length;
    const total = cart.reduce((s, p) => s + p.price, 0);
    document.getElementById("total-price").textContent = "Bs. " + total.toLocaleString();

    const el = document.getElementById("cart-items");
    if (!cart.length) {
        el.innerHTML = `<div class="cart-empty">Tu carrito está vacío 🛒</div>`;
        return;
    }
    el.innerHTML = cart.map(p => `
      <div class="cart-item">
        <div class="ci-icon">${p.icon}</div>
        <div>
          <div class="ci-name">${p.name}</div>
          <div class="ci-price">Bs. ${p.price.toLocaleString()}</div>
        </div>
        <button class="ci-rm" onclick="removeFromCart(${p.id})" title="Quitar">✕</button>
      </div>`).join("");
}

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("open");
}

function checkout() {
    if (!cart.length) { showToast("Tu carrito está vacío"); return; }
    const total = cart.reduce((s, p) => s + p.price, 0);
    const items = cart.map(p => `  • ${p.name} — Bs. ${p.price.toLocaleString()}`).join("\n");
    alert(`✅ ¡Pedido confirmado!\n\n${items}\n\nTotal: Bs. ${total.toLocaleString()}\n\nGracias por tu compra en TechZone Bolivia 🎉`);
    cart = [];
    updateCart();
    renderGrid();
    toggleCart();
}

// ── Toast ──
function showToast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2500);
}

// ── Init ──
renderCats();
renderGrid();
updateCart();

// Animate sold counter
let sold = 284;
setInterval(() => {
    if (Math.random() < 0.3) {
        sold++;
        const el = document.getElementById("s-sold");
        if (el) el.textContent = sold;
    }
}, 4000);
