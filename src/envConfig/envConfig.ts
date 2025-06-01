import dotenv from 'dotenv';
dotenv.config()

const envConfig = {
    portNumber : process.env.PORT_NUMBER,
    dbUrl : process.env.DB_URL as string
}

export default envConfig;