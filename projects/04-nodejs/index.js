require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()

const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

const pictogramsRouter = require('./controllers/pictograms') 
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use('/static', express.static('images'))

app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a mi PICTOAPI</h1>')
})

// Rutas para pictogramas
app.use('/api/pictograms', pictogramsRouter)
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
