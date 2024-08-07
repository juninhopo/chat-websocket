const socket = io();

const urlSearch = new URLSearchParams(window.location.search);

const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

function createMessage(data) {
  const messagesDiv = document.getElementById("messages");

  messagesDiv.innerHTML += `
      <div class="new_message">
          <label class="form-label">
              <span>
                ${dayjs(
                  data.createdAt
                ).format("DD/MM HH:mm")}
              </span> - 
              <strong>${data.username}:</strong> 
              <span>${data.text}</span>
          </label>
      </div>
    `;
}

document.getElementById(
  "username"
).innerHTML = `Olá <strong>${username}</strong> - Você está na sala: <strong>${room}</strong>`;

socket.emit(
  "select_room",
  {
    username,
    room,
  },
  (messages) => {
    messages.forEach((message) => {
      createMessage(message);
    });
  }
);

document
  .getElementById("message_input")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Impede a propagação do evento

      const text = event.target.value;

      if (!text.trim()) return; // Adiciona uma verificação para não enviar mensagens vazias

      const data = {
        room,
        text,
        username,
      };

      event.target.value = "";

      socket.emit("message", data);
    }
  });

document
  .getElementById("message_button")
  .addEventListener("click", (event) => {
    event.preventDefault(); // Impede a propagação do evento

    const messageInput = document.getElementById('message_input');

    const text = messageInput.value

    if (!text.trim()) return; // Adiciona uma verificação para não enviar mensagens vazias

    const data = {
      room,
      text,
      username,
    };
    
    messageInput.value = "";

    socket.emit("message", data);
  });

socket.on("message", (data) => {
  createMessage(data);
});

document.getElementById("logout").addEventListener("click", () => {
  window.location.href = "index.html";
});
