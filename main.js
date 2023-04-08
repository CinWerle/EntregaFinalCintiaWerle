
  class Producto {
    constructor(nombre, precio, promocion, img) {
      this.nombre = nombre.toUpperCase();
      this.precio = precio;
      this.promocion = promocion;
      this.img = img;
    }
  }
  
  let carrito = [];
  let totalCarrito = 0;
  let nombre = "";
  let mail = "";
  
  //MUESTRA LOS PRODUCTOS EN EL BODY
  const cardContainer = document.getElementById("card-container");
  
  //METODO FETCH
  fetch("./productos.json")
    .then((resp) => resp.json())
    .then((data) =>
      data.forEach((producto) => {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `
          <div class="card "  style="width:18rem;">
          <h2 class="bg-blue">${producto.nombre}</h2>
          <img src="${producto.img}" class ="card-img" alt="">
          <div class="card-body">
          <p>Precio: $${producto.precio}</p>
          <p>${producto.detalle}</p>
         
          <button class="boton" id="button${producto.nombre}">COMPRAR</button>
          </div>
          </div>
          
           `;
        cardContainer.appendChild(contenedor);
  
        const button = document.getElementById(`button${producto.nombre}`);
  
        button.addEventListener("click", () => {
          swal(`Se agrego ${producto.nombre}, a su compra`);
          totalCarrito = totalCarrito + producto.precio;
          carrito.push(producto.nombre); 
          const total = document.getElementById("total");
          total.innerHTML = `El total de compra: $${totalCarrito}`;
        });
      })
    );
  
  //BOTON COMPRAR
  const button = document.createElement("button");
  button.type = "button";
  button.innerText = "COMPRAR CARRITO";
  button.classList.add("button1");
  document.body.appendChild(button);
  button.addEventListener("click", () => {
    if (nombre.length === 0) {
      swal("Debe ingresar su email para poder enviar la factura de su compra");
      if (carrito.length === 0) {
        swal({
          title: `Su carrito esta vacio`,
          text: `Seleccione un producto `,
          icon: "warning",
        });
      }
    } else {
      const compraCarrito = {
        total: totalCarrito,
        productos: carrito,
        usuario: nombre,
        email: mail,
      };
      
      
      // LOCAL STORAGE
     
      localStorage.setItem("compra", JSON.stringify(compraCarrito));
  
      swal({
        title: `Compra exitosa, gracias ${nombre}`,
        text: `El total es: ${totalCarrito}, 
                Le enviaremos su factura a :${mail}`,
        icon: "success",
      });
    }
  });
  
  // VACIAR CARRITO
  const button2 = document.createElement("button");
  button2.type = "button";
  button2.innerText = "VACIAR CARRITO";
  button2.classList.add("button2");
  document.body.appendChild(button2);
  button2.addEventListener("click", () => {
    if (carrito.length === 0) {
      swal({
        title: `Su carrito esta vacio`,
        text: `Todavia no sumo productos al carrito`,
        icon: "info",
      });
    } else {
      totalCarrito = 0;
      carrito = [];
      const total = document.getElementById("total");
      total.innerHTML = `El total de compra :${totalCarrito}`;
      // USO DE && OPERARDOR AVANZADO
      carrito.length === 0 &&
        alert(`Carrito vacio, el total es: ${totalCarrito}`);
    }
  });
  
  const button3 = document.createElement("button");
  button3.type = "button";
  button3.innerText = "MOSTRAR COMPRA";
  button3.classList.add("button3");
  document.body.appendChild(button3);
  button3.addEventListener("click", () => {
     if(localStorage.getItem("compra")){
    // inicializacion condicional de variable con ||
    const carrito = JSON.parse(localStorage.getItem("compra")) || [];
    //desustructuracion de objeto
    let { total, productos } = carrito;
    swal({
      text: `Su ultima compra es : ${productos} y el total es $${total}  `,
      icon: "info",
    });}
    else{
      swal("No se registraron compras");
    }
  });
  
  //Toma datos del usuario
  function guardarDatos() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    nombre = name;
    mail = email;
    if (nombre.length === 0 && mail.length === 0) {
      swal("Ingrese sus datos");
    } else {
      swal({
        text: `Usuario registrado`,
        icon: "success",
      });
    }
  }

