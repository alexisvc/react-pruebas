const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let pictogramsData = [
  {
    id: 1,
    name: 'Yo',
    category: 'Pronombres',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 2,
    name: 'Tú',
    category: 'Pronombres',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 3,
    name: 'Él',
    category: 'Pronombres',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 4,
    name: 'Ella',
    category: 'Pronombres',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 5,
    name: 'Nosotros',
    category: 'Pronombres',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 6,
    name: 'Ustedes',
    category: 'Pronombres',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 7,
    name: 'Ellos',
    category: 'Pronombres',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 8,
    name: 'Ellas',
    category: 'Pronombres',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 9,
    name: 'Mi',
    category: 'Pronombres',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 10,
    name: 'Tu',
    category: 'Pronombres',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 11,
    name: 'Comer',
    category: 'Acciones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 12,
    name: 'Saltar',
    category: 'Acciones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 13,
    name: 'Jugar',
    category: 'Acciones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 14,
    name: 'Dormir',
    category: 'Acciones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 15,
    name: 'Correr',
    category: 'Acciones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 16,
    name: 'Nadar',
    category: 'Acciones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 17,
    name: 'Leer',
    category: 'Acciones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 18,
    name: 'Bailar',
    category: 'Acciones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 19,
    name: 'Cantar',
    category: 'Acciones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 20,
    name: 'Hacer tareas',
    category: 'Acciones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 21,
    name: 'Ahora',
    category: 'Adverbios de tiempo',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 22,
    name: 'Mañana',
    category: 'Adverbios de tiempo',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 23,
    name: 'Tarde',
    category: 'Adverbios de tiempo',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 24,
    name: 'Noche',
    category: 'Adverbios de tiempo',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 25,
    name: 'Siempre',
    category: 'Adverbios de tiempo',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 26,
    name: 'Nunca',
    category: 'Adverbios de tiempo',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 27,
    name: 'Después',
    category: 'Adverbios de tiempo',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 28,
    name: 'Antes',
    category: 'Adverbios de tiempo',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 29,
    name: 'Hoy',
    category: 'Adverbios de tiempo',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 30,
    name: 'Manzana',
    category: 'Alimentos',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 31,
    name: 'Arroz',
    category: 'Alimentos',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 32,
    name: 'Banano',
    category: 'Alimentos',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 33,
    name: 'Pan',
    category: 'Alimentos',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 34,
    name: 'Yuca',
    category: 'Alimentos',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 35,
    name: 'Papas',
    category: 'Alimentos',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 36,
    name: 'Leche',
    category: 'Alimentos',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 37,
    name: 'Jugo',
    category: 'Alimentos',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 38,
    name: 'Pollo',
    category: 'Alimentos',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 39,
    name: 'Helado',
    category: 'Alimentos',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 40,
    name: 'Perro',
    category: 'Animales',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 41,
    name: 'Gato',
    category: 'Animales',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 42,
    name: 'Pájaro',
    category: 'Animales',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 43,
    name: 'Peces',
    category: 'Animales',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 44,
    name: 'Vaca',
    category: 'Animales',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 45,
    name: 'Caballo',
    category: 'Animales',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 46,
    name: 'Mariposa',
    category: 'Animales',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 47,
    name: 'Rana',
    category: 'Animales',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 48,
    name: 'Elefante',
    category: 'Animales',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 49,
    name: 'Mono',
    category: 'Animales',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 50,
    name: 'Sol',
    category: 'Clima',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 51,
    name: 'Lluvia',
    category: 'Clima',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 52,
    name: 'Nubes',
    category: 'Clima',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 53,
    name: 'Viento',
    category: 'Clima',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 54,
    name: 'Tormenta',
    category: 'Clima',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 55,
    name: 'Arco iris',
    category: 'Clima',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 56,
    name: 'Frío',
    category: 'Clima',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 57,
    name: 'Calor',
    category: 'Clima',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 58,
    name: 'Niebla',
    category: 'Clima',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 59,
    name: 'Granizo',
    category: 'Clima',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 60,
    name: 'Rojo',
    category: 'Color',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 61,
    name: 'Azul',
    category: 'Color',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 62,
    name: 'Verde',
    category: 'Color',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 63,
    name: 'Amarillo',
    category: 'Color',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 64,
    name: 'Blanco',
    category: 'Color',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 65,
    name: 'Negro',
    category: 'Color',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 66,
    name: 'Morado',
    category: 'Color',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 67,
    name: 'Naranja',
    category: 'Color',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 68,
    name: 'Rosa',
    category: 'Color',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 69,
    name: 'Gris',
    category: 'Color',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 70,
    name: 'Cocina',
    category: 'Dependencias del hogar',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 71,
    name: 'Baño',
    category: 'Dependencias del hogar',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 72,
    name: 'Dormitorio',
    category: 'Dependencias del hogar',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 73,
    name: 'Sala',
    category: 'Dependencias del hogar',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 74,
    name: 'Comedor',
    category: 'Dependencias del hogar',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 75,
    name: 'Garaje',
    category: 'Dependencias del hogar',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 76,
    name: 'Patio',
    category: 'Dependencias del hogar',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 77,
    name: 'Jardín',
    category: 'Dependencias del hogar',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 78,
    name: 'Balcón',
    category: 'Dependencias del hogar',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 79,
    name: 'Terraza',
    category: 'Dependencias del hogar',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 80,
    name: 'Feliz',
    category: 'Emociones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 81,
    name: 'Triste',
    category: 'Emociones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 82,
    name: 'Enojado',
    category: 'Emociones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 83,
    name: 'Asustado',
    category: 'Emociones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 84,
    name: 'Sorprendido',
    category: 'Emociones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 85,
    name: 'Contento',
    category: 'Emociones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 86,
    name: 'Aburrido',
    category: 'Emociones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 87,
    name: 'Cansado',
    category: 'Emociones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 88,
    name: 'Orgulloso',
    category: 'Emociones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 89,
    name: 'Nervioso',
    category: 'Emociones',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 90,
    name: 'Mamá',
    category: 'Familia',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 91,
    name: 'Papá',
    category: 'Familia',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 92,
    name: 'Hermano',
    category: 'Familia',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 93,
    name: 'Hermana',
    category: 'Familia',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 94,
    name: 'Abuelo',
    category: 'Familia',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 95,
    name: 'Abuela',
    category: 'Familia',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 96,
    name: 'Tío',
    category: 'Familia',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 97,
    name: 'Tía',
    category: 'Familia',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 98,
    name: 'Primo',
    category: 'Familia',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 99,
    name: 'Prima',
    category: 'Familia',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  {
    id: 100,
    name: 'Navidad',
    category: 'Fechas importantes del año',
    url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true'
  },
  // Continúa con los siguientes ejemplos...
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/pictograms', (req, res) => {
  res.json(pictogramsData)
})

app.get('/api/pictograms/:id', (req, res) => {
  const id = Number(req.params.id)
  const pictogram = pictogramsData.find(p => p.id === id)

  if (pictogram) {
    res.json(pictogram)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/pictograms/:id', (req, res) => {
  const id = Number(req.params.id)
  pictogramsData = pictogramsData.filter(p => p.id !== id)
  res.status(204).end()
})

app.post('/api/pictograms', (req, res) => {
  const pictogram = req.body

  if (!pictogram || !pictogram.name) {
    return res.status(400).json({
      error: 'pictogram.name is missing'
    })
  } else {
    const newPictogram = {
      id: Math.max(...pictogramsData.map(p => p.id)) + 1,
      name: pictogram.name,
      category: pictogram.category,
      url: pictogram.url
    }

    pictogramsData = [...pictogramsData, newPictogram]
    res.status(201).json(newPictogram)
  }
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
