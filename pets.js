const fs = require('fs')


switch (process.argv[2]) {
    case 'read':
        fs.readFile('pets.json','utf8',function(error, data){
        let resultArray = JSON.parse(data)
        let index = process.argv[3]
        if(error){
            console.log(error)
        } else {
            if(index === undefined) {
                console.log(resultArray)
            } else if(index < 0 || index >= resultArray.length) {
                console.log('Usage: node pets.js read INDEX')
            }
            else {
                console.log(resultArray[index])
            }
        }
    }) 
    break

    case 'create': {
        let jsonArr = fs.readFileSync('pets.json')
        let jsArr = JSON.parse(jsonArr)
        newPet = {age: parseInt(process.argv[3]), kind: process.argv[4], name: process.argv[5]}
        jsArr.push(newPet)
        let result = JSON.stringify(jsArr)
        fs.writeFile('pets.json', result, function(error) {
        if(error) {
            console.log(error)
        } else {
            if(process.argv[3] === undefined || process.argv[4] === undefined || process.argv[5] === undefined || process.argv.length > 6) {
                console.log('Usage: node pets.js create AGE KIND NAME')
            } 
        }
        })
    }
    break

    case 'update': {
        let index = process.argv[3]
        let jsonArr = fs.readFileSync('pets.json')
        let jsArr = JSON.parse(jsonArr)
        newPet = {age: parseInt(process.argv[4]), kind: process.argv[5], name: process.argv[6]}
        jsArr.splice(index, 1, newPet)
        let result = JSON.stringify(jsArr)
        fs.writeFile('pets.json', result, function(error) {
        if(error) {
            console.log(error)
        } else {
            if(process.argv[3] === undefined || process.argv[4] === undefined || process.argv[5] === undefined || process.argv[6] === undefined || process.argv.length > 7) {
                console.log('Usage: node pets.js create INDEX AGE KIND NAME')
            } 
        }
        })
    }
    break

    case 'destroy': {
        let index = process.argv[3]
        if(index === undefined) {
            console.log('Usage: node pets.js destroy INDEX')
            break
        }
        let jsonArr = fs.readFileSync('pets.json')
        let jsArr = JSON.parse(jsonArr)
        console.log(jsArr[index])
        jsArr.splice(index, 1)
        let result = JSON.stringify(jsArr)
        fs.writeFile('pets.json', result, function(error) {
        if(error) {
            console.log(error)
        }})
    }
    break

    default: console.log('Usage: node pets.js [read | create | update | destroy]')
}