document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

// ---------------------------- GET DATA ------------------------------
const fetchData = async () => {
  try {
    const res = await fetch("./assets/json/data.json");
    const data = await res.json();

    /*Filtro por categoría*/
    const filtro = "MacBook"; //Más adelante agregar funcionalidad desde la página
    const equipo = data.filter(
      (producto) => producto.type === filtro && producto.index === "false"
    );

    //Detecto si existe ya información en el localStorage, de ser así, paso el contenido parseado al array
    if (localStorage.getItem("equipos") !== null) {
      carrito = JSON.parse(localStorage.getItem("equipos"));
      //console.log(carrito);
    }
    xCart(carrito);
    pintarCards(equipo);

    detectarBuy(equipo);
  } catch (error) {
    console.log(error);
  } /*finally {
    spinner.innerHTML = "";
  }*/
};

// ---------------------------- PINTAR EQUIPOS ------------------------------

const contenedorProductos = document.querySelector(".contenedorProductos");
const pintarCards = (equipo) => {
  const templateProductos =
    document.querySelector("#templateProductos").content;
  const fragment = document.createDocumentFragment();

  equipo.forEach((producto) => {
    templateProductos
      .querySelector(".card-img-top")
      .setAttribute("src", producto.img);
    templateProductos.querySelector(".card-title").textContent = producto.title;
    templateProductos.querySelector(".card-subtitle").textContent =
      producto.subtitle;
    templateProductos.querySelector(".card-price").textContent =
      producto.priceInterval;
    templateProductos.querySelector(".card-btn-buy").dataset.id = producto.id;

    const clone = templateProductos.cloneNode(true);
    fragment.appendChild(clone);
  });
  contenedorProductos.appendChild(fragment);
};

// ---------------------------- DETECTAR BOTÓN BUY Y PUJAR CARRITO ------------------------------
let carrito = {};

const detectarBuy = (equipo) => {
  const botones = document.querySelectorAll(".card-btn-buy");
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
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
      xCart(carrito);
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
