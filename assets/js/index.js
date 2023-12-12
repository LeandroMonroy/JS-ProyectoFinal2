document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

// ---------------------------- GET DATA ------------------------------
const fetchData = async () => {
  try {
    const res = await fetch("./assets/json/data.json");
    const data = await res.json();

    /*Filtro por categoría*/
    const filtro = "true"; //Más adelante agregar funcionalidad desde la página
    const equipo = data.filter((producto) => producto.index === filtro);

    //Detecto si existe ya información en el localStorage, de ser así, paso el contenido parseado al array
    if (localStorage.getItem("equipos") !== null) {
      carrito = JSON.parse(localStorage.getItem("equipos"));
      //console.log(carrito);
    }
    xCart(carrito);
    pintarHCards(equipo);

    detectarBuy(equipo);
  } catch (error) {
    console.log(error);
  } /*finally {
      spinner.innerHTML = "";
    }*/
};

// ---------------------------- PINTAR EQUIPOS ------------------------------
const contenedorCards = document.querySelector("#contenedorCards");
const pintarHCards = (equipo) => {
  const templateCards = document.querySelector("#templateCards").content;
  const fragment = document.createDocumentFragment();

  equipo.forEach((producto) => {
    templateCards.querySelector(".img-bot").setAttribute("src", producto.img);
    templateCards.querySelector(".cardH-Title").textContent = producto.title;
    templateCards.querySelector(".cardH-Subtitle").textContent =
      producto.subtitle;
    templateCards.querySelector(".cardH-Subtitle").textContent =
      producto.description;

    templateCards.querySelector(".cbuy").dataset.id = producto.id;

    const clone = templateCards.cloneNode(true);
    fragment.appendChild(clone);
  });
  contenedorCards.appendChild(fragment);
};

// ---------------------------- DETECTAR BOTÓN BUY Y PUJAR CARRITO ------------------------------
let carrito = {};

//Detecto si existe ya información en el localStorage, de ser así, paso el contenido parseado al array
if (localStorage.getItem("equipos") !== null) {
  carrito = JSON.parse(localStorage.getItem("equipos"));
  //console.log(carrito);
}

const detectarBuy = (equipo) => {
  const botones = document.querySelectorAll(".cbuy");
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("click");

      const producto = equipo.find((item) => item.id === btn.dataset.id);

      producto.cantidad = 1;
      if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
      }
      carrito[producto.id] = { ...producto };
      //console.log("Carrito -", carrito);

      //Guardo carrito en LocalStorage, de ahora en adelante, los datos se obtendrán de acá
      localStorage.setItem("equipos", JSON.stringify(carrito));

      //pintarCarrito();
    });
  });
};

const xCart = (arreglo) => {
  const nCart = document.getElementById("nCart");
  const xCantidad = Object.values(arreglo).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  nCart.innerHTML = xCantidad;
};
