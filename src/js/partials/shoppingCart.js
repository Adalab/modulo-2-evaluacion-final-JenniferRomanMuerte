
const cartListElement = document.querySelector(".js_cartList");


// Función para pintar los productos del carrito
const renderCart = (productsInCart) =>{
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

    // Añadimos los elementos al li
    liElement.appendChild(divElement);
    liElement.appendChild(h3Element);
    liElement.appendChild(spanElement);


    // Añadimos los elementos  li al ul
    cartListElement.appendChild(liElement);
  }
}

// Si existe el item productsInCart en localStorage
if(localStorage.getItem("productsInCart")){
  /*
  Recuperamos su valor, lo pasamos a Json,
  y llamamos a la función para pintar el carrito
  */
  renderCart(JSON.parse(localStorage.getItem("productsInCart")));
}