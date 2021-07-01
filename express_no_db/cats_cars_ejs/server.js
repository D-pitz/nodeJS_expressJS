const express = require('express')

const app = express()
app.use(express.static(__dirname + '/static'))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', (req,res)=>{

})


app.get('/cars', (req,res)=>{
    res.render('cars')
})

app.get('/cats', (req,res)=>{
    res.render('cats')
})

app.get('/cars/new', (req,res)=>{
    res.render('new_car')
})


app.listen(8000, ()=>{
    console.log('listening on port 8000')
})