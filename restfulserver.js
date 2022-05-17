const express = require('express')
const app = express()
const fs = require('fs')
const petsJSON = require('./pets.json')

const PORT = 8000
app.use(express.json())

//post req
app.post('/pets', (req, res) => {
    let newPet = req.body
    petsJSON.push(newPet)
    fs.writeFile('pets.json', JSON.stringify(petsJSON), (error) => {
        if(error) {
            res.send(error)
        } else {
            res.send(petsJSON)
        }
    })
})

//get all
app.get('/pets/', (req, res) => {
    res.status(200).send(petsJSON)
})

//get one
app.get('/pets/:id', (req, res) => {
    let index = req.params.id
    if(index > petsJSON.length -1) {
        res.status(404).send('Not Found')
    } else {
        res.status(200).send(petsJSON[req.params.id])
    }
    
})

//patch
app.patch('/pets/:id', (req, res) => {
    let index = req.params.id
    let age = req.body.age
    let kind = req.body.kind
    let name = req.body.name
    petsJSON[index].name = name || petsJSON[index].name
    petsJSON[index].age = age || petsJSON[index].age
    petsJSON[index].kind = kind || petsJSON[index].kind

    res.send(petsJSON[index])

})

//delete
app.delete('/pets/:id', (req, res) => {
    let index = req.params.id
    petsJSON.splice(index, 1)
    fs.writeFile('pets.json', JSON.stringify(petsJSON), (error) => {
        if(error) {
            res.send(error)
        } else {
            res.send(petsJSON)
        }
    })
})


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})