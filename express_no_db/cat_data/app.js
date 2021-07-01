const express = require('express')

const app = express()
app.use(express.static(__dirname + '/static'))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', (req,res)=>{
    
})

app.get('/cats', (req,res)=>{
    res.render('cats')
})

app.get('/details/skittles', (req,res)=>{
    res.render('details', {
        name: 'Skittles',
        favorite_food: 'sardines',
        sleeping: ['closet', 'desk', 'under bed']
    })
})

app.get('/details/face_eater', (req,res)=>{
    res.render('details', {
        name: 'Killer',
        favorite_food: 'Faces...',
        sleeping: ['In your nightmares', 'Behind your pillow', 'Under bed']
    })
})

app.get('/details/simba', (req,res)=>{
    res.render('details', {
        name: 'simba',
        favorite_food: 'bugs',
        sleeping: ['Pride Rock', 'Jungle']
    })
})

app.listen(8000, ()=>{
    console.log('listening on port 8000')
})