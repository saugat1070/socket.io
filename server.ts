import { app } from "./src/app";
import envConfig from "./src/envConfig/envConfig";
import { Server } from "socket.io";
import { TodoController } from "./src/todo/todo.Controller";
let io: Server | undefined;
function startServer() {
  const server = app.listen(envConfig.portNumber, () => {
    console.log(`server started at ${envConfig.portNumber}`);
  });
  //connection of websocket and http
  io = new Server(server);
}

startServer();

export function getSocketIo(): Server {
    if (!io) {
        throw new Error("socketio initialized vako chaina hae");
    }
    return io;
}

const controller = new TodoController()
