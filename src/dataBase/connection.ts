import mongoose from "mongoose"; 
import envConfig from "../envConfig/envConfig";


export const connectionDb = async ()=>{
    await mongoose.connect(envConfig.dbUrl).then(()=>{
        console.log("Database is connected")
    }).catch((err)=>{
        console.log(err.message);
    })
}