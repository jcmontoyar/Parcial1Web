// Funcion para obtener la data
function obtener(url) {
  let promesa = new Promise((resolve, reject) => {
    let exito = false;
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function () {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(req.statusText);
      }
    };
    req.send();
  });
  return promesa;
}

let link =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

var data;
var titulo;
var rowCartas;
var elCarro = [];
var itemsActuales = 0;
var cantidadTotal = 0.0;

$("#exampleModalCenter").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});

obtener(link).then((result) => {
  // Obtener json detalles
  data = JSON.parse(result);
  titulo = document.getElementById("titulo");
  rowCartas = document.getElementById("cartas");
  cambiarComida("Burguers", data, titulo, rowCartas);
});

function doComida(comida) {
  document.getElementById("cartas").style.display = "";
  document.getElementById("tabla").style.display = "none";
  rowCartas.innerHTML = "";
  cambiarComida(comida, data, titulo, rowCartas);
}

function cambiarComida(comida, data, titulo, rowCartas) {
  for (let i of data) {
    if (i["name"] == comida) {
      hacerCartas(i["products"], rowCartas);
      break;
    }
  }

  cambiarTitulo(comida, titulo);
}

function hacerCartas(data, rowCartas) {
  for (let prod of data) {
    let col = document.createElement("div");
    col.classList.add("col");
    col.classList.add("col-12");
    col.classList.add("col-sm-6");
    col.classList.add("col-lg-3");
    col.classList.add("col-md-6");
    col.setAttribute("align", "center");

    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("flex-column");
    card.classList.add("d-flex");

    col.appendChild(card);

    let imagen = document.createElement("img");
    imagen.classList.add("card-img-top");
    imagen.setAttribute("src", prod["image"]);
    imagen.setAttribute("alt", prod["name"]);
    imagen.setAttribute("width", "286");
    imagen.setAttribute("height", "180");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let titulo = document.createElement("h5");
    titulo.innerHTML = prod["name"];

    let par = document.createElement("p");
    par.innerHTML = prod["description"];

    let but = document.createElement("button");
    but.classList.add("btn");
    but.classList.add("btn-dark");
    but.classList.add("botonAbajo");
    but.setAttribute(
      "onclick",
      'adicionarAlCarro( "' + prod["name"] + '","' + prod["price"] + '")'
    );
    but.innerHTML = "Add to car";

    let price = document.createElement("h5");
    price.innerHTML = "$" + prod["price"];
    price.classList.add("priceAbajo");

    cardBody.appendChild(titulo);
    cardBody.appendChild(par);
    cardBody.appendChild(price);
    cardBody.appendChild(but);

    card.appendChild(imagen);
    card.appendChild(cardBody);
    rowCartas.appendChild(col);
  }
}

function adicionarAlCarro(descripcion, unitPrice) {
  itemsActuales++;
  cantidadTotal = cantidadTotal + parseFloat(unitPrice);
  document.getElementById("numItems").innerHTML = itemsActuales + " items";
  var added = false;
  for (let prod of elCarro) {
    if (prod["descripcion"] == descripcion) {
      prod["cantidad"]++;
      added = true;
      break;
    }
  }
  if (!added) {
    elCarro.push({
      item: elCarro.length + 1,
      descripcion: descripcion,
      unitPrice: unitPrice,
      cantidad: 1,
    });
  }
  actualizarTabla();
}

function cambiarTitulo(comida, titulo) {
  titulo.innerHTML = comida;
}

function mostrarCarro() {
  document.getElementById("titulo").innerHTML = "Order detail";
  document.getElementById("cartas").style.display = "none";
  document.getElementById("tabla").style.display = "";
}

function actualizarTabla() {
  let tablaHead = document.getElementById("tablaH");
  tablaHead.innerHTML = "";
  let cont = 1;
  for (let prod of elCarro) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");

    th.innerHTML = cont++;
    th.setAttribute("span", "row");
    tr.appendChild(th);

    let td = document.createElement("td");
    td.innerHTML = prod["cantidad"];
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = prod["descripcion"];
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = prod["unitPrice"];
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = parseFloat(prod["cantidad"]) * parseFloat(prod["unitPrice"]);
    tr.appendChild(td);

    tablaHead.appendChild(tr);
  }
  document.getElementById("total").innerHTML = "Total: $" + cantidadTotal;
}

function confirmar() {
  console.log(elCarro);
}

function cancelar() {
  elCarro = [];
  itemsActuales = 0;
  cantidadTotal = 0.0;
  actualizarTabla();
  document.getElementById("numItems").innerHTML = itemsActuales + " items";
}
