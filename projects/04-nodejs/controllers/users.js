const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')
const Pictogram = require('../models/Pictogram')
const defaultPictograms = require('../assets/defaultPictograms') // Importa el archivo de pictogramas predefinidos

usersRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('pictograms', {
    name: 1,
    category: 1
  })
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body

    if (!body.username) {
      return res.status(400).json({ error: 'Username is required' })
    }

    const existingUser = await User.findOne({ username: body.username })
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    const userPictograms = defaultPictograms.map((pictogramData) => ({
      ...pictogramData,
      user: savedUser._id // Asociar cada pictograma con el usuario
    }))

    const savedPictograms = await Pictogram.insertMany(userPictograms)

    savedUser.pictograms = savedPictograms.map((pictogram) => pictogram._id)
    await savedUser.save()

    res.json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
