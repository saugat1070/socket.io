import express,{Express} from 'express'
import { connectionDb } from './dataBase/connection'
export const app: Express = express()
//Database connection
connectionDb()

