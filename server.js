const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let responses = [];

io.on("connection", (socket) => {

    // Student submits willingness to pay
    socket.on("submitPrice", (data) => {

        responses.push({
            name: data.name || "Anonymous",
            price: Number(data.price)
        });

        io.emit("updateData", responses);
    });

    // Send current data to newly connected client
    socket.emit("updateData", responses);
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});