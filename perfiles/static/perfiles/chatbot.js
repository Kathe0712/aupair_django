const chatToggle = document.getElementById("chatToggle");
const chatContainer = document.getElementById("chatContainer");
const closeChat = document.getElementById("closeChat");
const messages = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function botResponse(input) {
    const pregunta = input
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (pregunta.includes("cerrar")) {
        return "Para cerrar sesión, usa el botón rojo \"Cerrar sesión\" que está arriba a la derecha.";
    } else if (pregunta.includes("actividad")) {
        return "En Actividades, la au pair registra lo que hizo con los niños: fecha, título y descripción. La familia puede verlas después.";
    } else if (pregunta.includes("horario")) {
        return "En Horarios se ve qué días y a qué horas trabaja la au pair, con una nota opcional por turno.";
    } else if (pregunta.includes("familia") || pregunta.includes("host")) {
        return "Cada familia (host parents) tiene su propia cuenta y puede ver las actividades y los horarios de su au pair.";
    } else if (pregunta.includes("sesion") || pregunta.includes("login") || pregunta.includes("entrar")) {
        return "Para entrar necesitas un usuario y una contraseña. Si no tienes cuenta, la crea el administrador.";
    } else if (pregunta.includes("hola") || pregunta.includes("ayuda")) {
        return "¡Hola! Puedes preguntarme por \"actividades\", \"horarios\", \"familia\" o \"cerrar sesión\".";
    } else if (pregunta.includes("salir") || pregunta.includes("gracias")) {
        return "¡Con gusto! Éxitos con tu proyecto 👋";
    } else {
        return "Lo siento, aún no tengo respuesta para esa pregunta. Prueba con \"actividades\", \"horarios\" o \"familia\".";
    }
}

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    userInput.value = "";

    const respuesta = botResponse(text);
    setTimeout(() => addMessage(respuesta, "bot"), 400);
}

function mostrarBienvenida() {
    addMessage("Hola 👋 Soy el asistente de la página. Pregúntame por \"actividades\", \"horarios\", \"familia\" o \"cerrar sesión\".", "bot");
}

chatToggle.addEventListener("click", () => {
    chatContainer.classList.add("active");
    if (messages.children.length === 0) mostrarBienvenida();
    userInput.focus();
});

closeChat.addEventListener("click", () => {
    chatContainer.classList.remove("active");
    messages.innerHTML = "";
});

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});