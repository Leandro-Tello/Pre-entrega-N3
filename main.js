//Variables DOM
let body;
let clickOpcionA;
let clickOpcionB;
let clickOpcionC;
let clickOpcionD;

//variables
let opcion;
let continuar;
let cantidadObjetos = 0;
let contador = 0;
let borrar = 0;
let buscarProducto;
let buscar;

//variables de objeto
let datoNombre;
let datoPrecio;
let datoCantidad;

//arrays
let arrayProductos = [];

//codigo
  function menu(){
    body = document.querySelector("body");
    body.innerHTML = 
    `<table>
    <tr><th>¿Que desea hacer?</th></tr>
    <tr><th id=clickOpcionA>A: Ver productos</th></tr>
    <tr><th id=clickOpcionB>B: Agregar productos</th></tr>
    <tr><th id=clickOpcionC>C: Eliminar productos</th></tr>
    <tr><th id=clickOpcionD>D: Buscar productos</th></tr>
    </table>`

    clickOpcionA = document.getElementById("clickOpcionA");
    clickOpcionB = document.getElementById("clickOpcionB");
    clickOpcionC = document.getElementById("clickOpcionC");
    clickOpcionD = document.getElementById("clickOpcionD");
  }

  function botonMenu(){
    let botonInicio = document.createElement("input");
    botonInicio.setAttribute("id", "botonInicio");
    botonInicio.setAttribute("type", "submit");
    botonInicio.setAttribute("value", "OK");
    document.body.append(botonInicio);
    document.getElementById("botonInicio");

    botonInicio.onclick = () => {
      menu();
      ClickOpcion();
    }

  }

  function mostrarProductos(){
    for(i = 0; i < arrayProductos.length; i++){ //Mostrar Array (convertir en funcion);
      let strong = document.createElement("strong");
      strong.setAttribute("id", "producto " + i);
      document.body.append(strong);


      let div = document.getElementById("producto " + i);
      div = document.createElement("div")
      document.body.append(div);

      let mostrarProducto = document.getElementById("producto " + i);
      mostrarProducto.textContent = "N" + (i + 1) + "|| Nombre: " + arrayProductos[i].nombre;
      mostrarProducto.textContent = mostrarProducto.textContent += "|| Precio: $" + arrayProductos[i].precio;
      mostrarProducto.textContent = mostrarProducto.textContent += "|| Cantidad: " + arrayProductos[i].cantidad + "|| ";  
    }
  }

  function ClickOpcion(){
    clickOpcionA.onclick = () => {
      body.innerHTML = ''

      if(arrayProductos.length == 0){
        body.innerHTML = `<label>Sin productos</label>
                          <div></div>`;
      }


      mostrarProductos();
      botonMenu();
    }

    //-------------------------------------------------------------------------------------------------------------------------------

    clickOpcionB.onclick = () => {
    
      body = document.querySelector("body");
      body.innerHTML = `<label>¿Cuantos productos deasea ingresar?</label>
                        <form id=formulario>
                        <input id="cantidadObjetos"</input>
                        <input type="submit" value="Agregar">
                        </form>`
                        
                        let formB = document.getElementById("formulario").addEventListener("submit", (evt) => {
                          evt.preventDefault();
                          cantidadObjetos = Number(document.getElementById("cantidadObjetos").value);
                      
                          //Esta parte, hasta la linea 77 tuve que ayudarme con gpt jeje (necesitaba conocer el promise para solucionarlo)
                          function obtenerDatos(i) {
                              return new Promise((resolve) => {
                                  body.innerHTML = `<label>Ingresa el nombre, precio y cantidad del producto</label>
                                                      <form id=formulario>
                                                          <input id="nombre"</input>
                                                          <input id="precio"</input>
                                                          <input id="cantidad"</input>
                                                          <input type="submit" value="Agregar">
                                                      </form>`;
                                
                                  let nombreInput = document.getElementById("nombre");
                                  let precioInput = document.getElementById("precio");
                                  let cantidadInput = document.getElementById("cantidad");
                                
                                  document.getElementById("formulario").addEventListener("submit", (evt) => {
                                      evt.preventDefault();
                                      datoNombre = nombreInput.value;
                                      datoPrecio = precioInput.value;
                                      datoCantidad = cantidadInput.value;
                                      
                                      producto = {
                                          nombre: datoNombre,
                                          precio: datoPrecio,
                                          cantidad: datoCantidad,
                                      };
                                      
                                      arrayProductos[i] = producto;

                                      resolve();
                                  });
                              });
                          }
                      
                          // Utilizar un bucle asíncrono para manejar la lógica de forma sincrónica
                          (async () => {
                              for (let i = contador; i < cantidadObjetos + contador; i++) {
                                  await obtenerDatos(i);
                              }
                      
                              body.innerHTML =`<label>Usted a añadido los siguients productos:</label>`;
                                    for(let i = contador; i < cantidadObjetos + contador; i++){
                                      let label = document.createElement("div");
                                      label.setAttribute("id", "producto " + i);
                                      document.body.append(label);

                                      let mostrarProducto = document.getElementById("producto " + i);
                                      mostrarProducto.textContent = "N" + (i + 1) + "|| Nombre: " + arrayProductos[i].nombre;
                                      mostrarProducto.textContent = mostrarProducto.textContent += "|| Precio: $" + arrayProductos[i].precio;
                                      mostrarProducto.textContent = mostrarProducto.textContent += "|| Cantidad: " + arrayProductos[i].cantidad + "|| ";
                                    }
                                    botonMenu();
                              contador = Number(contador + cantidadObjetos);
                          })(); // fin async
                      }); //fin evento
    } //fin opcion B

//----------------------------------------------------------------------------------------------------------------------------------

    clickOpcionC.onclick = () => {
      let input;
      let i;
      body.innerHTML = `<label>¿Qué elemento desea borrar?</label>
                        <div></div>`;
    
      mostrarProductos();
      
      form = document.getElementById("producto " + i);
      form = document.createElement("form");
      form.setAttribute("id", "formularioBorrar");
      document.body.append(form);

      form.innerHTML = `<label>Ingrese el numero sin la letra</label>
                        <input id="nombreBorrar"</input>
                        <input type="submit" value="Agregar">`;

      let formBorrar = document.getElementById("formularioBorrar").addEventListener("submit", (evt) => {
        evt.preventDefault();
        let borrarInput = Number(document.getElementById("nombreBorrar").value - 1);

        if(borrarInput >= 0 && borrarInput < arrayProductos.length){
        arrayProductos.splice(borrarInput,1);
        contador = contador - 1;

        body.innerHTML = `<label>Lista de productos nueva</label>
                          <div></div>`;
        mostrarProductos();

        if(arrayProductos.length == 0){
          body.innerHTML = `<label>Sin productos</label>
                            <div></div>`;
        }
      }
      else{
        body.innerHTML = `<label>Ingrese un numero valido</label>
                          <div></div>`;
      }

        botonMenu();

      });//fin evento
    }//fin opcion C
    
  //--------------------------------------------------------------------------------------------------------------------------------
  
    clickOpcionD.onclick = () => {
      
      body.innerHTML = `<label>"¿Que producto desea buscar?"</label>
                          <div></div>
                          <form id=formularioBuscar>
                            <input id="buscarInput"</input>
                            <input type="submit" value="Buscar">
                          </form>`;
                    
                        let formularioBuscar = document.getElementById("formularioBuscar").addEventListener("submit", (evt) => {
                            evt.preventDefault();
                            buscarProducto = document.getElementById("buscarInput").value;
                            buscarProducto = buscarProducto.toLowerCase();
                            let buscar = arrayProductos.find((producto) => producto.nombre.toLowerCase() == buscarProducto);

                            if(buscar == undefined){
                              body.innerHTML = `<label>No hay productos encontrados</label>
                                                <div></div>`

                              botonMenu();
                            }
                            else{
                              body.innerHTML = `<label>Se encontro el producto: </label>
                                                <div></div>
                                                <label id="mostrar"></label>
                                                <div></div>`

                              let mostrar = document.getElementById("mostrar");
                              mostrar.textContent = mostrar.textContent + "|| Nombre: " +(buscar.nombre);
                              mostrar.textContent = mostrar.textContent + "|| Precio: $" + (buscar.precio);
                              mostrar.textContent = mostrar.textContent + "|| Cantidad: " + (buscar.cantidad);
                              
                              botonMenu();
                            }
                          });
    }//fin opcion D

  } //fin de funciton

  

  menu();
  ClickOpcion();





// function pedirDato() {
//   datoNombre = prompt("Ingresar nombre del producto");
//   datoPrecio = prompt("Ingresar precio del producto");
//   datoCantidad = prompt("Ingresar cantidad del producto");
// }

// alert("Bienvenido al Software de Stock")

// while(true){ 
// menu();

// if(opcion == "A"){
//   console.log("Estos son los productos que hay en el stock")
//   for(const i of arrayProductos){
//     console.log(i);
//   }
//   console.log("------------------------")
// }


// if (opcion == "B"){
// do{
//   cantidadObjetos = Number(prompt("¿Cuantos productos desea ingresar?"));

//   for(let i = contador; i < cantidadObjetos + contador; i++){
//   pedirDato();

//   producto = {
//     nombre: datoNombre, 
//     precio: datoPrecio,
//     cantidad: datoCantidad
//   }

//     arrayProductos[i] = producto;
//     console.log("Usted a añadido el siguiente producto:")
//     console.log(arrayProductos[i]);
//   }

//   continuar = prompt("¿Desea ingresar otro producto?");
//   console.log("------------------------")
//   continuar = continuar.toUpperCase();
//   contador = Number(contador + cantidadObjetos);
//   cantidadObjetos = 0;
// }while(continuar == "SI");
// }

// if(opcion == "C"){
//   console.log("¿Que elemento desea borrar?");

//   for(const i of arrayProductos){
//     console.log(i);
//   }

//   borrar = Number(prompt("Ingrese el numero del objeto que desea borrar")- 1);
//   arrayProductos.splice(borrar,1);
//   contador = contador - 1;
//   console.log("------------------------")
//   console.log("Esta es su nueva lista de productos")
//   for(const i of arrayProductos){
//     console.log(i);
//   }
//   console.log("------------------------")
// }

// if(opcion == "D"){
//   console.log("¿Que producto desea buscar?")
//   buscarProducto = prompt("ingrese el nombre del producto");
//   buscarProducto = buscarProducto.toLowerCase();
//   buscar = arrayProductos.find((producto) => producto.nombre == buscarProducto);
//   if(buscar == undefined){
//     console.log("no hay productos encontrados");
//     console.log("------------------------")
//   }else{
//     console.log("Se encontro el producto: ");
//     console.log(buscar);
//     console.log("------------------------")
//   }
// }
// }
