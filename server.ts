import { Socket } from "dgram";
import { app } from "./src/app";
import envConfig from "./src/envConfig/envConfig";
import { Server } from "socket.io";
//post -> emit
//get -> on
//api -> event
//request -> socket
//socket.on("haha",(data)=>{}) => data-> req.body 
let io:Server | undefined;
function startServer() {
  const server = app.listen(envConfig.portNumber, () => {
    console.log(`server started at ${envConfig.portNumber}`);
  });
  //connection of websocket and http
  /* const io = new Server(server, {
    cors: {
      origin: "http:localhost:5173",
    },
  }); */
  /* const io = new Server(server);
  io.on("connection",(socket)=>{ //client bata data lina on method use garne
    // console.log(socket.id)
    console.log("Someone connected (client)");
    socket.on("haha",(data)=>{
        console.log(data)
        io.emit("response",{
            messaage : "Data paaye hae maile"
        });
        // io.emit le sabai lai response pathau cha
        //socket.emit le request gareko lai matra response pathau cha

    })
  });
  //cors is only require for client server arch
   */
  io = new Server(server)

}

export function getSocketIo(){
    if(!io){
        throw new Error("socketio initialized vako chaina hae");
    }

    return io;
}

startServer();
