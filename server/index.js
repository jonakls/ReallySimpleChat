const {Server} = require("socket.io");
const {createServer} = require("node:http");
const express = require("express");

const app = express();
const port = process.env.PORT ?? 3000;
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.data.username = "Anonymous";

    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/client/index.html");
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});