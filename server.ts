import { app } from "./src/app";
import envConfig from './src/envConfig/envConfig'

function startServer(){
    app.listen(envConfig.portNumber,()=>{
    console.log(`server started at ${envConfig.portNumber}`);
})
}

startServer()