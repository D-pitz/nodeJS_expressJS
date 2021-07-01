const {Quote} = require('../models/quote')

module.exports = {

    home: function(req,res){
        res.render('index')
    },

    create: function(req,res){
        const quote = new Quote(req.body)
        quote.save()
        .then((quotedata)=>{
            console.log('saved quote:', quotedata)
            res.redirect('/quotes')
        })
        .catch(err=>{
            console.log('err:', err)
            for (let key in err.errors){
                req.flash('quote', err.errors[key].message)
            }
            res.redirect('/')
        })
    },
    
    index: function(req,res){
        Quote.find()
            .then(quotes =>{
                res.render('quotes', {quotes: quotes})
            })
            .catch(err=>{('err:', err)})
    },
    
}