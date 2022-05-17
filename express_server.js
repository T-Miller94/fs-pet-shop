//requirements and declarations
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const fs = require('fs')
const PORT = 8000

//route here
app.get('/pets', (req, res) => {
    fs.readFile('pets.json', 'utf8', function (error, data) {
        if(error) {
            res.status(500).send('Internal Server Error')
        } else {
            res.type('json').send(data)
        }
    })
})

app.get('/pets/:id', (req, res) => {
    fs.readFile('pets.json', 'utf8', function (error, data) {
        let index = parseInt(req.params.id)
        let dataArr = JSON.parse(data)
        if(error) {
            res.status(500).send('Internal Server Error')
        } else {
            if(index < 0 || index > dataArr.length - 1 || index !== NaN) {
                res.status(404).type('text').send('Not Found')
            } else { 
            res.type('json').send(JSON.stringify(dataArr[index]))
            }
        }
    })
})

app.post('/pets', (req, res) => {
    let newPet = req.body
    if(newPet.name === undefined || newPet.age === undefined || typeof newPet.age !== 'number' || newPet.kind === undefined) {
        res.status(400).send('Bad Request')
    } else {
        fs.readFile('pets.json', 'utf8', function (error, data) {
            if(error) {
                res.status(500).send('Internal Server Error')
            } else {
                let dataArr = JSON.parse(data)
                let newArr = dataArr.push(newPet)
                let arrToJson = JSON.stringify(newArr)
                fs.writeFile('pets.json', arrToJson, function(error) {
                    if(error) {
                        res.status(500).send('Internal Server Error')
                    } else {
                        res.send('Posted')
                    }
                })
            }
        })
    }
})

// listen on port
app.listen(PORT, function() {
    console.log(`Tis running ${PORT}`)
})