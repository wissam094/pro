const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expressWs = require("express-ws");
require("dotenv").config();

// set up express

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// set up mongoose

mongoose.connect(
  process.env.AUTH_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes

app.use("/users", require("./routes/userRouter"));
app.use("/post", require("./routes/postRoute"));
app.use("/comments", require("./routes/comment"));

//
const wsInstance = expressWs(app);
app.ws("/comment", (ws, req) => {
  ws.on("message", function incoming(message) {
    console.log(message);
    ws.broadcast(message);
  });

  ws.broadcast = function broadcast(data) {
    wsInstance.getWss().clients.forEach(function each(client) {
      client.send(data);
    });
  };
});

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
