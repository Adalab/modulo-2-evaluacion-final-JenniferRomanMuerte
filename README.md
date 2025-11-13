🌟 AdaStore — Mini tienda online
<p align="center"> <img src="public/images/AdaStore.png" width="500" alt="AdaStore preview"> </p>
🛍️ Descripción

AdaStore es una tienda online demostrativa donde puedes:

Ver productos con imagen, título y precio

Buscarlos mediante un cuadro de búsqueda

Añadirlos al carrito

Gestionar cantidades

Mantener el carrito guardado entre recargas gracias a localStorage

Es un proyecto perfecto para practicar DOM, eventos, filtros, render dinámico y manejo de datos.

✨ Funcionalidades principales
📦 Productos

Listado dinámico de productos obtenidos de la API FakeStore

Tarjetas con imagen + título + precio + botón de compra

Indicación visual cuando un producto está en el carrito

🔎 Buscador

Filtrado en tiempo real

Búsqueda insensible a mayúsculas/minúsculas

Mensaje de "No se han encontrado productos" cuando no hay coincidencias

Botón para restablecer listado

🛒 Carrito de compra

Añadir productos

Incrementar / decrementar cantidades

Eliminar un producto o vaciar toda la cesta

Guardado persistente usando localStorage

Adaptación automática del layout según haya o no productos en el carrito

🧩 Estructura del proyecto
🗂️ HTML por partials

El HTML está dividido en bloques para mejor organización:

/partials
 ├─ header.html
 ├─ footer.html
 ├─ main.html
 └─ sections
      ├─ productList.html
      ├─ searchProducts.html
      └─ shoppingCart.html


Cada sección se inyecta en la estructura general para mantener el código modular y limpio.

🧠 JavaScript
📌 main.js

Punto de entrada

Hace la petición a la API

Arranca la interfaz inicial

📦 productList.js

Render de productos

Creación de tarjetas

Cambio de estilos si un producto está en el carrito

Manejo del botón Comprar / Eliminar

🔎 searchProducts.js

Lógica del buscador

Filtros dinámicos

Vista de mensajes y reseteo

🛒 shoppingCart.js

Render de la cesta

Incrementar / decrementar cantidades

Eliminar productos

Vaciar carrito

Sincronización con localStorage

Gestión del layout (main.noCart)

🎨 SCSS estructurado

El proyecto usa SCSS modular:

🎛 _variables.scss

Colores

Sombras

Pesos de fuente

Configuración del tema

🧱 _mixins.scss

Mixins para botones

Mixins de hover

Mixins de listas

Estilos reutilizables

📚 Estructura por componentes
/scss
 ├─ core
 │    ├─ _variables.scss
 │    ├─ _mixins.scss
 ├─ layout
 │    ├─ _main.scss
 │    ├─ _header.scss
 │    └─ _footer.scss
 └─ components
      ├─ _productList.scss
      ├─ _search.scss
      └─ _shoppingCart.scss

💾 Persistencia del carrito

Cada acción (añadir, eliminar, modificar cantidad) actualiza localStorage

Al recargar la página, la web reconstruye la cesta

La interfaz se sincroniza automáticamente

El layout cambia según haya o no productos en el carrito

🌐 Demo online

Puedes ver la web funcionando aquí:
👉 http://beta.adalab.es/modulo-2-evaluacion-final-JenniferRomanMuerte/