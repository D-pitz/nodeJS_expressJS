const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const app = express()

app.use(express.static(__dirname + '/client/static'))
app.use(express.urlencoded(extended=true))
app.use(session({secret:'12345678'}))
app.use(flash())

app.set('views', __dirname + '/client/views')
app.set('view engine', 'ejs')

require('./server/config/routes')(app)
require('./server/config/mongoose')


app.listen(8091, ()=>{
    console.log('listening on port 8091')
})
