"use strict";


let products = [];

const requestData = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      console.log(products);
      renderProductsList(products);
    })
    .catch((error) => {
      console.error(error);
    });
};

requestData();


import "./partials/productList.js";
import "./partials/searchProducts.js";