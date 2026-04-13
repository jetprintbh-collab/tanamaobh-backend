import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const API = "https://tanamaobh-api.onrender.com/api"
app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
  res.send("🔥 Backend Tá Na Mão rodando")
})

app.listen(3000, ()=>{
  console.log("Servidor rodando na porta 3000")
})
