import express,{Express, Request, Response} from 'express'
import { connectionDb } from './dataBase/connection'
export const app: Express = express()
import path from 'path'
//Database connection
connectionDb()

app.set("view engine","ejs");
app.set("views",path.join(__dirname+'/views'))
app.get("/",(req:Request,res:Response)=>{
    res.render("home.ejs")
})