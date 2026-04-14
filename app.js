import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

dotenv.config()

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// usuário fake (login teste)
const user = {
  id: 1,
  nickname: "junior",
  password_hash: "$2b$10$c37PIG04MkPptQVscQJ7zOtDbPZ1RStxVXsQDpJMD6z/bgkf4DyH6" // senha: 123456
}

// rota login
app.post("/api/login", async (req, res) => {
  try {
    const { nickname, password } = req.body

    if (!nickname || !password) {
      return res.status(400).json({ error: "Dados obrigatórios" })
    }

    if (nickname !== user.nickname) {
      return res.status(401).json({ error: "Usuário inválido" })
    }

    const valid = await bcrypt.compare(password, user.password_hash)

    if (!valid) {
      return res.status(401).json({ error: "Senha inválida" })
    }

    const token = jwt.sign(
      { id: user.id, nickname: user.nickname },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro interno" })
  }
})

// rota teste
app.get("/", (req, res) => {
  res.send("🔥 Backend Tá Na Mão rodando")
})

// porta render
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
