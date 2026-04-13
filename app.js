import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

dotenv.config()

const app = express()

// 🔥 IMPORTANTE: vem ANTES das rotas
app.use(cors())
app.use(express.json())

// usuário fake
const user = {
  id: 1,
  nickname: "junior",
  password_hash: "$2b$10$c37PIG04MkPptQVscQJ7zOtDbPZ1RStxVXsQDpJMD6z/bgkf4DyH6"
}

// ✅ UMA ÚNICA rota login
app.post("/api/login", async (req, res)=>{
  const { nickname, password } = req.body

  if(nickname !== user.nickname){
    return res.status(401).json({ error: "Usuário inválido" })
  }

  const valid = await bcrypt.compare(password, user.password_hash)

  if(!valid){
    return res.status(401).json({ error: "Senha inválida" })
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )

  res.json({ token })
})

// rota teste
app.get("/", (req,res)=>{
  res.send("🔥 Backend Tá Na Mão rodando")
})

app.listen(3000, ()=>{
  console.log("Servidor rodando na porta 3000")
})
