const articleCart = document.querySelector(".articleCart");
const cartListElement = document.querySelector(".js_cartList");
const buttonDeleteAll = document.querySelector(".js_buttonDeleteAll");

// Función para pintar los productos del carrito
const renderCart = (productsInCart) => {
  // Vaciamos el elemento de la lista de productos en el carrito
  cartListElement.innerHTML = "";
  // Recorremos el array de productos en el carrito
  for (const product of productsInCart) {

    // Llamamos a la función que nos crea los elementos comunes de los li
    const liElement = createBaseProductLi(product);

    // Creamos un div para la x de eliminar
    const deleteElement = document.createElement("div");
    deleteElement.classList.add("articleList__list--li--div");
    deleteElement.classList.add("js_divDelete");
    deleteElement.textContent = "X";

    // Creamos un div para la gestion del quantity
    const quantityElement = document.createElement("div");
    quantityElement.classList.add("articleList__list--li--divQuantity");

    //Creamos un botón para decrementar la cantidad
    const decrementQuantity = document.createElement("button");
    decrementQuantity.classList.add(
      "articleList__list--li--divQuantity--btn",
      "js_btnDec"
    );
    decrementQuantity.textContent = "-";

    //Creamos un span para mostrar la cantidad
    const quantity = document.createElement("span");
    quantity.classList.add("articleList__list--li--divQuantity--span");
    quantity.textContent = product.quantity;

    //Creamos un botón para incrementar la cantidad
    const incrementQuantity = document.createElement("button");
    incrementQuantity.classList.add(
      "articleList__list--li--divQuantity--btn",
      "js_btnInc"
    );
    incrementQuantity.textContent = "+";

    // Añadimos los botones y el span al div de quantity
    quantityElement.appendChild(decrementQuantity);
    quantityElement.appendChild(quantity);
    quantityElement.appendChild(incrementQuantity);

    // Añadimos los elementos nuevos al li
    liElement.appendChild(deleteElement);
    liElement.appendChild(quantityElement);

    // Añadimos los elementos  li al ul
    cartListElement.appendChild(liElement);
  }

  // Capturamos todos los elementos de la X
  const divsDelete = document.querySelectorAll(".js_divDelete");
  // Los recorremos y les asignamos un evento con una función anónima
  for (const divDelete of divsDelete) {
    divDelete.addEventListener("click", deleteElementInCart);
  }

  // Capturamos todos los elementos del btnDecrement
  const btnsDecrement = cartListElement.querySelectorAll(".js_btnDec");
  // Los recorremos y les asignamos un evento con una función anónima
  for (const btnDecrement of btnsDecrement) {
    btnDecrement.addEventListener("click", decrementProductInCart);
  }

  // Capturamos todos los elementos del btnIncrement
  const btnsIncrement = cartListElement.querySelectorAll(".js_btnInc");
  // Los recorremos y les asignamos un evento con una función anónima
  for (const btnIncrement of btnsIncrement) {
    btnIncrement.addEventListener("click", incrementProductInCart);
  }
};

// Función para limpiar o actualizar el localStorage y ocultar la seccion cel carrito si no hay productos en él
const syncCartStorageAndView = () => {
  if (productsInCart.length === 0) {
    localStorage.removeItem("productsInCart");
    articleCart.classList.add("hidden");
  } else {
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    articleCart.classList.remove("hidden");
  }
};

/*
Función para buscar un elemento li, y su span de quantity
en el carrito de la compra desde los botones de increment y decrement
*/
const searchProductInCartForChangeQuantity = (ev) => {
  // Buscamos elemento padre (li) del elemento seleccionado
  const productLiElement = ev.currentTarget.closest("li");
  // Buscamos el elemento span que tiene la cantidad dentro de ese elemento li
  const spanQuantity = productLiElement.querySelector(
    ".articleList__list--li--divQuantity--span"
  );
  // Buscamos el objeto dentro del array de productsInCart con el id del li
  const productInCart = productsInCart.find(
    (product) => product.id === Number(productLiElement.id)
  );
  // Devolvemos un objeto con el objeto del producto y el elemento li
  return { productInCart, spanQuantity };
};

const decrementProductInCart = (ev) => {
  // Llamamos a la función de búsqueda para obtener los datos necesarios para gestionar el quantity
  const { productInCart, spanQuantity } =
    searchProductInCartForChangeQuantity(ev);

  // Bajamos 1 al la propiedad quantity del producto en el array del carrito
  productInCart.quantity--;

  // Si la cantidad llega a 0 elimamos el producto
  if (productInCart.quantity === 0) {
    // Buscamos su posición en el array del carrito
    const index = productsInCart.findIndex(
      (product) => product.id === productInCart.id
    );

    // Si lo encuentra (devuelve -1), lo eliminamos del array
    if (index !== -1) {
      productsInCart.splice(index, 1);
    }

    // Pintamos de nuevo la lista sin el producto eliminado
    renderCart(productsInCart);

    // Llamamos a la función para sincronizar localStorage y la sección del carrito
    syncCartStorageAndView();

    // Llamamos a la función para quitarle la clase porque lo hemos borrado del carrito
    setProductMarkedInList(productInCart.id, false);
  }

  // Si es más que 0
  else {
    // Actualizamos el texto del span con el valor del quantity del producto
    spanQuantity.textContent = productInCart.quantity;

    // Actualizamos el localStorage
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  }
};

const incrementProductInCart = (ev) => {
  // Llamamos a la función de búsqueda para obtener los datos necesarios para gestionar el quantity
  const { productInCart, spanQuantity } =
    searchProductInCartForChangeQuantity(ev);

  // Subimos 1 al la propiedad quantity del producto en el array del carrito
  productInCart.quantity++;

  // Actualizamos el texto del span con el valor del quantity del producto
  spanQuantity.textContent = productInCart.quantity;

  // Actualizamos el localStorage
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
};

// Funcion para borrar productos desde el producto en el carrito
const deleteElementInCart = (ev) => {
  // Accedemos al div con la X clicada
  const divElementClicked = ev.currentTarget;

  // Accedemos al elemento padre de éste que es el li
  const productElementClicked = divElementClicked.parentNode;

  // Recuperamos el id del elemento li seleccioando
  const idProduct = productElementClicked.id;

  // Buscamos el producto en el array de productos en el carrito con el id que tenemos del li
  const productSelectedForDelete = productsInCart.find(
    (product) => product.id === Number(idProduct)
  );

  //Comprobamos si ha obtenido el  producto
  if (productSelectedForDelete != "") {
    /*
    Obtenemos su índice en el array del carrito,
    a través del id del producto seleccionado
    */
    const productIndex = productsInCart.findIndex(
      (product) => product.id === productSelectedForDelete.id
    );

    // Si es distinto de -1(Sería que no lo encuentra) entonces lo borramos
    if (productIndex !== -1) {
      // Usamos su índice para borrralo
      productsInCart.splice(productIndex, 1);

      // Volvemos a pintar la lista del carrito con el nuevo array
      renderCart(productsInCart);

      // Llamamos a la función para sincronizar localStorage y la sección del carrito
      syncCartStorageAndView();

      // Llamamos a la función para quitarle el estilo ya que no está en el carrito
      setProductMarkedInList(idProduct, false);

    }
  }
};

// Función para borrar todos los productos del carrito
const deleteAllInCart = (ev) => {
  // Dejamos el array de productos en el carrito vacío
  productsInCart = [];

  // Llamamos a la función para sincronizar localStorage y la sección del carrito
  syncCartStorageAndView();

  // Capturamos todos los elementos de la lista de productos que tengan la clase isInCart
  const productsMarked = productsListElement.querySelectorAll(".isInCart");

  // Recorremos la lista de estos elementos
  for (const productMarked of productsMarked) {
    // Le quitamos la clase al elemento li
    productMarked.classList.remove("isInCart");
    // Capturamos el botón
    const btn = productMarked.querySelector(".js_btnBuy");
    // Si existe le cambiamos el texto
    if (btn) btn.textContent = "Comprar";
  }
};

buttonDeleteAll.addEventListener("click", deleteAllInCart);

// Si existe el item productsInCart en localStorage
if (localStorage.getItem("productsInCart")) {
  /*
  Recuperamos su valor, lo pasamos a Json,
  y llamamos a la función para pintar el carrito
  */
  renderCart(JSON.parse(localStorage.getItem("productsInCart")));
  // Guardamos los datos que recuperamos del localStorage en el array de productos en el carrito
  productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
} else {
  articleCart.classList.add("hidden");
}
