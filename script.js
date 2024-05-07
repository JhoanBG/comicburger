// Define mesasDisponibles al inicio del archivo script.js
let mesasDisponibles = 8;
let mesaSeleccionada = null;

// Elementos del DOM
const chatbox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Función para mostrar el chat

function toggleChat() {
    var chatContainer = document.querySelector('.chat-container');
    chatContainer.style.display = (chatContainer.style.display === 'block') ? 'none' : 'block';
}

// Función para mostrar u ocultar los ingredientes
function toggleIngredients(id) {
    const ingredients = document.getElementById(id);
    ingredients.style.display = ingredients.style.display === 'block' ? 'none' : 'block';
}

// Función para enviar mensajes
function sendMessage() {
    const message = userInput.value;
    if (message.trim() === "") return;
    displayMessage("Tú: " + message);
    respondToMessage(message);
    userInput.value = "";
}

// Función para mostrar mensajes en el chat
function displayMessage(message) {
    const chatMessage = document.createElement("div");
    chatMessage.innerHTML = message; // Utilizamos innerHTML para interpretar las etiquetas HTML
    chatbox.appendChild(chatMessage);
}

// Función para responder a los mensajes del usuario
function respondToMessage(message) {
    let response;
    if (message.toLowerCase().includes("")) {
        response = "Hola, Buen día amigo, te doy la bienvenida a nuestro restaurante Comic Burguer. Es un placer tenerte con nosotros, por eso te doy las siguientes opciones para que pases un rato agradable y disfrutes al máximo. ¿Necesitas mesas?";
        // Agregar botones "Sí" y "No" para seleccionar si necesita mesas
        response += "<br><br><button onclick='reserveTable(true)'>Sí</button> <button onclick='reserveTable(false)'>No</button>";
    } else if (message.toLowerCase().includes("true")) {
        response = "¿Para cuántas personas sería la mesa?";
        // Opciones para seleccionar el número de personas
        response += "<br><button onclick='selectNumberOfPeople(\"1-2 personas\")'>1-2 personas</button> <br><br> <button onclick='selectNumberOfPeople(\"3-4 personas\")'>3-4 personas</button> <br><br> <button onclick='selectNumberOfPeople(\"5-6 personas\")'>5-6 personas</button> <br><br> <button onclick='selectNumberOfPeople(\"+7 personas\")'>+7 personas</button>";
        displayMessage("ChatBot: " + response);
    } else if (message.toLowerCase().includes("seleccionar mesa")) {
        if (mesasDisponibles > 0) {
            mesasDisponibles--;
            mesaSeleccionada = "Mesa " + (8 - mesasDisponibles);
            response = "Mesa " + mesaSeleccionada + " seleccionada. Quedan " + mesasDisponibles + " mesas disponibles. ¿Te gustaría ver nuestro menú?";
        } else {
            response = "Lo siento, no quedan mesas disponibles.";
        }
    } else if (message.toLowerCase().includes("menú") && mesaSeleccionada !== null) {
        response = "Aquí tienes nuestro menú: <a href='menu.html' target='_blank'>Ver menú</a>"; // Enlace al menú
    } else {
        response = "Lo siento, no entendí tu mensaje.";
    }
    displayMessage("ChatBot: " + response);
}

// Función para seleccionar el número de personas
function selectNumberOfPeople(numberOfPeople) {
    let response = "Has seleccionado " + numberOfPeople + ". Por favor, selecciona una mesa:";
    let availableTables = "";
    
    // Determinar qué mesas están disponibles según el número de personas
    if (numberOfPeople === "1-2 personas") {
        availableTables = "<br><br> <button id='mesa1' onclick='selectTable(\"mesa1\")'>Mesa 1</button> <br><br> <button id='mesa2' onclick='selectTable(\"mesa2\")'>Mesa 2</button>";
    } else if (numberOfPeople === "3-4 personas") {
        availableTables = "<button id='mesa3' onclick='selectTable(\"mesa3\")'>Mesa 3</button> <br><br> <button id='mesa4' onclick='selectTable(\"mesa4\")'>Mesa 4</button>";
    } else if (numberOfPeople === "5-6 personas") {
        availableTables = "<button id='mesa5' onclick='selectTable(\"mesa5\")'>Mesa 5</button> <br><br> <button id='mesa6' onclick='selectTable(\"mesa6\")'>Mesa 6</button>";
    } else if (numberOfPeople === "+7 personas") {
        availableTables = "<button id='mesa7' onclick='selectTable(\"mesa7\")'>Mesa 7</button> <br><br> <button id='mesa8' onclick='selectTable(\"mesa8\")'>Mesa 8</button>";
    }
    
    // Mostrar el mensaje y las mesas disponibles
    response += "<br>" + availableTables;
    response += "<br><br><button onclick='confirmReservation()'>Reservar</button> <br><br> <button onclick='cancelReservation()'>Cancelar</button>";
    
    displayMessage("ChatBot: " + response);
}

// Función para confirmar la reserva
function confirmReservation() {
    if (mesasDisponibles > 0) {
        mesasDisponibles--;
        mesaSeleccionada = "Mesa " + (8 - mesasDisponibles);
        displayMessage("ChatBot: Has reservado la mesa. ¿Selecciona la opción que deseas realizar a continuación?");
        const buttonsHTML = "<br><br><button onclick='redirectToPage(\"menu.html\")'>MENÚ</button> <br><br> <button onclick='redirectToPage(\"entradas.html\")'>ENTRADAS</button><br><br> <button onclick='redirectToPage(\"bebidas.html\")'>BEBIDAS</button>";
        displayMessage("ChatBot: " + buttonsHTML);
    } else {
        displayMessage("ChatBot: Lo siento, no quedan mesas disponibles.");
    }
}

// Función para cancelar la reserva
function cancelReservation() {
    displayMessage("ChatBot: La reserva de mesa ha sido cancelada.");
}

// Función para reservar una mesa o manejar la respuesta del usuario
function reserveTable(reserve) {
    if (reserve) {
        let response = "¿Para cuántas personas sería la mesa?";
        // Opciones para seleccionar el número de personas
        response += "<br><button onclick='selectNumberOfPeople(\"1-2 personas\")'>1-2 personas</button> <br><br> <button onclick='selectNumberOfPeople(\"3-4 personas\")'>3-4 personas</button> <br><br> <button onclick='selectNumberOfPeople(\"5-6 personas\")'>5-6 personas</button> <br><br> <button onclick='selectNumberOfPeople(\"+7 personas\")'>+7 personas</button>";
        displayMessage("ChatBot: " + response);
    } else {
        displayMessage("ChatBot: Entiendo. Si cambias de opinión, estoy aquí para ayudarte.");
    }
}

// Función para seleccionar la mesa
function selectTable(tableId) {
    mesaSeleccionada = tableId;
    const selectedTableButton = document.getElementById(tableId);
    selectedTableButton.classList.add("selected"); // Agregar clase CSS para resaltar la mesa seleccionada
}

// Función para redirigir a otra página
function redirectToPage(page) {
    window.location.href = page;
}