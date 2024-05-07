// Variable global para almacenar el total
let totalOrder = 0;

// Función para mostrar/ocultar los ingredientes
function toggleIngredients(id) {
    const ingredients = document.getElementById(id);
    ingredients.style.display = ingredients.style.display === 'block' ? 'none' : 'block';
}

// Función para seleccionar un producto
function selectProduct(id, name, basePrice) {
    // Muestra el área del producto seleccionado
    const selectedProductContainer = document.getElementById('selected-product');
    selectedProductContainer.style.display = 'block';

    // Actualiza el nombre del producto seleccionado
    const selectedProductName = document.getElementById('selected-product-name');
    selectedProductName.textContent = name + ' - $' + basePrice;

    // Almacena la información del producto seleccionado en los atributos de datos
    selectedProductContainer.setAttribute('data-product-id', id);
    selectedProductContainer.setAttribute('data-product-price', basePrice);
}

// Función para realizar el pedido del producto seleccionado
function orderSelectedProduct() {
    // Obtiene la información del producto seleccionado
    const selectedProductContainer = document.getElementById('selected-product');
    const selectedProductId = selectedProductContainer.getAttribute('data-product-id');
    const selectedProductName = document.getElementById('selected-product-name').textContent;
    const basePrice = parseFloat(selectedProductContainer.getAttribute('data-product-price'));
    let total = basePrice;

    // Obtiene los ingredientes seleccionados y suma sus precios
    const ingredients = document.querySelectorAll('#selected-product-ingredients input[type="checkbox"]:checked');
    ingredients.forEach(ingredient => {
        const price = parseFloat(ingredient.getAttribute('data-price') || 0);
        total += price;
    });

    // Obtiene la cantidad seleccionada
    const quantity = parseInt(document.getElementById('selected-product-quantity').value);

    // Calcula el precio total
    total *= quantity;

    // Suma el total de esta orden al total global
    totalOrder += total;

    // Guarda los datos de la orden actual en el localStorage
    const orderData = {
        productId: selectedProductId,
        productName: selectedProductName,
        quantity: quantity,
        totalPrice: total.toFixed(2)
    };
    localStorage.setItem('currentOrder', JSON.stringify(orderData));

    // Muestra el mensaje de orden
    const confirmation = confirm('Has ordenado ' + quantity + ' ' + selectedProductName + '. Total: $' + total.toFixed(2) + '\n¿Deseas agregar otra orden?');

    // Si el usuario confirma, crea una tabla con la orden actual
    if (confirmation) {
        createOrderTable(orderData);
    }

    // Oculta el área del producto seleccionado después de ordenar
    selectedProductContainer.style.display = 'none';
}

// Función para crear una tabla con la orden actual
function createOrderTable(orderData) {
    // Crea una tabla
    const table = document.createElement('table');
    table.style.width = '100%'; // Ancho de la tabla
    table.style.margin = '0 auto'; // Centrar horizontalmente
    table.style.backgroundColor = 'rgba(255, 255, 255, 0.6)'; // Fondo blanco con opacidad
    table.style.border = '1px solid black'; // Borde negro

    // Crea una fila para el título
    const titleRow = table.insertRow();
    const titleCell = titleRow.insertCell();
    titleCell.colSpan = 3;
    titleCell.style.textAlign = 'center';
    titleCell.textContent = 'Orden Actual';
    titleCell.style.fontWeight = 'bold';

    // Crea una fila para la información del producto
    const productRow = table.insertRow();
    const productCell = productRow.insertCell();
    productCell.style.textAlign = 'center'; // Centra el contenido
    productCell.innerHTML = '<img src="' + orderData.productId + '.jfif" alt="' + orderData.productName + '" style="width: 50px; height: 50px;"> ' + orderData.productName;
    const priceCell = productRow.insertCell();
    priceCell.style.textAlign = 'center'; // Centra el contenido
    priceCell.textContent = '$' + orderData.totalPrice;
    const cancelCell = productRow.insertCell();
    cancelCell.style.textAlign = 'center'; // Centra el contenido
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';
    cancelButton.onclick = function() {
        // Elimina la tabla cuando se hace clic en Cancelar
        table.remove();
        // Elimina los datos de la orden actual del localStorage
        localStorage.removeItem('currentOrder');
    };
    cancelCell.appendChild(cancelButton);

    // Crea una fila para el botón de pago
    const paymentRow = table.insertRow();
    const paymentCell = paymentRow.insertCell();
    paymentCell.colSpan = 3;
    paymentCell.style.textAlign = 'right';
    const paymentButton = document.createElement('button');
    paymentButton.textContent = 'Pagar';
    paymentButton.onclick = function() {
        // Redirecciona a la página de factura
        window.location.href = 'factura.html';
    };
    paymentCell.appendChild(paymentButton);

    // Agrega la tabla al documento
    document.body.appendChild(table);
}

function calcularTotal() {
    let total = 0;
    const detallesProductos = [];

    const tablas = document.querySelectorAll('.container table');
    tablas.forEach(tabla => {
        const filas = tabla.querySelectorAll('tr:not(.total-row)');
        filas.forEach(fila => {
            const producto = fila.querySelector('td:first-child').textContent;
            const precioUnitario = parseFloat(fila.querySelector('td:nth-child(2)').textContent.replace('$', ''));
            const cantidad = parseInt(fila.querySelector('td:nth-child(3) input').value);
            const subtotal = parseFloat(fila.querySelector('td:last-child').textContent.replace('$', ''));

            total += subtotal;

            detallesProductos.push({
                producto: producto,
                precioUnitario: precioUnitario,
                cantidad: cantidad,
                subtotal: subtotal
            });
        });
    });

    return {
        total: total.toFixed(2),
        detalles: detallesProductos
    };
}

function irAPagar() {
    const total = calcularTotal();
    alert('Total a pagar: $' + total);
    // Aquí podrías redirigir a la página de pago, pasando el total como parámetro si es necesario
}


// Función para cargar la tabla de la orden al cargar la página
window.onload = function() {
    const orderDataJSON = localStorage.getItem('currentOrder');
    if (orderDataJSON) {
        const orderData = JSON.parse(orderDataJSON);
        createOrderTable(orderData);
    }
};

