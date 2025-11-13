const inputSearch = document.querySelector(".js_searchInput");
const btnSearch = document.querySelector(".js_searchBtn");



// Función para buscar productos
const searchProducts = (ev) => {
  // Capturamos el valor que se introduce en el input
  const textInputSearch = inputSearch.value.trim().toLowerCase();

  /*
  Obtenemos un nuevo array filtrando el array de productos,
  con los productos que en el título incluyan el texto del input
  */
  const productsFilter = products.filter((productFilter) =>
    productFilter.title.toLowerCase().includes(textInputSearch)
  );

  // Si no se encuentran productos, osea la longitud del array es 0
  if (productsFilter.length === 0) {
    // Mostramos el mensaje quitandole la clase
    containerMessage.classList.remove("hidden");
    // Vaciamos la lista de productos
    productsListElement.innerHTML = "";
    // Paramos la ejecución
    return;

  } else {
     // Vaciamos la lista antes de pintarla de nuevo
    productsListElement.innerHTML = "";

    // Llamamos a la función para pintarlos con el array que contiene los productos filtrados
    renderProductsList(productsFilter);
  }

  // Si el input está vacio
  if (textInputSearch === "") {
   // Llamamos a la función para resetear la lista de productos
     resetProductList();
  }
};

// Evento para el botón buscar con función anónima
btnSearch.addEventListener("click", searchProducts);
