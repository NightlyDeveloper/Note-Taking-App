import cors from "cors"
import express from "express"
import dotenv from "dotenv"

import rateLimiter from "./middleware/rateLimiter.js"
import { connectDB } from "./config/db.js"
import notesRoutes from "./routes/notesRoutes.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 5001


app.use(cors({
    origin: "http://localhost:5173",
}))
app.use(express.json())
app.use(rateLimiter)




app.use("/api/notes", notesRoutes)

connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
});



