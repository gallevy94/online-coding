const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const blocksData = require("./blocksData");
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello");
});

//Socket.io connection
let mentorSocket = null;
let studentSocket = null;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  const modifiedData = blocksData.data.map((block) => {
    return { id: block.id, title: block.title, code: block.code };
  });
  socket.emit("send_data_blocks", modifiedData);

  if (!mentorSocket) {
    mentorSocket = socket;
    console.log(`mentor Connected`);
    socket.emit("role", "true");
  } else if (!studentSocket) {
    studentSocket = socket;
    console.log(`student Connected`);
    socket.emit("role", "false");
  }

  socket.on("send_block", (data) => {
    socket.broadcast.emit("receive_block", data);
  });

  socket.on("send_changes", ({ id, message }) => {
    socket.broadcast.emit("receive_changes", { id, message });
  });

  socket.on("send_solution", (data) => {
    const indexBlock = blocksData.data.find(
      (block) => data.message === block.solution
    );
    let isCorrect = false;
    if (indexBlock) {
      isCorrect = true;
    }
    console.log("isCorrect", isCorrect);
    socket.emit("receive_solution", isCorrect);
  });

  socket.on("disconnect", () => {
    if (socket === studentSocket) {
      studentSocket = null;
    } else if (socket === mentorSocket) {
      mentorSocket = null;
    }
    console.log("User Disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is Running");
});
