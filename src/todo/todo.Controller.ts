import { Socket } from "socket.io";
import { getSocketIo } from "../../server";
import todoModel from "./todo.model";
import { ITodo, Status } from "./todo.Types";

export class TodoController {
  private io = getSocketIo();
  constructor() {
    console.log("I am in todo Controller");
    this.io.on("connection", (socket: Socket) => {
      console.log("new client connected");
      socket.on("addTodo", (data) => this.handleAddTodo(socket, data));
      socket.on("deleteTodo", (data) => this.handleTodoDelete(socket, data));
      socket.on("handleChangeStatus", (data) =>
        this.handleChangeStatus(socket, data)
      );
      socket.on("fetchPending", (data) =>
        this.fetchingPendingTask(socket, data)
      );
    });
  }

  private async handleAddTodo(socket: Socket, data: any) {
    const { task, deadLine, status } = data;
    try {
      await todoModel.create({
        task: task,
        dealLine: deadLine,
        status: status,
      });

      const todoList = await todoModel.find();
      socket.emit("todoResponse", {
        status: "success",
        data: todoList,
      });
    } catch (error) {
      socket.emit("todo_response", {
        status: "error",
        error,
      });
    }
  }

  private async handleTodoDelete(socket: Socket, data: { id: string }) {
    const { id } = data;
    const deleteTodo = await todoModel.findByIdAndDelete(id);
    if (!deleteTodo) {
      socket.emit("todoResponse", {
        status: "failed",
        message: "Todo is not found",
      });
      return;
    }
    const todoList = await todoModel.find();
    socket.emit("todoResponse", {
      message: "getting all details",
      data: todoList,
    });
  }

  private async handleChangeStatus(socket: Socket, data: any) {
    const { id } = data;
    console.log("id: " + id);
    const findTodo = await todoModel.findById(id);
    console.log("findTodo: " + findTodo);
    if (!findTodo) {
      socket.emit("todoResponse", {
        message: "Task is not found with this _id",
      });
      return;
    }

    const updateTodo = await findTodo.updateOne({
      status: Status.Completed,
    });
    if (updateTodo) {
      socket.emit("todoResponse", {
        message: "Task is completed",
      });
    } else {
      socket.emit("todoResponse", {
        message: "failed to update task",
      });
    }
  }

  private async fetchingPendingTask(socket: Socket, data: any) {
    try {
      console.log("i am in ");
      const pendingData = await todoModel.find({
        status: Status.Pending,
      });
      console.log(pendingData)
      if (!pendingData) {
        socket.emit("todoResponse", {
          message: "There is not pending task",
        });
        return;
      }

      socket.emit("todoResponse", {
        message: "fetching pending data",
        data: pendingData,
      });
    } catch (err) {
      socket.emit("todoResponse", {
        message: "something error on fetchingPending",
        error: err,
      });
    }
  }
}
