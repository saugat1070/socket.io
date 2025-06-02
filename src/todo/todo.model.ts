import mongoose from "mongoose";
import { ITodo, Status } from "./todo.Types";

const TodoSchema = new mongoose.Schema<ITodo>({
    task : {
        type: String,
    },
    dealLine:String,
    status:{
        type:String,
        enum:[Status.Completed,Status.Pending],
        default:Status.Pending
    }


})


export default mongoose.model("Todo",TodoSchema);