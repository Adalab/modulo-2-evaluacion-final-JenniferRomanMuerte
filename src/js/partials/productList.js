const productsListElement = document.querySelector(".js_productsList");

let productsInCart = [];

const renderProductsList = (products) => {
  for (const product of products) {
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

    // Creamos el botón
    const btnElement = document.createElement("button");
    btnElement.classList.add("articleList__list--li--btn", "js_btnBuy");
    btnElement.textContent = "Comprar";

    // Añadimos los elementos al li
    liElement.appendChild(divElement);
    liElement.appendChild(h3Element);
    liElement.appendChild(spanElement);
    liElement.appendChild(btnElement);

    // Añadimos los elementos  li al ul
    productsListElement.appendChild(liElement);
  }
  const allbtnProducts = document.querySelectorAll(".js_btnBuy");
  for (const btnProduct of allbtnProducts) {
    btnProduct.addEventListener("click", (ev) => addingCart(ev, products));
  }
};

// Función para añadir elementos al carrito
const addingCart = (ev, products) => {
  // Accedemos al elemento clicado
  const btnClicked = ev.currentTarget;

  //Accedemos al padre del elemento clicado (li)
  const productSelectElement = btnClicked.parentNode;

  // Recuperamos el id que asociamos al li
  const idProduct = productSelectElement.id;

  // Buscamos el producto en el array de productos con el id que tenemos del li
  const productSelected = products.find(
    (product) => product.id === Number(idProduct)
  );
  /*
  Comprobamos si ha obtenido algún producto,
  si hemos recuperado el producto lo añadimos al array del carro de la compra
  */
  if (productSelected != "") {
    const productIndex = productsInCart.findIndex(
      (product) => product.id === productSelected.id
    );

    if(productIndex === -1){
      productsInCart.push(productSelected);
      console.log('producto añadido');
    }
    else{
      productsInCart.splice(productIndex,1);
      console.log('producto eliminado');
    }

  }

  // Llamamos a la funcion para que los pinte en la lista de carrito
  renderCart(productsInCart);

  // Llamamos a una función para cambiar lois estilos del elemento seleccionado
  changeStyleIfIsFavorite(productSelectElement);
};

const changeStyleIfIsFavorite = (productSelectElement) => {
  console.log("Elemento Seleccionado como favorito", productSelectElement);

  // Añadimos o quitamos la clase al elemento li(padre) para darle otros estilos
  productSelectElement.classList.toggle("isInCart");
};
