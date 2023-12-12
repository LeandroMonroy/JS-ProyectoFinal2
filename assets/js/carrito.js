// ---------------------------- CARRITO DE COMPRAS PINTAR------------------------------
const tableCart = document.getElementById("tableCart");
const bagMessage = document.getElementById("bagMessage");
const nCart = document.getElementById("nCart");

const pintarCarrito = () => {
  if (localStorage.getItem("equipos") !== null) {
    bagMessage.innerHTML = "Your new Gadget is already.";
  } else {
    bagMessage.innerHTML = "Your Bag is empty.";
  }

  //pendiente innerHTML
  const template = document.querySelector("#templateCart").content;
  const fragment = document.createDocumentFragment();

  const productoLS = JSON.parse(localStorage.getItem("equipos"));

  Object.values(productoLS).forEach((producto) => {
    template.querySelector(".productoID").textContent = producto.id;
    template.querySelector(".productoTitle").textContent = producto.title;
    template.querySelector(".productoCantidad").textContent = producto.cantidad;
    template.querySelector(".productoPrice").textContent = producto.price;
    template.querySelector(".productoSubtotal").textContent =
      producto.price * producto.cantidad;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  const xTotal = Object.values(productoLS).reduce(
    (acc, { cantidad, price }) => acc + cantidad * price,
    0
  );
  bagMessage.innerHTML = "Your new Gadget is already. Total: $ " + xTotal;

  xCart(productoLS);
  tableCart.appendChild(fragment);
};

//Calcular subtotal
//const xCantidad = Object.values(carrito).reduce(acc, {quantity}) => acc + quantity, 0);

const xCart = (arreglo) => {
  const nCart = document.getElementById("nCart");
  const xCantidad = Object.values(arreglo).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  nCart.innerHTML = xCantidad;
};

pintarCarrito();
