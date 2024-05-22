const productos = [
{

id:"sueño1",
	titulo:"sueño1",
	imagen:"./Galeria/1 sueño.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10 
},
 
{
id:"6",
	titulo:"6",
	imagen:"./Galeria/6.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"3",
	titulo:"3",
	imagen:"./Galeria/3.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"4",
	titulo:"4",
	imagen:"./Galeria/4.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"5",
	titulo:"5",
	imagen:"./Galeria/5.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"23 ",
	titulo:"23",
	imagen:"./Galeria/23.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"8",
	titulo:"8",
	imagen:"./Galeria/8.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"7",
	titulo:"7",
	imagen:"./Galeria/7.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"10",
	titulo:"10",
	imagen:"./Galeria/10.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"11",
	titulo:"11",
	imagen:"./Galeria/11.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"13",
	titulo:"13",
	imagen:"./Galeria/13.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},
{
id:"14",
	titulo:"14",
	imagen:"./Galeria/14.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"15",
	titulo:"15",
	imagen:"./Galeria/15.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"16",
	titulo:"16",
	imagen:"./Galeria/16.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"17",
	titulo:"17",
	imagen:"./Galeria/17.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria",
	},
	precio: 10
},

{
id:"18",
	titulo:"18",
	imagen:"./Galeria/18.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"19",
	titulo:"19",
	imagen:"./Galeria/19.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},
{
id:"20",
	titulo:"20",
	imagen:"./Galeria/20.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"21",
	titulo:"21",
	imagen:"./Galeria/21.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"22",
	titulo:"22",
	imagen:"./Galeria/22.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"2",
	titulo:"2",
	imagen:"./Galeria/2.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"24",
	titulo:"24",
	imagen:"./Galeria/24.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"27",
	titulo:"27",
	imagen:"./Galeria/27.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"26",
	titulo:"26",
	imagen:"./Galeria/26.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
},

{
id:"25",
	titulo:"25",
	imagen:"./Galeria/25.jpg",
	categoria: {
		nombre:"Galeria",
		id:"galeria"
	},
	precio: 10
} 


];
  
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");

function cargarProductos(productos) {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
}

cargarProductos(productos); // Llamar a cargarProductos después de definirla

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            console.log(productoCategoria);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            contenedorProductos.innerHTML = ""; // Limpiar el contenedor antes de cargar nuevos productos
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            contenedorProductos.innerHTML = ""; // Limpiar el contenedor antes de cargar todos los productos
            cargarProductos(productos);
        }
    });
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

actualizarBotonesAgregar(); // Llamar a actualizarBotonesAgregar después de definirla

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
} else {
    productosEnCarrito =[];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    
    if (productosEnCarrito.some (producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        // Mostrar notificación
        const notificacion = document.getElementById('notificacion');
        notificacion.innerText = `El producto "${productoAgregado.titulo}" ha sido agregado al carrito`;
        notificacion.style.display = 'block';
        setTimeout(() => {
            notificacion.style.display = 'none';
        }, 3000);
        
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
