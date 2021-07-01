const Dogs = require('../controllers/dogs')

module.exports = function(app){

    app.get('/', (req,res)=>{
        Dogs.home(req,res)
    })
    
    app.get('/dogs/new', (req,res)=>{
        Dogs.newOne(req,res)
    })
    
    app.post('/dogs', (req,res)=>{
        Dogs.createOne(req,res)
    })
    
    app.get('/dogs/:id', (req,res)=>{
        Dogs.showOne(req,res)
    })
    
    app.get('/dogs/:id/edit', (req,res)=>{
        Dogs.editOne(req,res)
    })
    
    app.post('/dogs/:id', (req,res)=>{
        Dogs.editOneProcess(req,res)
    })
    
    app.get('/dogs/destroy/:id', (req,res)=>{
        Dogs.destroyOne(req,res)
    })
}