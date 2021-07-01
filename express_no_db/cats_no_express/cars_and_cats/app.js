const fs = require('fs')
const http = require('http')

const server = http.createServer(function (req, res){
    console.log('client request URL: ', req.url)
   
    if (req.url === '/') {
        fs.readFile('views/index.html', 'utf8', (errors, contents) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(contents)
            res.end();
        })
    } 

    else if (req.url === '/cars') {
        fs.readFile('views/cars.html', 'utf8', (errors, contents) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(contents)
            res.end()
        })
    } 
        
    else if (req.url === '/images/bmw.jpeg'){
        fs.readFile('images/bmw.jpeg', (errors, contents) => {
            console.log(errors)
            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.write(contents)
            res.end()
        })
    }

    else if (req.url === '/images/bugatti.jpeg'){
        fs.readFile('images/bugatti.jpeg', (errors, contents) => {
            console.log(errors)
            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.write(contents)
            res.end()
        })
    }

    else if (req.url === '/images/lambo.jpeg'){
        fs.readFile('images/lambo.jpeg', (errors, contents) => {
            console.log(errors)
            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.write(contents)
            res.end()
        })
    }

    else if (req.url === '/cats') {
        fs.readFile('views/cats.html', 'utf8', (errors, contents) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(contents)
            res.end()
        })
    } 

    else if (req.url === '/images/kitten.jpeg'){
        fs.readFile('images/kitten.jpeg', (errors, contents) => {
            console.log(errors)
            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.write(contents)
            res.end()
        })
    }

    else if (req.url === '/images/angrycat.jpeg'){
        fs.readFile('images/angrycat.jpeg', (errors, contents) => {
            console.log(errors)
            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.write(contents)
            res.end()
        })
    }
    
    else {
        res.writeHead(404)
        res.end('File not found!!')
    }
})

server.listen(7077)
console.log('Running local host at port 7077')