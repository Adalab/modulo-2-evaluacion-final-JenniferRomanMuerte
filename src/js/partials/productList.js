const productsListElement = document.querySelector(".js_productsList");

// Array para capturar los productos en el carrito
let productsInCart = [];

// Función para pintar los productos
const renderProductsList = (products) => {
  // Recorremos el array de productos
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
    if (product.image != undefined) {
      imgElement.setAttribute("src", product.image);
    } else {
      imgElement.setAttribute("src", "https://placehold.co/150x200");
    }

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

  // Capturamos todos los botones depués de pintarlos
  const allbtnProducts = document.querySelectorAll(".js_btnBuy");
  // Recorremos el array de botones
  for (const btnProduct of allbtnProducts) {
    /*
    A cada uno le asignamos un evento y una función anónima,
    donde le pasamos el evento y el array de productos
    */
    btnProduct.addEventListener("click", (ev) => addingCart(ev, products));
  }

  // Si hay productos en el carrito
  if (productsInCart != "") {
    // Recorremos el array
    for (const product of productsInCart) {
      /*
      Obtenemos el elemento li de la lista de productos,
      buscando con el id del li de productos en el carrito,
      el elemento li con el atributo id igual al id del producto en el carrito
      */
      const liInProducts = productsListElement.querySelector(
        `[id="${product.id}"]`
      );
      // Si existe
      if (liInProducts) {
        // Le añadimos la clase isInCart
        liInProducts.classList.add("isInCart");
        // Capturamos el botón
        const btn = liInProducts.querySelector(".js_btnBuy");
        // Le cambiamos el texto
        if (btn) btn.textContent = "Eliminar";
      }
    }
  }
};

// Función para añadir elementos al carrito
const addingCart = (ev, products) => {

  // Mostramos la sección del carrito
  articleCart.classList.remove("hidden");

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

  //Comprobamos si ha obtenido algún producto
  if (productSelected != "") {
    /*
    Obtenemos su índice en el array del carrito de la compra,
    através del id del producto seleccionado
    */
    const productIndex = productsInCart.findIndex(
      (product) => product.id === productSelected.id
    );

    // Si devuelve -1 es que no está, entonces lo añadimos
    if (productIndex === -1) {
      // Le añadimos la propiedad quantity con valor 1
      productSelected.quantity = 1;

      // Lo añadimos al array de productos en el carrito
      productsInCart.push(productSelected);
      console.log('productos en el carro con la propiedad  quantity', productsInCart);
      // Añadimos el array a localStorage pasandolo a string
      localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

    } else {

      // Si devuelve su índice es que está, entonces lo borramos
      productsInCart.splice(productIndex, 1);

      // Si el array de productos en el carrito se queda vacio borramos el item de localStorage
      if (productsInCart.length === 0) {
        localStorage.removeItem("productsInCart");
        articleCart.classList.add('hidden');
      } else {
        // Si aún quedan productos el el array del carrito, actualizamos el localStorage
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
      }
    }
  }

  // Llamamos a la funcion para que los pinte en la lista de carrito
  renderCart(productsInCart);

  // Llamamos a una función para cambiar lois estilos del elemento seleccionado
  changeStyleIfIsFavorite(productSelectElement);
};

// Función para cambiar el estilo si está seleccionado
const changeStyleIfIsFavorite = (productSelectElement) => {
  // Accedemos al elemento li hijo de productsListElement por su atributo id
  const productSelectElementInProducts = productsListElement.querySelector(
    `[id="${productSelectElement.id}"]`
  );

  // Añadimos o quitamos la clase al elemento li(padre) para darle otros estilos
  productSelectElementInProducts.classList.toggle("isInCart");

  // Accedemos al boton
  const btnProductSelectElement =
    productSelectElementInProducts.querySelector(".js_btnBuy");

  // Capturamos el texto y lo comparamos para cambiarle el texto dependiendo de si está seleccionado
  if (btnProductSelectElement.textContent === "Comprar") {
    btnProductSelectElement.textContent = "Eliminar";
  } else {
    btnProductSelectElement.textContent = "Comprar";
  }
};
