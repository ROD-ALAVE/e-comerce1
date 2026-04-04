# e-comerce1
Se comparte los ejemplos del e-comerce de la primera clase.
# Análisis Técnico del Proyecto E-commerce

## 1. Análisis de la Estructura del Proyecto

El proyecto está organizado como una evolución de versiones, lo que sugiere un proceso de aprendizaje o prototipado incremental:

### Raíz (e-comerce1)
Contiene la versión principal y funcional del proyecto:

- **index.html**: Define la estructura ósea del sitio.
- **index.css**: Contiene todo el diseño visual, desde la paleta de colores hasta las animaciones de los productos.
- **index.js**: Gestiona la lógica dinámica (datos de productos, carrito de compras, filtros y buscador).

### Subdirectorios de Versiones
- **e-comerce2/** y **e-comerce3/**: Variaciones que probablemente exploran diferentes diseños o estructuras de archivos.
- **e-comerce-bootstrap/**: Una versión que utiliza el framework Bootstrap para el diseño responsivo.

---

## 2. Propósito del Proyecto

El objetivo principal es una **Landing Page de E-commerce** especializada en tecnología (**TechZone Bolivia**). Sus funciones clave son:

| Función | Descripción |
|---------|-------------|
| **Catálogo Dinámico** | Muestra productos con nombre, especificaciones, precio e iconos representativos. |
| **Sistema de Carrito** | Permite añadir/quitar productos y calcula el total automáticamente. |
| **Filtros y Búsqueda** | Permite filtrar por categorías (Laptops, Monitores, etc.) y buscar por texto en tiempo real. |
| **Confirmación de Compra** | Simula un proceso de pago mediante una alerta con el resumen del pedido. |

---

## 3. Etiquetas HTML más frecuentes y su uso

A continuación, detallo las etiquetas que más se utilizan en tu código y la función que cumplen en este contexto:

| Etiqueta | Frecuencia | Propósito en el Proyecto |
|----------|------------|--------------------------|
| `<div>` | Alta | Es la etiqueta más usada. Se emplea como contenedor para las "tarjetas" de productos, la cuadrícula (grid), el panel del carrito y las filas de precios. |
| `<button>` | Media | Gestiona todas las interacciones: añadir al carrito, abrir/cerrar el panel lateral y confirmar la compra. |
| `<span>` | Media | Se utiliza para piezas pequeñas de texto que necesitan estilo propio, como el contador del carrito (`cart-count`) o el logo (`Tech<span>Zone</span>`). |
| `<header>` | Baja | Define la sección superior que contiene el logo, la barra de búsqueda y el acceso al carrito. |
| `<main>` | Baja | Actúa como el contenedor principal de la tienda, donde reside la cuadrícula de productos. |
| `<input>` | Baja | Específicamente el tipo `text` para la barra de búsqueda que activa la función `filterSearch`. |
| `<svg>` | Baja | Usado para renderizar el icono del carrito de forma escalable y nítida. |
| `<hero>` | Baja | (Etiqueta personalizada) Define la sección de impacto visual al inicio de la página. |
| `<script>` | Baja | Conecta el archivo `index.js` para dar vida a la funcionalidad del sitio. |

---

## 4. Observaciones Técnicas

- **Manipulación del DOM**: Tu proyecto hace un uso intensivo de JavaScript para generar HTML dinámicamente (usando `.map()` en `index.js`), lo que reduce la carga de etiquetas manuales en el `index.html`.

- **Diseño**: Utilizas CSS moderno con Flexbox y Grid para mantener la interfaz limpia y organizada.
