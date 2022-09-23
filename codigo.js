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

const calzados = []
calzados.push(calzado1, calzado2, calzado3, calzado4,calzado5,calzado6,calzado7,calzado8)
localStorage.setItem("calzados", JSON.stringify(calzados))

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
          <a href="#" class="btn btn-outline-dark btnCompras">COMPRAR</a>
        </div>
      </div>`
      divProductos.append(nuevoProducto)
    });
    let btnComprar = document.getElementsByClassName("btnCompras")
    for(let compra of btnComprar){
    compra.addEventListener("click", ()=>{
        alert(`Tu calzado ya se encuentra en el carrito!!`)
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
function buscadorBoton (array){
    let Buscar = document.getElementById("submit")
    Buscar.addEventListener("click", (e)=>{
        
    })
    }
    


