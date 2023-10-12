require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()
const Pictogram = require('./models/Pictogram')
const User = require('./models/User')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const userExtractor = require('./middleware/userExtractor')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use('/static', express.static('images'))

app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a mi PICTOAPI</h1>')
})

// Rutas para pictogramas
// Obtener todos los pictogramas
app.get('/api/pictograms', async (req, res) => {
  const pictograms = await Pictogram.find({}).populate('user', {
    userName: 1,
    name: 1
  })
  res.json(pictograms)
})
// Obtener pictograma por id
app.get('/api/pictograms/:id', (req, res, next) => {
  const id = req.params.id
  Pictogram.findById(id).then((pictogram) => {
    if (pictogram) return res.json(pictogram)
    res.status(404).end()
  }).catch((error) => { next(error) })
})
// Actualizar pictograma
app.put('/api/pictograms/:id', userExtractor, (req, res, next) => {
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
app.delete('/api/pictograms/:id', userExtractor, async (req, res, next) => {
  const id = req.params.id
  await Pictogram.findByIdAndDelete(id).then((result) => {
    res.status(204).end()
  }).catch((error) => {
    next(error)
  })
})
// Crear pictograma
app.post('/api/pictograms', userExtractor, async (req, res, next) => {
  const {
    name,
    category,
    url
  } = req.body

  // Recuperar la id del request
  const { userId } = req

  const user = await User.findById(userId)

  if (!name || !category || !url) {
    return res.status(400).json({
      error: 'pictogram  is missing'
    })
  }

  const newPictogram = new Pictogram({
    name,
    category,
    url,
    user: user._id
  })

  try {
    const savedPictogram = await newPictogram.save()
    user.pictograms = user.pictograms.concat(savedPictogram._id)
    await user.save()
    res.json(savedPictogram)
  } catch (error) {
    next(error)
  }
  newPictogram.save().then((savedPictogram) => {
    res.json(savedPictogram)
  })
})

// Rutas para usuarios
app.use('/api/users', usersRouter)
// Rutas para login
app.use('/api/login', loginRouter)

// Middleware para manejar errores
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
