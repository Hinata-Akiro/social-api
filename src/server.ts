import server from "./app";
import config from "./config/varibales";
import { dbConnection } from "./config/dbconnection";

const PORT = config.PORT || 3030


server.listen(PORT, async() => {
    await dbConnection();
    console.log(`Server is running on port http://localhost:${PORT}`)
})