
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
let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')

function agregarAlCarrito(champion){
    //CONDICIONAL QUE DECIDA, SI SE AGREGA O NO
    // si en productosEnCarrito existe o no el libro que quiero pushear
    let calzadoAgregado = productosEnCarrito.find((elem)=> (elem.id == champion.id))
    console.log(calzadoAgregado)
    //Si quisiera sumar cantidad
    //si no encuentra nada me devuelve libroAgregado = undefined
    if(calzadoAgregado == undefined){
        productosEnCarrito.push(champion)
        // console.log(productosEnCarrito)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        
        //Alert con sweetAlert
        Swal.fire({
            title: "Ha agregado un producto",
            icon: "success",
            confirmButtonText : "Acepto",
            timer: 3000,
            text: `El calzado ${champion.marca} ha sido agregado`,
            imageHeight: 400,
            imageAlt: `${champion.marca}` 
            
        })

    }else{
        //cuanto tiene de cantidad en el carrito y le suma

        console.log(`El calzado ${champion.titulo} ya se encuentra en el carrito`)
        Swal.fire({
            title: "Producto ya agregado",
            text: `El calzado ${champion.marca} ya se encuentra en el carrito`,
            icon: "info",
            timer:2500,
            confirmButtonText:"Aceptar",
            confirmButtonColor: 'red',
            
        })
    }
    
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
document.getElementById(`botonEliminar ${productoCarrito.id}`)
array.forEach((productoCarrito, indice)=>{
    document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
        console.log(`El producto eliminado es ${productoCarrito.marca}`)
        //Eliminarlo del array
        //método splice (desde que posición, cuantos elementos a borrar)
        array.splice(indice, 1)
        console.log(array)
        //eliminarlo del storage
        localStorage.setItem("carrito", JSON.stringify(array))
        //eliminarlo del DOM
        let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
        console.log(cardProducto)
        cardProducto.remove()
        //Recalcula total
        
        // cargarProductosCarrito(array)

    })
    
})
}

function finalizarCompra(){
    //PReguntar si ta seguro
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
            title: 'Compra realizada',
            icon: 'success',
            confirmButtonColor: 'green',
            text: `Muchas gracias por su compra ha adquirido nuestros productos. `,
            })
            productosEnCarrito =[]
            localStorage.removeItem("carrito")
            
        }else{
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
                confirmButtonColor: 'green',
                timer:3500
            })
        }
    })
}
botonFinalizarCompra.addEventListener("click", ()=>{finalizarCompra()})

