const mongoose = require('mongoose')

const QuoteSchema = new mongoose.Schema({
 name: {
    type: String, 
    required:[true, 'Must input something'], 
    minlength:[3, 'Name must be at least 2 characters']},
 quote:{
    type: String, 
    required:[true, 'Must input something'], 
    minlength:[7, 'Quote must be at least 6 characters']}
    }, {timestamps:true})

const Quote = mongoose.model('Quote', QuoteSchema)

module.exports = {
    Quote: Quote,
    QuoteSchema: QuoteSchema
}