import  express, { json }  from "express";
import router from "./src/routes/index.js";
import  {sequelize}  from "./src/database/database.js";
import "./src/model/Auth.js";
import "./src/model/Client.js";
import cors from "cors"




const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3001 

async function main (){
    try{
/*         await sequelize.sync({force:true}); */

        app.use("/api", router)
        app.listen(PORT, () =>{
            console.log(`Server Listening on port ${PORT}`)
        })
    }catch(error){
        console.log(error)
    }


}

 main()


