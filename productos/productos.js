// gestion-productos.js

// Variables globales
let products = [];
console.log("Los products esta aqui");

// Obtener productos desde el backend
async function obtenerProductos() {
    try {
        const response = await axios.get('http://localhost:8080/api/productos');
        products = response.data;
        console.log(products);
        renderizarTabla();
    } catch (error) {
        console.error('Error al obtener productos:', error);
        alert('Error al cargar productos');
    }
}

// Renderizar tabla de productos
function renderizarTabla() {
    const tbody = document.getElementById('tablaProductos');

    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8">No hay productos registrados</td></tr>';
        return;
    }

    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.icon}</td>
            <td>${product.name}</td>
            <td>${product.spec}</td>
            <td>$${product.price}</td>
            <td>${product.cat}</td>
            <td>${product.badge || '-'}</td>
            <td>
                <button onclick="editarProducto(${product.id})">Editar</button>
                <button onclick="eliminarProducto(${product.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();

    // document.getElementById('btnSearchName').addEventListener('click', buscarPorNombre);
    // document.getElementById('btnSearchCat').addEventListener('click', buscarPorCategoria);
    // document.getElementById('btnReset').addEventListener('click', resetearFiltros);
    // document.getElementById('formProducto').addEventListener('submit', guardarProducto);
    // document.getElementById('btnCancelar').addEventListener('click', cancelarEdicion);
});