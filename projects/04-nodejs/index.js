require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()
const Pictogram = require('./models/Pictogram')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a mi PICTOAPI</h1>')
})

app.get('/api/pictograms', (req, res) => {
  Pictogram.find({}).then((result) => {
    res.json(result)
  })
})

app.get('/api/pictograms/:id', (req, res, next) => {
  const id = req.params.id
  Pictogram.findById(id).then((pictogram) => {
    if (pictogram) {
      res.json(pictogram)
    } else {
      res.status(404).end()
    }
  }).catch((error) => {
    next(error)
  })
})

app.put('/api/pictograms/:id', (req, res, next) => {
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

app.delete('/api/pictograms/:id', (req, res, next) => {
  const id = req.params.id
  Pictogram.findByIdAndDelete(id).then((result) => {
    res.status(204).end()
  }).catch((error) => {
    next(error)
  })
})

app.post('/api/pictograms', (req, res) => {
  const pictogram = req.body

  if (!pictogram) {
    return res.status(400).json({
      error: 'pictogram.name is missing'
    })
  }

  const newPictogram = new Pictogram({
    name: pictogram.name,
    category: pictogram.category,
    url: pictogram.url
  })

  newPictogram.save().then((savedPictogram) => {
    res.json(savedPictogram)
  })
})

// Middleware para manejar errores
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
