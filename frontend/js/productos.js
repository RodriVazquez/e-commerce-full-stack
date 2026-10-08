const app = document.querySelector('#app'); // Selecciona el elemento con id "app" del DOM

// Función para obtener los productos desde el backend
fetch('http://localhost:3000/api/productos') // Realiza una solicitud GET al endpoint del backend
    .then(response => response.json()) // Convierte la respuesta en formato JSON
    .then(productos => { // Maneja los datos de productos obtenidos
        productos.forEach(producto => { 
            const productoDiv = document.createElement('div'); 
            productoDiv.classList.add('producto'); 
            productoDiv.innerHTML = `
                <h2>${producto.nombre}</h2> 
                <p>Precio: $${producto.precio}</p> 
            `;
            app.appendChild(productoDiv); 
        });
    });