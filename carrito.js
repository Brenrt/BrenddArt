let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    if (index !== -1) {
        productosEnCarrito.splice(index, 1);
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
        
        Toastify({
            text: "Producto eliminado del carrito",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #4b33a8, #785ce9)",
                borderRadius: "2rem",
                textTransform: "uppercase",
                fontSize: ".75rem"
            },
            offset: {
                x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            onClick: function () { } // Callback after click
        }).showToast();
    } else {
        console.error("Error al eliminar el producto del carrito: el producto no existe en el carrito.");
        location.reload()
    }
}


botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        html: `Se van a borrar ${productosEnCarrito.length} productos del carrito.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            // Vaciar el carrito
            productosEnCarrito = [];
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

            // Actualizar la interfaz
            cargarProductosCarrito();
            console.error("Error al eliminar el producto del carrito: el producto no existe en el carrito.");

            // Mostrar mensaje de éxito
            Swal.fire({
                title: 'Carrito vaciado',
                text: 'El carrito ha sido vaciado exitosamente.',
                confirmButtonText: 'Aceptar'
            });
            location.reload()
        }
    });
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    if (productosEnCarrito.length === 0) {
        // Mostrar mensaje de carrito vacío
        Swal.fire({
            title: 'Carrito Vacío',
            text: 'El carrito está vacío. Agrega productos antes de proceder a la compra.',
            confirmButtonText: 'Aceptar'
        });
    } else {
        // Mostrar la ventana modal de compra
        Swal.fire({
            title: '¿Quieres finalizar la compra?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'mi-modal' // Clase CSS para estilos personalizados
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Lógica de compra
                productosEnCarrito.length = 0;
                localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

                contenedorCarritoVacio.classList.add("disabled");
                contenedorCarritoProductos.classList.add("disabled");
                contenedorCarritoAcciones.classList.add("disabled");
                contenedorCarritoComprado.classList.remove("disabled");

                cargarProductosCarrito(); // Otra vez cargar los productos para que aparezca el carrito vacío

                // Mostrar mensaje de "Gracias por su compra"
                Swal.fire({
                    title: '¡Gracias por su compra!',
                    text: 'Esperamos que disfrute de sus productos.',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    // Recargar la página después de aceptar el mensaje de agradecimiento
                    window.location.reload();
                });
            }
        });
    }
}
