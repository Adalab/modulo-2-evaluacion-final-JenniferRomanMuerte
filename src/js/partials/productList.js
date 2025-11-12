const productsListElement = document.querySelector(".js_productsList");

// Array para capturar los productos en el carrito
let productsInCart = [];

// Función para crear los elementos li comunes en productList y en cartList
const createBaseProductLi = (product) => {
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

  // Añadimos los elementos al li
  liElement.appendChild(divElement);
  liElement.appendChild(h3Element);
  liElement.appendChild(spanElement);

  // Devuelvo el elemento li con los elementos comúnes creados
  return liElement;
};
// Función para pintar los productos
const renderProductsList = (products) => {
  // Recorremos el array de productos
  for (const product of products) {
    // Llamamos a la función que nos crea los elementos comunes de los li
    const liElement = createBaseProductLi(product);

    // Creamos el botón
    const btnElement = document.createElement("button");
    btnElement.classList.add("articleList__list--li--btn", "js_btnBuy");
    btnElement.textContent = "Comprar";

    // Añadimos el botóns al li
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
  if (productsInCart.length > 0) {
    // Recorremos el array
    for (const product of productsInCart) {
      // Llamamos a la función para cambiarle los estilos
      setProductMarkedInList(product.id, true);
    }
  }
};

/*
 Marca o desmarca un producto en la lista principal según
 si está en el carrito.
 Recibe el id del producto y un boolean (true si queremos añadirle la clase o false si queremos quitarsela)
 */
const setProductMarkedInList = (productId, isInCart) => {
  // buscamos el <li> de la lista de productos que tenga ese id
  const liElement = productsListElement.querySelector(`[id="${productId}"]`);
  // Si no existe, salimos
  if (!liElement) return;

  // Buscamos el botón dentro de ese <li>
  const btn = liElement.querySelector(".js_btnBuy");

  if (isInCart) {
    // Le añadimos la clase
    liElement.classList.add("isInCart");

    // Cambiamos el texto del botón
    btn.textContent = "Eliminar";
  } else {
    // Se la quitamos
    liElement.classList.remove("isInCart");

    // Cambiamos el texto del botón
    btn.textContent = "Comprar";
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

      // Llamamos a la función para añadirle la clase pasandole true
      setProductMarkedInList(productSelectElement.id, true);
    } else {
      // Si devuelve su índice es que está, entonces lo borramos
      productsInCart.splice(productIndex, 1);

      //Llamamos a la función para quitarle la clase pasandole false
      setProductMarkedInList(productSelectElement.id, false);
    }
  }

  // Llamamos a la funcion para que los pinte en la lista de carrito
  renderCart(productsInCart);

  // Llamamos a la función para sincronizar localStorage y la sección del carrito
  syncCartStorageAndView();

};


