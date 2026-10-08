const app = document.querySelector('#app'); // Selecciona el elemento con id "app" del DOM
app.classList.add ('productos');

function createCard(producto) // Función para crear una tarjeta de producto
{
    const card = document.createElement('article'); // Crea un elemento <article> para la tarjeta del producto
    card.classList.add('card');
    card.dataset.id = producto.id; // Asigna el id del producto como un atributo de datos al elemento card

    const hayStock = producto.stock > 0;
    card.innerHTML = `
        <div class="card__body">
            <span class="card__categoria">${producto.categoria}</span>
            <h2 class="card__titulo">${producto.nombre}</h2>
            <p class="card__descripcion">${producto.descripcion}</p>
            <p class="card__precio">$${producto.precio.toLocaleString('es-AR')}</p>
            <p class="card__stock">${hayStock ? `Stock: ${producto.stock}` : 'Sin stock'}</p>
            <button class="card__btn" ${hayStock ? '' : 'disabled'}>
                ${hayStock ? 'Agregar al carrito' : 'No disponible'}
            </button>
        </div>
        `;
        if (!hayStock) card.classList.add('card--sin-stock'); // Agrega una clase adicional si no hay stock

return card;                
}

// Función para obtener los productos desde el backend
fetch('http://localhost:3000/api/productos') // Realiza una solicitud GET al endpoint del backend
    .then(response => response.json()) // Convierte la respuesta en formato JSON
    .then(productos => { // Maneja los datos de productos obtenidos
        productos.forEach(producto => {
            const card = createCard(producto); // Arma la tarjeta con la función de arriba
            app.appendChild(card); // La agrega dentro del #app
        });
    });