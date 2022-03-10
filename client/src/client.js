// Adding message
const addMessage = (messageContent, user) => {
  const messages = document.querySelector("#messages");
  const newMessage = document.createElement("li");
  newMessage.innerHTML = user + ": " + messageContent;

  messages.appendChild(newMessage);
  messages.scrollTop = messages.scrollHeight;
}

// Sending message
const onChatSubmitted = (sock) => (event) => {
  event.preventDefault();

  const input = document.querySelector("#chat");
  const text = input.value;
  input.value = "";

  sock.emit("message", text);
}

// When the scripts has been loaded
document.addEventListener("DOMContentLoaded", (event) => {
  const sock = io();

  // Prompt for username
  let username = prompt("Enter your username");
  sock.emit("updateUsername", username);

  console.log(sock.username);

  sock.on("message", addMessage);

  document
    .querySelector("#chat-form")
    .addEventListener("submit", onChatSubmitted(sock));
});
