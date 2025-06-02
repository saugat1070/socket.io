import { Socket } from "socket.io";
import { getSocketIo } from "../../server";
import todoModel from "./todo.model";


export class TodoController{
    private io = getSocketIo()
    constructor(){
        console.log("I am in todo Controller")
      this.io.on("connection",(socket:Socket)=>{
        console.log("new client connected");
        socket.on("addTodo",(data)=> this.handleAddTodo(socket,data))
      })  
    }

    private async handleAddTodo(socket:Socket,data:any){
        console.log(data)
        const {task,deadLine,status} = data
        try {
            const createTodo = await todoModel.create({
            task:task,
            dealLine:deadLine,
            status:status
        })
        socket.emit("todoResponse",{
            status:"success",
            data : createTodo
        })
        } catch (error) {
            console.log(error)
        }

        
    }
}