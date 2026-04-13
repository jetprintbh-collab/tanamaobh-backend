import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const users = [
  {
    id: 1,
    nickname: "junior",
    password_hash: "$2b$10$c37PIG04MkPptQVscQJ7zOtDbPZ1RStxVXsQDpJMD6z/bgkf4DyH6" // depois trocamos
  }
]

app.post("/api/login", async (req, res)=>{
  const { nickname, password } = req.body

  const user = users.find(u => u.nickname === nickname)

  if(!user){
    return res.status(401).json({ error: "Usuário não encontrado" })
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

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
  res.send("🔥 Backend Tá Na Mão rodando")
})

app.listen(3000, ()=>{
  console.log("Servidor rodando na porta 3000")
})
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const usuarioFake = {
  email: "admin@tanamao.com",
  senha: "$2b$10$c37PIGO4MkPptQVsCQj7zOtDbPZ1RStxVXsQDpJMD6z/bgfk4DyH6" // 123456
}

app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body

  if (email !== usuarioFake.email) {
    return res.status(401).json({ erro: "Usuário inválido" })
  }

  const senhaValida = await bcrypt.compare(senha, usuarioFake.senha)

  if (!senhaValida) {
    return res.status(401).json({ erro: "Senha inválida" })
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({ token })
})
