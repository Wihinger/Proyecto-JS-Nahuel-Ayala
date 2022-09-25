class calzado {
    constructor(id, marca, precio, imagen){
        this.id = id,
        this.marca = marca,
        this.precio = precio,
        this.imagen = imagen
    }
}
const calzado1 = new calzado(1, "Nike Jordan 1 Mid", 5000, "./assets/air-jordan-1-shoes-HRhPMl.png" )
const calzado2 = new calzado(2, "Nike Waffle Debut", 4500, "./assets/waffle-debut-shoes-JRWJk7.png")
const calzado3 = new calzado(3, "Nike Cortez", 3800, "./assets/nike-cortez.png")
const calzado4 = new calzado(4, "Nike Air Vapormax", 6600, "./assets/air-vapormax-2021-fk-NpTfFz.png")
const calzado5 = new calzado(5, "Nike Hurache", 5500, "./assets/nike-hurache.png")
const calzado6 = new calzado(6, "Nike Vapormax Plus", 4000, "./assets/nike-vapormax-plus.png")
const calzado7 = new calzado(7, "Nike Jordan Delta", 5500, "./assets/nike-jordan-delta.png")
const calzado8 = new calzado(8, "Nike Monarch IV", 4000, "./assets/nike-monarch-iv.png")

let productosEnCarrito = []
let calzados = []
if(localStorage.getItem("calzados")){
    calzados = JSON.parse(localStorage.getItem("calzados"))
}
else{
    console.log("Seteando por primera vez el array")
    calzados.push(calzado1, calzado2 ,calzado3, calzado4, calzado5, calzado6, calzado7, calzado8)
    localStorage.setItem("calzados", JSON.stringify(calzados) )
}


let divProductos = document.getElementById("productos")
function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    array.forEach((champion) => {
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `<div id="${champion.id}" class="card" style="width: 17rem;">
        <img src="${champion.imagen}" class="card-img-top" alt="${champion.marca}">
        <div class="card-body">
          <h4 class="card-title">${champion.marca}</h4>
          <h6 class="card-text">${champion.precio}$</h6>
          <a href="#" id="agregarBtn${champion.id}" href="#" class="btn btn-outline-dark btnCompras">COMPRAR</a>
        </div>
      </div>`
      divProductos.append(nuevoProducto)
      let btnAgregar = document.getElementById(`agregarBtn${champion.id}`)
        console.log(btnAgregar)
        btnAgregar.addEventListener("click", ()=>{
            console.log(champion)
            agregarAlCarrito(champion)

        })
    })
}


function agregarAlCarrito(calzado){
    productosEnCarrito.push(calzado)
    console.log(productosEnCarrito)
}
function ocultarCatalogo(){
    divProductos.innerHTML = ""
}
let catalogoOff = document.getElementById("catalogoOff")
catalogoOff.addEventListener("click", ocultarCatalogo)
let btnMostrarCatalogo = document.getElementById("catalogoOn")
btnMostrarCatalogo.addEventListener("click", ()=>{
    mostrarCatalogo(calzados)
})



let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')

botonCarrito.addEventListener("click", ()=>{
cargarProductosCarrito(productosEnCarrito)
})
function cargarProductosCarrito(array){

    modalBody.innerHTML = ""
    array.forEach((productoCarrito)=>{
        modalBody.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" src="${productoCarrito.imagen}" alt="${productoCarrito.marca}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.marca}</h4>
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>`
    })
    //calcular el total
    compraTotal(array)
}
 
function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acumulador, productoCarrito)=>{
        return acumulador + productoCarrito.precio
    },0)
    // console.log(`EL total hasta ahora es: ${acumulador}`)
    if(acumulador == 0){
        parrafoCompra.innerHTML = `<strong>No hay productos en el carrito</strong>`
    }
    else{
        parrafoCompra.innerHTML = `El total de su carrito es ${acumulador}`
    }
}
/* creas la clase
class calzado {
    constructor(id, marca, precio, imagen){
        this.id = id,
        this.marca = marca,
        this.precio = precio,
        this.imagen = imagen
    }
}

 arrays de objetos
const calzado1 = new calzado(1, "Nike Jordan 1 Mid", 5000, "./assets/air-jordan-1-shoes-HRhPMl.png" )
const calzado2 = new calzado(2, "Nike Waffle Debut", 4500, "./assets/waffle-debut-shoes-JRWJk7.png")
const calzado3 = new calzado(3, "Nike Cortez", 3800, "./assets/nike-cortez.png")
const calzado4 = new calzado(4, "Nike Air Vapormax", 6600, "./assets/air-vapormax-2021-fk-NpTfFz.png")
const calzado5 = new calzado(5, "Nike Hurache", 5500, "./assets/nike-hurache.png")
const calzado6 = new calzado(6, "Nike Vapormax Plus", 4000, "./assets/nike-vapormax-plus.png")
const calzado7 = new calzado(7, "Nike Jordan Delta", 5500, "./assets/nike-jordan-delta.png")
const calzado8 = new calzado(8, "Nike Monarch IV", 4000, "./assets/nike-monarch-iv.png")
const calzados = []
calzados.push(calzado1, calzado2, calzado3, calzado4,calzado5,calzado6,calzado7,calzado8)


let divProductos = document.getElementById("productos")


// retorna un array con los datos del local storage, si no hay nada, retorna un array vacio
function obtenerLS() {
    return listado =  JSON.parse(localStorage.getItem('calzados')) || []
}

// obtiene mediante un parametro un array y lo setea/envia al local storage
function enviarLS(cart) {
    localStorage.setItem("calzados", JSON.stringify(cart))
}

// obtiene un id(unico) y un array y se fija si existe en el local storage
function existeLS(id, listaCarrito) {
    for (const carrito of listaCarrito) {
        if (carrito.id == id) {
            return true;
        }
    }
    return false;
}

// envia informacion al DOM mediante el uso del array principal
function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    array.forEach((champion) => {
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `<div id="${calzados.id}" class="card" style="width: 17rem;">
        <img src="${champion.imagen}" class="card-img-top" alt="${champion.marca}">
        <div class="card-body">
          <h4 class="card-title">${champion.marca}</h4>
          <h6 class="card-text">$${champion.precio}$</h6>
          <a href="#" class="btn btn-outline-dark btnCompras">COMPRAR</a>
        </div>
      </div>`
      divProductos.append(nuevoProducto)
    });
    let btnComprar = document.getElementsByClassName("btnCompras")
    for(let compra of btnComprar){
        compra.addEventListener("click", (e)=>{
            // prevengo la recarga del sitio
            e.preventDefault()
            // capturo el evento, es decir, el boton "COMPRAR" reconoce que solo ese boton fue clickeado
            compraCalzados = e.target
            // selecciona mediante el usa de una clase padre la card seleccionada
            let card = compraCalzados.closest('.card')
            // capturar la información importante de la card
            let imagen = card.querySelector('.card-img-top').src // obtengo la imagen de la card
            let marca = card.querySelector('.card-title').innerText // obtengo la marca con textCOntent o innerText
            let precio = card.querySelector('.card-text').textContent.replace('$', ' ') // obtengo el precio parseado a numero
            alert(`Tu calzado ya se encuentra en el carrito!!`)

            // llamo a la función que obtiene el LS y guardo lo que contiene en un array "obtenerDatos"
            let obtenerDatos = obtenerLS()
            // reviso si existe mediate el id y el array
            if (existeLS(obtenerDatos.id, obtenerDatos)) {
                return true
            } else {
                // si no existe ingreso en un array en el cual le envio la info
                // el array contiene primero la copia del array obtenerDatos. SPREAD OPERATOR: ...array (es una copia de un array preexistente)
                // segundo le paso un id con lo que quiero setear/enviar de la card a comprar.
                enviarLS([...obtenerDatos, {id: obtenerDatos.length+1, marca: marca, precio: precio, imagen: imagen}])
            }
        })
    }
}
function ocultarCatalogo(){
    divProductos.innerHTML = ""
}

catalogoOff.addEventListener("click", ocultarCatalogo)

let btnMostrarCatalogo = document.getElementById("catalogoOn")
btnMostrarCatalogo.addEventListener("click", ()=>{
    mostrarCatalogo(calzados)
})

// funcion que crea un carrito mediante el uso de un array pasado por parametros
function mostrarCarrito(array) {
    const carti = document.getElementById('cart')
    array.forEach((champion) => {
        let divCarrito = document.createElement("div")
        divCarrito.innerHTML += `
        <div id="${calzados.id}" class="card" style="width: 17rem;">
            <img src="${champion.imagen}" class="card-img-top" alt="${champion.marca}">
            <div class="card-body">
                <h4 class="card-title">${champion.marca}</h4>
                <h6 class="card-text">$${champion.precio}$</h6>
                <a href="#" class="btn btn-outline-dark btnCompras">COMPRAR</a>
            </div>
        </div>`
        carti.append(divCarrito)
    })
}
// llamo a la funcion mostrarCarrito y el parametro es lo que obtengo del local storage.
mostrarCarrito(obtenerLS())

// function buscadorBoton (array){
//     let Buscar = document.getElementById("submit")
//     Buscar.addEventListener("click", (e)=>{
        
//     })
// }*/