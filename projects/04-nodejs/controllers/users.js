const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')
// Obtener todos los usuarios
usersRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('pictograms', {
    name: 1,
    category: 1
  })
  res.json(users)
})
// Crear usuario
usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body

    if (!body.username) {
      return res.status(400).json({ error: 'Username is required' })
    }

    // Verifica si el nombre de usuario ya existe
    const existingUser = await User.findOne({ username: body.username })
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username, // Asegúrate de usar el campo correcto
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
