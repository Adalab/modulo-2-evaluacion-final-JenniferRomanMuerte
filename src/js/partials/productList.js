const productsListElement = document.querySelector(".js_productsList");

const renderProductsList = (products) => {
  for (const product of products) {
    // Creamos el elemento li
    const liElement = document.createElement("li");
    liElement.classList.add("articleList__list--li");
    liElement.setAttribute("id", product.id);

    // Creamos el elemento div que contiene la foto
    const divElement = document.createElement("div");
    divElement.classList.add("articleList__list--li--conatinerImg");

    // Creamos el elemento img
    const imgElement = document.createElement("img");
    imgElement.classList.add("articleList__list--li--conatinerImg--img");
    imgElement.setAttribute('src', 'https://placehold.co/150x200');

    // Añadimos la imagen a su contenedor
    divElement.appendChild(imgElement);

    // Creamos el elemento del titulo
    const h3Element = document.createElement('h3');
    h3Element.classList.add("articleList__list--li--title");
    h3Element.textContent = product.title;

    // Creamos el elemento del precio
    const spanElement = document.createElement('span');
    spanElement.classList.add("articleList__list--li--span");
    spanElement.textContent = `${product.price} €`;

    // Creamos el botón
    const btnElement = document.createElement('button');
    btnElement.classList.add("articleList__list--li--btn");
    btnElement.textContent = "Comprar";

    // Añadimos los elementos al li
    liElement.appendChild(divElement);
    liElement.appendChild(h3Element);
    liElement.appendChild(spanElement);
    liElement.appendChild(btnElement);

    // Añadimos los elementos  li al ul
    productsListElement.appendChild(liElement);
  }
};
