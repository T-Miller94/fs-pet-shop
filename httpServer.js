const fs = require('fs')
const http = require('http')

const server = http.createServer(function (req, res) {
    let index = req.url[req.url.length - 1]
    fs.readFile('pets.json', 'utf8', function (error, data) {
        let dataArr = JSON.parse(data)
        if (error) {
            serverError(error, res)
        } else if (req.method === 'GET') {
            if(req.url === '/pets') {
                if (error) {
                    serverError(error)
                } else {
                    goodSend(res)
                    res.end(data)
                }
            } else if (req.url === `/pets/${index}` && index >= 0 && index < dataArr.length) {
                if (error) {
                    serverError(error)
                } else {
                    goodSend(res)
                    res.end(JSON.stringify(dataArr[index]))
                }
            } else {
                notFound(res)
            }
        } else if (req.method === 'POST') {
            if(req.url === '/pets') {
                res.end('trying to post')
            }
        }
    })
})

server.listen(8000, function() {
    console.log("Listening on 8000")
})


function serverError(error, res) {
    console.log(error.stack)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    return res.end('Internal Server Error')
}

function notFound(res) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    return res.end('Not Found')
}

function goodSend(res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
}