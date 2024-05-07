
        window.onload = function() {
            // Recupera los datos de la orden actual del localStorage
            const orderDataJSON = localStorage.getItem('currentOrder');
            if (orderDataJSON) {
                const orderData = JSON.parse(orderDataJSON);
                mostrarFactura(orderData);
            }
        };

        function mostrarFactura(orderData) {
            const facturaDiv = document.getElementById('factura');
            const tablaFactura = document.createElement('table');
            const header = tablaFactura.createTHead();
            const row = header.insertRow();
            const productoHeader = row.insertCell(0);
            productoHeader.textContent = 'Producto';
            const precioHeader = row.insertCell(1);
            precioHeader.textContent = 'Precio';
            const cantidadHeader = row.insertCell(2);
            cantidadHeader.textContent = 'Cantidad';
            const subtotalHeader = row.insertCell(3);
            subtotalHeader.textContent = 'Subtotal';

            const rowProducto = tablaFactura.insertRow();
            rowProducto.insertCell(0).textContent = orderData.productName;
            rowProducto.insertCell(1).textContent = '$' + orderData.totalPrice;
            rowProducto.insertCell(2).textContent = orderData.quantity;
            rowProducto.insertCell(3).textContent = '$' + (parseFloat(orderData.totalPrice) * orderData.quantity).toFixed(2);

            facturaDiv.appendChild(tablaFactura);
        }
        function mostrarFactura(orderData) {
            const facturaDiv = document.getElementById('factura');
            const tablaFactura = document.createElement('table');
            const header = tablaFactura.createTHead();
            const row = header.insertRow();
            const productoHeader = row.insertCell(0);
            productoHeader.textContent = 'Producto';
            const precioHeader = row.insertCell(1);
            precioHeader.textContent = 'Precio';
            const cantidadHeader = row.insertCell(2);
            cantidadHeader.textContent = 'Cantidad';
            const subtotalHeader = row.insertCell(3);
            subtotalHeader.textContent = 'Subtotal';

            const rowProducto = tablaFactura.insertRow();
            rowProducto.insertCell(0).textContent = orderData.productName;
            rowProducto.insertCell(1).textContent = '$' + orderData.totalPrice;
            rowProducto.insertCell(2).textContent = orderData.quantity;
            rowProducto.insertCell(3).textContent = '$' + (parseFloat(orderData.totalPrice) * orderData.quantity).toFixed(2);

            facturaDiv.appendChild(tablaFactura);
        }