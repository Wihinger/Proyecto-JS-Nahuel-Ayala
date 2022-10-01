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
            Swal.fire({
                icon: 'success',
                title: `Agregado con exito`,
                text: `Su calzado ${champion.marca} fue agregado exitosamente a su carro de compras`,
                showConfirmButton: true,
                timer: 1500
            })
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
    acumulador == 0 ? parrafoCompra.innerHTML = `<strong>No hay productos en el carrito</strong>` : parrafoCompra.innerHTML = `El total de su carrito es ${acumulador}` 
}
