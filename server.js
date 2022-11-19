const express = require('express')
const app = express()

app.use(express.json())

let notes = [
   {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    // const note = notes.find(note => note.id === id)
    const note = notes.find(note => {
        console.log(note.id, typeof note.id, id, typeof id, note.id === id)
        return note.id === id
      })
      console.log(note)
      if(note){
        response.json(note)
      }else {
        response.status(404).send('Page does not exist')
        //or response.status(404).end()
      }
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()

  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// ==========================
// This code is vanilla NodeJS
// ==========================

// const http = require('http') //ComonJS module => works everywhere
// // import http from 'http' => ECMAScript module, This will be used in the future

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2022-05-30T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2022-05-30T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2022-05-30T19:20:14.298Z",
//       important: true
//     }
//   ]



// // Server response with 200 (everything is working)
// // Then it gives us the text message of 'Hello World'
// const app = http.createServer((request, response) => {
// //   response.writeHead(200, { 'Content-Type': 'text/plain' }) => This returns just text
//   response.writeHead(200, { 'Content-type' : "application/json" }) // => returns the array(notes) containing objects
//   response.end(JSON.stringify(notes)) // => Turns the array notes RAW data into readable JSON format
// })

// // The server will be open on port 3001 and listening for anyone that visits to request something. HTTP requests
// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)