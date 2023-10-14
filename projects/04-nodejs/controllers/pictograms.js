const express = require('express')
const pictogramsRouter = express.Router()
const Pictogram = require('../models/Pictogram')
const User = require('../models/User')
const userExtractor = require('../middleware/userExtractor')

// Obtener todos los pictogramas
pictogramsRouter.get('/', async (req, res) => {
  const pictograms = await Pictogram.find({}).populate('user', {
    username: 1,
    name: 1
  })
  res.json(pictograms)
})

// Obtener los pictogramas de un usuario por su ID
pictogramsRouter.get('/:userId', async (req, res, next) => {
  const userId = req.params.userId

  try {
    // Buscar los pictogramas asociados al usuario
    const pictograms = await Pictogram.find({ user: userId }).populate('user', {
      username: 1,
      name: 1
    })

    if (!pictograms) {
      return res.status(404).json({ error: 'No pictograms found for this user' })
    }

    res.json(pictograms)
  } catch (error) {
    next(error)
  }
})

// Obtener pictograma por id
pictogramsRouter.get('/:id', (req, res, next) => {
  const id = req.params.id
  Pictogram.findById(id).then((pictogram) => {
    if (pictogram) return res.json(pictogram)
    res.status(404).end()
  }).catch((error) => { next(error) })
})

// Crear pictograma
pictogramsRouter.post('/', userExtractor, async (req, res, next) => {
  const { name, category, url } = req.body
  // Recuperar la id del request
  const { userId } = req
  // Verificar que se proporcionen todos los datos necesarios
  if (!name || !category || !url) {
    return res.status(400).json({
      error: 'Name, category, and URL are required'
    })
  }

  try {
    // Crear un nuevo pictograma
    const newPictogram = new Pictogram({
      name,
      category,
      url,
      user: userId // Asignar el ID del usuario que creó el pictograma
    })
    // Guardar el pictograma en la base de datos
    const savedPictogram = await newPictogram.save()
    // Asignar el pictograma al usuario
    const user = await User.findById(userId)
    user.pictograms = user.pictograms.concat(savedPictogram._id)
    await user.save()
    res.json(savedPictogram)
  } catch (error) {
    next(error)
  }
})

// Actualizar pictograma
pictogramsRouter.put('/:id', userExtractor, (req, res, next) => {
  const id = req.params.id
  const pictogram = req.body

  const newPictogramInfo = {
    name: pictogram.name,
    category: pictogram.category,
    url: pictogram.url
  }

  Pictogram.findByIdAndUpdate(id, newPictogramInfo, { new: true })
    .then((result) => {
      res.json(result)
    }).catch((error) => {
      next(error)
    })
})

// Eliminar pictograma
pictogramsRouter.delete('/:id', userExtractor, async (req, res, next) => {
  const id = req.params.id
  await Pictogram.findByIdAndDelete(id).then((result) => {
    res.status(204).end()
  }).catch((error) => {
    next(error)
  })
})

module.exports = pictogramsRouter
