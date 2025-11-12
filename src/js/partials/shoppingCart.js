const cartListElement = document.querySelector(".js_cartList");
const buttonDeleteAll = document.querySelector('.js_buttonDeleteAll');


// Función para pintar los productos del carrito
const renderCart = (productsInCart) => {
  // Vaciamos el elemento de la lista de productos en el carrito
  cartListElement.innerHTML = "";
  // Recorremos el array de productos en el carrito
  for (const product of productsInCart) {
    // Creamos el elemento li
    const liElement = document.createElement("li");
    liElement.classList.add("articleList__list--li");
    liElement.setAttribute("id", product.id);

    // Creamos el elemento div que contiene la foto
    const divElement = document.createElement("div");
    divElement.classList.add("articleList__list--li--containerImg");

    // Creamos el elemento img
    const imgElement = document.createElement("img");
    imgElement.classList.add("articleList__list--li--containerImg--img");
    imgElement.setAttribute("src", "https://placehold.co/150x200");

    // Añadimos la imagen a su contenedor
    divElement.appendChild(imgElement);

    // Creamos el elemento del titulo
    const h3Element = document.createElement("h3");
    h3Element.classList.add("articleList__list--li--title");
    h3Element.textContent = product.title;

    // Creamos el elemento del precio
    const spanElement = document.createElement("span");
    spanElement.classList.add("articleList__list--li--span");
    spanElement.textContent = `${product.price} €`;

    // Creamos un div para la x de eliminar
    const deleteElement = document.createElement("div");
    deleteElement.classList.add("articleList__list--li--div");
    deleteElement.classList.add("js_divDelete");

    deleteElement.textContent = "X";

    // Añadimos los elementos al li
    liElement.appendChild(divElement);
    liElement.appendChild(h3Element);
    liElement.appendChild(spanElement);
    liElement.appendChild(deleteElement);

    // Añadimos los elementos  li al ul
    cartListElement.appendChild(liElement);
  }

  const divsDelete = document.querySelectorAll(".js_divDelete");
  for (const divDelete of divsDelete) {
    divDelete.addEventListener("click", deleteElementInCart);
  }
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
    Obtenemos su índice en el array del carrito de la compra,
    através del id del producto seleccionado
    */
    const productIndex = productsInCart.findIndex(
      (product) => product.id === productSelectedForDelete.id
    );

    // Si es distinto de -1(Sería que no lo encuentra) entonces lo borramos
    if(productIndex !== -1){
     // Usamos su índice para borrralo
      productsInCart.splice(productIndex,1);
      // Actualizamos el array a localStorage pasandolo a string
      localStorage.setItem('productsInCart',JSON.stringify(productsInCart));

      // Volvemos a pintar la lista del carrito con el nuevo array
      renderCart(productsInCart);

      // Llamamos a la función para cambiarle el estilo de nuevo en la lista de productos
      changeStyleIfIsFavorite(productElementClicked);
    }
  }

};

// Función para borrar todos los productos del carrito
const deleteAllInCart = (ev) =>{

  // Dejamos el array de productos en el carrito vacío
  productsInCart = [];
  // Llamamos a pintar de nuevo la lista del carrito
  renderCart(productsInCart);
  // Borramos los productos del localStorage
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

  // Capturamos todos los elementos de la lista de productos que tengan la clase isInCart
  const productsMarked = productsListElement.querySelectorAll(".isInCart");

  // Recorremos la lista de estos elementos
  for(const productMarked of productsMarked){

    // Le quitamos la clase al elemento li
    productMarked.classList.remove("isInCart");
    // Capturamos el botón
    const btn = productMarked.querySelector(".js_btnBuy");
    // Si existe le cambiamos el texto
    if (btn) btn.textContent = "Comprar";
  }

}

buttonDeleteAll.addEventListener('click', deleteAllInCart);

// Si existe el item productsInCart en localStorage
if (localStorage.getItem("productsInCart")) {
  /*
  Recuperamos su valor, lo pasamos a Json,
  y llamamos a la función para pintar el carrito
  */
  renderCart(JSON.parse(localStorage.getItem("productsInCart")));
  // Guardamos los datos que recuperamos del localStorage en el array de productos en el carrito
  productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
}
