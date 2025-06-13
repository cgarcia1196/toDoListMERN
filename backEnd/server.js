import express from "express"
import todoListRoutes from "./routes/todoListRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

connectDB()

//middleware
if(process.env.NODE_ENV !== "production"){
    app.use(cors())
}

app.use(express.json())
app.use("/api/lists", todoListRoutes)

if(process.env.NODE_ENV === "production"){
    //serve front end as static asset to back end 
    app.use(express.static(path.join(__dirname, "../frontEnd/reactFrontend/dist")))

    app.get("*", (req, res) =>{
        res.sendFile(path.join(__dirname, "../frontEnd/reactFrontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`server started on PORT:${PORT}`)
})