//Clase constuctora 
class calzado {
    constructor(id, marca, precio,imagen){
        //propiedades o atributos de nuestra clase
        this.id = id,
        this.marca = marca,
        this.precio = precio,
        this.imagen = imagen

    }
}
//Es ruta del HTML al JSON
// fetch("libros.json")
// .then((res) => res.json())
// .then((data)=>{console.log(data)})

let estanteria = []
const cargarEstanteria = async() =>{
    const response = await fetch("calzados.json")
    const data = await response.json()
    console.log(data)
    for (let libro of data){
        //no funcionaba el libro.imagen porque le puse dos veces assets/assets/
        let calzadoNuevo = new calzado(calzado.id, calzado.marca, calzado.precio, calzado.imagen)
        estanteria.push(calzadoNuevo)
    }
    //Aquí hago el set
    localStorage.setItem("estanteria", JSON.stringify(estanteria) )
    
}

//Utilizamos operador OR ||
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []


//Revisa si existe en el local y lo trae 

if(localStorage.getItem("estanteria")){
    estanteria = JSON.parse(localStorage.getItem("estanteria"))
}
else{
    console.log("Seteando por primera vez el array")
    //Invoco la function async
    cargarEstanteria()
}