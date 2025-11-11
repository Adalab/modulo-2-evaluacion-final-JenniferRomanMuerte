const inputSearch = document.querySelector('.js_searchInput');
const btnSearch = document.querySelector('.js_searchBtn');

const searchProducts = (ev) =>{
  console.log('Salta el evento de buscar');
  const textInputSearch = inputSearch.value;
  console.log('texto en el input', textInputSearch);
  const productsFilter = products.filter((productFilter) => productFilter.title.includes(textInputSearch));
  console.log('Array de productos filtrados', productsFilter);
  productsListElement.innerHTML = "";
  renderProductsList(productsFilter);
  if(textInputSearch === ''){
     productsListElement.innerHTML = "";
    renderProductsList(products);
  }
}

btnSearch.addEventListener('click', searchProducts);

