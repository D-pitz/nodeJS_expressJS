const {Dog} = require('../models/dog')

module.exports = {

    home: function(req,res){
        Dog.find()
            .then(dogs =>{
                res.render('index', {dogs: dogs})
            })
            .catch(err=>{('err', err)})
    },

    newOne: function(req,res){
        res.render('new_dog')
    },

    createOne: function(req,res){
        var dog = new Dog(req.body)
        dog.save()
            .then((dog)=>{
                res.redirect('/')
            })
            .catch(err=>{
                for (let key in err.errors){
                    req.flash('dog', err.errors[key].message)
                }
                res.redirect('/dogs/new')
            })
    },

    showOne: function(req,res){
        Dog.findOne({_id: req.params.id})
            .then(dog =>{
                res.render('dog', {dog: dog})
            })
            .catch(err=>{('err', err)})
    },

    editOne: function(req,res){
        Dog.findOne({_id: req.params.id})
        .then(dog =>{
            res.render('edit', {dog: dog})
        })
        .catch(err=>{
            res.redirect(`dogs/${req.params.id}`)
        })
    },

    editOneProcess: function(req,res){
        Dog.findOne({_id: req.params.id})
            .then(dog =>{
                dog.name= req.body.name
                dog.breed= req.body.breed
                dog.age= req.body.age
                dog.save()
                    .then(dogData=>{
                        res.redirect(`/dogs/${req.params.id}`)
                    })
                    .catch(err=>{
                        for (let key in err.errors){
                            req.flash('err', err.errors[key].message)
                        }
                        res.redirect(`/dogs/${req.params.id}/edit`)
                    })
            })
            .catch(err => {
                console.log('ERROR')
                res.redirect('/')
            })
    },

    destroyOne: function(req,res){
        Dog.findOneAndDelete({_id: req.params.id})
            .then(data=>{
                res.redirect('/')
            })
            .catch(err=>{
                console.log('ERROR on delete')
                res.redirect('/')
            })
    }
}