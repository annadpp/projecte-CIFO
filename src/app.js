/*ESCONDER SPLASH*/
function empieza() {
  document.getElementById("splash").classList.toggle("fade");
}

/*FLECHAS Y REDIRECCIONES*/
/*Volver a inicio*/
function indice() {
  location.replace("indice.html#splash");
}

/*Volver a capítulo 1*/
function cap1() {
  location.replace("cap1.html");
}

/*Volver a capítulo 2a*/
function cap2a() {
  location.replace("cap2a.html");
}

/*Volver a capítulo 1*/
function cap3() {
  location.replace("cap3.html");
}

/*MENÚ HAMBURGUESA*/
function onClickMenu() {
  document.getElementById("menu").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
  document.getElementById("sub-bg").classList.toggle("change-bg");
}

/*SLIDER ENIGMA 1*/
/*Cambio de imágenes + aparición de botón*/
function spotify() {
  document.querySelector(".spotify").src = "images/carrouselmal.jpg";
  document.querySelector(".spotify").style.border = "none";
}

function whatsApp() {
  document.querySelector(".whatsapp").src = "images/carrouselmal.jpg";
  document.querySelector(".whatsapp").style.border = "none";
}

function story() {
  document.querySelector(".story").src = "images/carrouselbien.png";
  document.querySelector(".story").style.border = "none";
  document.querySelector("#slider").classList.add("show");
}

/*CONTRASEÑA ENIGMA 2a*/
/*Indicar contraseña correcta + alertas y redirección*/
function password(event) {
  let input = document.querySelector("#input");
  if (
    input.value === "recapacitar" ||
    input.value === "Recapacitar" ||
    input.value === "RECAPACITAR"
  ) {
    alert("¡Respuesta correcta!");
    event.preventDefault();
    location.replace("cap2b.html");
  } else {
    alert("¡Vuelve a probar! ¡Recapacita!");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", password);
