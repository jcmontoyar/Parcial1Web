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

function generateTableHeadEvents(table, data) {
  // Crear head de la tabla y adicionar la columna de # manualmente
  let thead = table.createTHead();
  let row = thead.insertRow();
  let index = document.createElement("th");
  let text = document.createTextNode("#");
  index.appendChild(text);
  index.setAttribute("scope", "col");
  row.appendChild(index);

  // Adicionar columna por cada key existente
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    th.setAttribute("scope", "col");
    row.appendChild(th);
  }
}

function generateTableEvents(table, data) {
  // contador de numero de elementos
  let cont = 1;

  // Iterar todos los elementos
  for (let element of data) {
    // añadir una row y ver si el valor de squirrel es true, si lo es entonces la row va con clase de danger de boostrap
    let row = table.insertRow();
    if (element["squirrel"]) {
      row.classList.add("table-danger");
    }
    let cell = row.appendChild(document.createElement("th"));
    let text = document.createTextNode(cont);
    cell.appendChild(text);
    cell.setAttribute("scope", "row");
    cont++;

    // Iterar cada key en el elmento, crear celda de asignar el valor del key
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function generateTableHead2(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  let col = document.createElement("th");
  let text = document.createTextNode("#");
  col.appendChild(text);
  col.setAttribute("scope", "col");
  row.appendChild(col);

  col = document.createElement("th");
  text = document.createTextNode("Event");
  col.appendChild(text);
  col.setAttribute("scope", "col");
  row.appendChild(col);

  col = document.createElement("th");
  text = document.createTextNode("Correlation");
  col.appendChild(text);
  col.setAttribute("scope", "col");
  row.appendChild(col);
}


// Funcion para llenar tabla2
function doTable2(table, data, headers) {
  let promesa = new Promise((resolve, reject) => {
    generateTable2(table, data);
    generateTableHead2(table, headers);
    resolve();
  });
  return promesa;
}

obtener(link).then((result) => {
  // Obtener json detalles
  let data = JSON.parse(result);
  let titulo = document.getElementById("texto")
  let rowCartas = document.getElementById("cartas")
  cambiarComida("Burgers", data, titulo, rowCartas)
});


function cambiarComida(comida, data, titulo, rowCartas){
  for(let i of data){
    if(i["name"] == comida){
      hacerCartas(i, rowCartas, rowCartas);
      break;
    }
  }
  
  cambiarTitulo(comida, titulo);
}

function hacerCartas(data, rowCartas){
  for(let prod of  data){
    let card = document.createElement("div");
    div.classList.add("card")

    let imagen = document.createElement("img")
    imagen.classList.add("card-img-top")
    imagen.setAttribute("src", prod["image"]);
    imagen.setAttribute("alt", prod["name"]);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let titulo = document.createElement("h5");
    titulo.innerHTML = prod["name"];

    let par = document.createElement("p");
    par.innerHTML = prod["description"];

    let but = document.createElement("button");
    but.classList.add("btn btn-dark");
    but.innerHTML = "Add to car";

    cardBody.appendChild(titulo);
    cardBody.appendChild(par);
    cardBody.appendChild(but);

    div.appendChild(imagen);
    div.appendChild(cardBody);
    rowCartas.appendChild(div);
    
  }
}

function cambiarTitulo(comida, titulo){
  titulo.innerHtml = comida;
}
