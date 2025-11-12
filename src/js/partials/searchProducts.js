const inputSearch = document.querySelector('.js_searchInput');
const btnSearch = document.querySelector('.js_searchBtn');


// Función para buscar productos
const searchProducts = (ev) =>{
  // Capturamos el valor que se introduce en el input
  const textInputSearch = inputSearch.value;

  /*
  Obtenemos un nuevo array filtrando el array de productos,
  con los productos que en el título incluyan el texto del input
  */
  const productsFilter = products.filter((productFilter) => productFilter.title.includes(textInputSearch));

  // Vaciamos la lista
  productsListElement.innerHTML = "";

  // Llamamos a la función para pintarlos con el array que contiene los productos filtrados
  renderProductsList(productsFilter);

  // Si el input está vacio
  if(textInputSearch === ''){
    // Vaciamos el elemento de la lista
    productsListElement.innerHTML = "";
    // Llamamos a pintar el array con todos los productos
    renderProductsList(products);
  }
}

// Evento para el botón buscar con función anónima
btnSearch.addEventListener('click', searchProducts);

