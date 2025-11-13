const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const app = express()
const prisma = new PrismaClient()
const port = 3333

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
  console.log(err)
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON format' })
  }
  next()//função que faz com que o Express passe para a proxima etapa de execução da api
})

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Ninja do Cypress!' })
})

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name) return res.status(400).json({ error: 'Name field is required.' })
  if (!email) return res.status(400).json({ error: 'Email field is required.' })
  if (!password) return res.status(400).json({ error: 'Password field is required.' })

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    // ✅ Se o e-mail já existir, retorna 409 (Conflict)
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists in the database.' })
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })

    // Remove o campo password antes de retornar
    const { password: _pw, ...safeUser } = newUser

    res.status(201).json({
      message: 'User registered successfully.',
      user: safeUser,
      createdAt: newUser.createdAt ?? new Date().toISOString(),
    })
  } catch (error) {
    console.error(error)

    // 🔍 Se o erro for de violação de chave única (Prisma error code P2002)
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return res.status(409).json({ error: 'Email already exists in the database.' })
    }

    res.status(500).json({ error: 'An error occurred while registering the user.' })
  }
})

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      }
    })

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users.' })
  }

})

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email, password } = req.body

  if (!name) return res.status(400).json({ error: 'Name field is required.' })
  if (!email) return res.status(400).json({ error: 'Email field is required.' })
  if (!password) return res.status(400).json({ error: 'Password field is required.' })

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } })
    if (!user) return res.status(404).json({ error: 'User not found' })
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    res.status(204).end()
  } catch (error) {
    console.error('PUT /api/users/:id error:', error.message)
    console.error('Error code:', error.code)
    console.error('Error meta:', error.meta)
    
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already in use.' })
    }
    
    res.status(500).json({ error: 'Error updating user :(' })
  }
})

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } })
    if (!user) return res.status(404).json({ error: 'User not found' })

    await prisma.user.delete({ where: { id: Number(id) } })
    return res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user :(' })
  }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
