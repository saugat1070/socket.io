import { Socket } from "socket.io";
import { getSocketIo } from "../../server";
import todoModel from "./todo.model";


export class TodoController{
    private io = getSocketIo()
    constructor(){
        console.log("I am in todo Controller")
      this.io.on("connection",(socket:Socket)=>{
        console.log("new client connected");
        socket.on("addTodo",(data)=> this.handleAddTodo(socket,data));
        socket.on("deleteTodo",(data)=>this.handleTodoDelete(socket,data))
      })  
    }

    private async handleAddTodo(socket:Socket,data:any){
        const {task,deadLine,status} = data
        try {
            await todoModel.create({
            task:task,
            dealLine:deadLine,
            status:status
        })

        const todoList = await todoModel.find()
        socket.emit("todoResponse",{
            status:"success",
            data : todoList
        })
        } catch (error) {
            socket.emit("todo_response",{
                status: "error",
                error
            })
        }

        
    }

    private async handleTodoDelete(socket:Socket,data:{id:string}){
        const {id} = data
        const deleteTodo = await todoModel.findByIdAndDelete(id);
        if(!deleteTodo){
            socket.emit("todoResponse",{
                status: "failed",
                message : "Todo is not found"
            })
            return;
        }
        const todoList = await todoModel.find()
        socket.emit("todoResponse",{
            message : "getting all details",
            data : todoList
        })


    }
}