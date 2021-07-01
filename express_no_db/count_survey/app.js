const express = require('express')
const session = require('express-session')
const app = express()


app.use(express.static(__dirname + '/static'))
app.use(express.urlencoded(extended=true))
app.use(session({secret:'12345678'}))

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')


app.get('/', (req, res)=> {
    if (req.session.views) {
        req.session.views++
    } else {
        req.session.views = 1
    }
    res.render('index', {count: req.session.views})
})

app.get('/processViews', (req, res)=>{
    req.session.views++
    res.redirect('/')
})

app.get('/clearCount', (req,res)=>{
    req.session.destroy()
    res.redirect('/')
})

app.get('/form', (req,res)=>{
    res.render('form')
})

app.post('/process', (req,res)=>{
    req.session.results = req.body
    res.redirect('results') 
})

app.get('/results', (req,res)=>{
    res.render('results', {results: req.session.results})
})



app.listen(8000, ()=>{
    console.log('listening on port 8000')
})