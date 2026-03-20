                       let slides = document.querySelectorAll(".slide");
let index = 0;

function cambiarSlide() {
  slides[index].classList.remove("active");

  index = (index + 1) % slides.length;

  slides[index].classList.add("active");
}

setInterval(cambiarSlide, 3000); // cambia cada 3 segundos


                                  /*buscDOR*/
function buscar() {

    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    let primerResultado = null;

    cards.forEach(card => {

        let texto = card.textContent.toLowerCase();

        if (texto.includes(input)) {
            card.style.display = "block";

            if (!primerResultado) {
                primerResultado = card;
            }

        } else {
            card.style.display = "none";
        }

    });

    // ✅ Si escribió algo → baja al primer resultado
    if (input !== "" && primerResultado) {
        primerResultado.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    // ✅ Si borra → mostrar todo otra vez
    if (input === "") {
        cards.forEach(card => {
            card.style.display = "block";
        });
    }
}
                                                                  /*compra del boton*/
const botones = document.querySelectorAll(".btn-comprar");

botones.forEach(boton => {
  boton.addEventListener("click", () => {

    boton.classList.add("comprado");
    boton.innerText = "Comprado ✔";

    setTimeout(() => {
      boton.classList.remove("comprado");
      boton.innerText = "Comprar";
    }, 2000);

  });
});

document.addEventListener("DOMContentLoaded", () => {

  const botones = document.querySelectorAll(".btn-comprar");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {

      boton.classList.add("comprado");
      boton.innerText = "Comprado ✔";

      // Crear notificación
      let noti = document.createElement("div");
      noti.classList.add("notificacion");
      noti.innerText = "Compra exitosa ✅";

      document.body.appendChild(noti);

      setTimeout(() => {
        noti.classList.add("mostrar");
      }, 10);

      setTimeout(() => {

        boton.classList.remove("comprado");
        boton.innerText = "Comprar";

        noti.classList.remove("mostrar");

        setTimeout(() => {
          noti.remove();
        }, 400);

      }, 2000);

    });
  });

});

// Esperar a que cargue toda la página
document.addEventListener("DOMContentLoaded", () => {

  // ===== SELECCIONAR ELEMENTOS =====

  const botones = document.querySelectorAll(".btn-comprar"); 
  // 👉 Todos los botones "Comprar"

  const modal = document.getElementById("modalCompra"); 
  // 👉 El formulario (modal)

  const confirmar = document.getElementById("confirmarCompra"); 
  // 👉 Botón dentro del formulario

  let botonActual = null; 
  // 👉 Guardar cuál botón fue presionado


  // ===== ABRIR FORMULARIO =====

  botones.forEach(boton => {

    boton.addEventListener("click", () => {

      botonActual = boton; 
      // 👉 Guardamos el botón que se tocó

      modal.classList.add("mostrar"); 
      // 👉 Mostrar formulario

      document.body.classList.add("blur"); 
      // 👉 Activar desenfoque del fondo

    });

  });


  // ===== CONFIRMAR COMPRA =====

  confirmar.addEventListener("click", () => {

    const nombre = document.getElementById("nombre").value; 
    // 👉 Obtener texto del input nombre

    // ===== VALIDACIÓN =====

    if (nombre.trim() === "") { 
      // 👉 Si el usuario no escribió nada


      alert("Escribe tu nombre 😅");
      return; 
      // 👉 Detener ejecución

    }


                                             // ===== CERRAR FORMULARIO =====

    modal.classList.remove("mostrar"); 
    // 👉 Ocultar modal

    document.body.classList.remove("blur"); 
    // 👉 Quitar desenfoque


    // ===== EFECTO BOTÓN =====

    botonActual.classList.add("comprado"); 
    // 👉 Cambiar estilo del botón

    botonActual.innerText = "Comprado ✔"; 
    // 👉 Cambiar texto


                                                  // ===== CREAR NOTIFICACIÓN =====

    let noti = document.createElement("div"); 
    // 👉 Crear div dinámico

    noti.classList.add("notificacion"); 
    // 👉 Asignar estilo CSS

    noti.innerText = "Compra exitosa ✅"; 
    // 👉 Texto del mensaje

    document.body.appendChild(noti); 
    // 👉 Insertarlo en la página


                                     // ===== ANIMACIÓN DE ENTRADA =====

    setTimeout(() => {
      noti.classList.add("mostrar");
    }, 10);


    // ===== RESTAURAR TODO =====

    setTimeout(() => {

      botonActual.classList.remove("comprado"); 
      // 👉 Botón vuelve normal

      botonActual.innerText = "Comprar"; 
      // 👉 Texto original

      noti.classList.remove("mostrar"); 
      // 👉 Animación de salida

      setTimeout(() => {
        noti.remove(); 
        // 👉 Borrar mensaje
      }, 400);

    }, 2000);

  });

});


                                                        /*inventario*/

/* ================= INVENTARIO ================= */
let inventario = [];

// Detectar clicks en botones Comprar
document.addEventListener("click", function(e){

  if(e.target.classList.contains("btn-comprar")){

    const boton = e.target;
    const card = boton.closest(".card");
    if(!card) return;

   const nombre = card.querySelector(".Apache").innerText;

let precioElemento = card.querySelector(".precio-oferta") 
                  || card.querySelector(".precio");

const precio = precioElemento ? precioElemento.innerText : "";

    // 🔥 AGARRAR LA IMAGEN CORRECTA
    const imagenElemento = card.querySelector("img");
    const imagen = imagenElemento ? imagenElemento.getAttribute("src") : "";

    inventario.push({ nombre, precio, imagen });

    actualizarInventario();
    actualizarBadge();

    boton.classList.add("comprado");
    boton.innerText = "Añadido ✔";
  }

});


/* ================= ACTUALIZAR INVENTARIO ================= */
function actualizarInventario(){

  //  Buscar el contenedor donde se van a mostrar los autos comprados
  const lista = document.getElementById("listaInventario");

  //  Limpiar el inventario antes de volver a dibujarlo
  // (esto evita que se dupliquen los autos visualmente)
  lista.innerHTML = "";

  //  Si no hay autos en el array, mostrar mensaje vacío
  if(inventario.length === 0){
    lista.innerHTML = "<h4>No hay autos aún</h4>";
    return; //  Detiene la función aquí
  }

  //  Crear el título "Autos Comprados"
  const titulo = document.createElement("h4");
  titulo.innerText = "Autos Comprados";
  lista.appendChild(titulo);

  //  Recorrer cada auto guardado en el array inventario
  inventario.forEach((auto, index) => {

    // ================= CONTENEDOR PRINCIPAL =================
    //  Caja general donde irá todo (imagen + texto + botón eliminar)
    const item = document.createElement("div");
    item.classList.add("item-inventario");

    // ================= CONTENEDOR IZQUIERDO =================
    //  Aquí se agrupan la imagen y el texto juntos
    const info = document.createElement("div");
    info.classList.add("item-info");

    // ================= IMAGEN =================
    // 👉 Crear la imagen pequeña del auto
    const img = document.createElement("img");

    // 👉 Poner la ruta que guardamos cuando se dio a "Comprar"
    img.src = auto.imagen;
    // 🔥 Esto es lo que hace que la imagen aparezca

    // ================= TEXTO =================
    //  Crear contenedor para nombre y precio
    const texto = document.createElement("div");

    //  Crear elemento para el nombre del auto
    const nombre = document.createElement("p");
    nombre.innerText = auto.nombre;

    //  Crear elemento para el precio
    const precio = document.createElement("span");
    precio.innerText = auto.precio;

    //  Meter nombre y precio dentro del contenedor de texto
    texto.appendChild(nombre);
    texto.appendChild(precio);

    //  Meter imagen y texto dentro del contenedor izquierdo
    info.appendChild(img);
    info.appendChild(texto);

    // ================= BOTÓN ELIMINAR =================
    //  Crear botón rojo con X
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("eliminar-auto");
    btnEliminar.innerText = "✖";

    //  Cuando se presione, eliminar ese auto del inventario
    btnEliminar.addEventListener("click", () => {
      eliminarAuto(index);
    });

    // ================= ARMAR TODO =================
    //  Meter info (imagen + texto) dentro del item principal
    item.appendChild(info);

    //  Meter botón eliminar dentro del item
    item.appendChild(btnEliminar);

    //  Finalmente meter todo dentro del panel inventario
    lista.appendChild(item);

  });
}


/* ================= BADGE ================= */

function actualizarBadge(){
  document.getElementById("badgeInventario").innerText = inventario.length;
}


/* ================= ABRIR / CERRAR ================= */

function abrirInventario(){
  document.getElementById("inventarioPanel").classList.add("mostrar");
}

function cerrarInventario(){
  document.getElementById("inventarioPanel").classList.remove("mostrar");
}

// ================= ELIMINAR AUTO DEL INVENTARIO =================
function eliminarAuto(index){

  // 👉 Elimina el auto del array según la posición
  inventario.splice(index, 1);

  // 👉 Volver a dibujar el inventario actualizado
  actualizarInventario();

  // 👉 Actualizar el número rojo (badge)
  actualizarBadge();
}



/* == CARRUSEL INFINITO OFERTAS == */

document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("ofertasTrack");
  if (!track) return;

  const cards = track.querySelectorAll(".oferta");

  // DUPLICAR LAS CARDS PARA EFECTO INFINITO

  cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  let position = 0;

  function moverCarrusel() {

    position += 1.5; // velocidad (puedes cambiar 1 por 2 o 3)

    track.style.transform = `translateX(-${position}px)`;

    //  cuando llegue a la mitad (fin original)

    if (position >= track.scrollWidth / 2) {
      position = 0;
    }
  }

  setInterval(moverCarrusel, 20); // menor número = más rápido

});
