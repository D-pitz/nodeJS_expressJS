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

    else if (req.url === '/ninjas') {
        fs.readFile('views/ninjas.html', 'utf8', (errors, contents) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(contents)
            res.end();
        })
    } 

    else if (req.url === '/dojos/new'){
        fs.readFile('views/dojos.html', 'utf8', (errors, contents) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(contents)
            res.end();
        })
    }

    else {
        res.writeHead(404)
        //fs.readFile('/static/<img_name>', 'utf8', (errors, contents) => {
        // res.writeHead(200, {'Content-Type': 'image/jpg'})
        // res.write("<img src=''>")
        res.end('File not found!!')
    }
})

server.listen(3000)
console.log('Running local host at port 8000')