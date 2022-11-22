const socket = io("http://localhost:3000");

// Event handler socket connection
socket.on("connect", () => {
    if (socket.connected) {
        console.log("Connected to server successfully!");
        console.log(socket); // {}
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    }
});

// Event handler socket disconnection
socket.on("disconnect", () => {
  console.log(socket.connected); // false
});