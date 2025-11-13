// ...existing code...

# AdaStore

![AdaStore](public/images/AdaStore.png)

Descripción
- AdaStore es una pequeña tienda online demostrativa. Permite ver una lista de productos, buscarlos, añadirlos a una cesta y gestionar la compra de forma sencilla desde la interfaz.

Funcionalidades principales
- Listado de productos con imagen, título, precio y botón para añadir al carrito.
- Búsqueda en tiempo real: filtra los productos según el texto introducido.
- Carrito de compra:
  - Añadir productos, aumentar o disminuir cantidades y eliminar elementos, o vaciar el carrito.
  - El contenido del carrito se guarda en localStorage para persistir entre recargas del navegador.
- Indicadores visuales en la lista de productos para los artículos que ya están en la cesta.

Partición del HTML y partials
- El HTML está dividido en plantillas parciales para facilitar su organización:
  - header.html — cabecera y navegación.
  - footer.html — pie de página.
  - main.html — estructura principal donde se insertan las secciones.
  - sections/productList.html — bloque donde se renderiza el listado de productos.
  - sections/searchProducts.html — bloque con el formulario/campo de búsqueda.
  - sections/shoppingCart.html — bloque con la vista del carrito.
- Estas partials se combinan para componer la página completa, facilitando la lectura y el mantenimiento.

Estructura del JavaScript
- main.js — punto de entrada: carga datos y coordina la inicialización de las secciones.
- partials/productList.js — funciones para renderizar la lista y los elementos individuales, marcar productos ya añadidos y manejar la acción de añadir al carrito.
- partials/searchProducts.js — lógica de filtrado y eventos del campo de búsqueda.
- partials/shoppingCart.js — gestión del carrito: render, sincronización con localStorage, incremento/decremento y eliminación de productos.

SCSS: variables y mixins
- El proyecto usa SCSS modular: hay ficheros de variables y mixins reutilizables.
  - _variables.scss — contiene colores, tipografías y valores reutilizables.
  - _mixins.scss — mixins para reutilización de estilos y pequeñas utilidades.
- La organización en módulos permite mantener estilos claros por componentes (header, secciones, carrito, listado).

Persistencia del carrito
- El carrito se sincroniza con localStorage:
  - Al añadir/quitar productos se actualiza tanto la vista como el almacenamiento.
  - Al recargar la página se carga el estado guardado y se refleja en la interfaz.
  - Esto garantiza que el usuario no pierda su selección entre sesiones del navegador.

Para ver la web

 En GitHub Pages: http://beta.adalab.es/modulo-2-evaluacion-final-JenniferRomanMuerte/