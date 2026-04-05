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

document.addEventListener('DOMContentLoaded', async () => {
    products1 = await obtenerProductos();
    console.log(products1);
    renderizarProductos(products1);
});

function renderizarProductos(productos) {
    const productosLista = document.getElementById('productos-lista');
    const loadingMessage = document.getElementById('loading-message');

    // Ocultar mensaje de carga
    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }

    // Limpiar el contenedor
    productosLista.innerHTML = '';

    // Verificar si hay productos
    if (!productos || productos.length === 0) {
        productosLista.innerHTML = '<p>No hay productos disponibles.</p>';
        return;
    }

    // Recorrer y renderizar cada producto
    productos.forEach(producto => {
        // Crear contenedor del producto
        const productoDiv = document.createElement('div');

        // Agregar el HTML del producto
        productoDiv.innerHTML = `
            <h3>${producto.icon ? producto.icon + ' ' : '📦 '}${producto.name || 'Producto sin nombre'}</h3>
            <p><strong>ID:</strong> ${producto.id || 'N/A'}</p>
            <p><strong>Especificaciones:</strong> ${producto.spec || 'Sin especificaciones'}</p>
            <p><strong>Precio:</strong> $${producto.price ? producto.price.toFixed(2) : '0.00'}</p>
            <p><strong>Categoría:</strong> ${producto.cat || 'Sin categoría'}</p>
            ${producto.badge ? `<p><strong>Etiqueta:</strong> ${producto.badge}</p>` : ''}
            <form onsubmit="agregarAlCarrito(event, ${producto.id})">
                <label for="cantidad-${producto.id}">Cantidad:</label>
                <input type="number" id="cantidad-${producto.id}" name="cantidad" value="1" min="1">
                <button type="submit">Agregar al carrito</button>
            </form>
            <hr>
        `;

        // Agregar al contenedor principal
        productosLista.appendChild(productoDiv);
    });
}
