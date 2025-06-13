import express from "express"
import todoListRoutes from "./routes/todoListRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5001

connectDB()

//middleware
app.use(cors())
app.use(express.json())
app.use("/api/lists", todoListRoutes)


app.listen(PORT, () => {
    console.log(`server started on PORT:${PORT}`)
})