const mongoose = require('mongoose')

const DogSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required:[true, 'Must input a name.'],
        minlength:[2, 'Name must be at least two characters']
    },
    breed: {
        type: String,
        required:[true, 'Must input a breed.'],
        minlength:[3, 'Breed must be at least 2 characters']
    },
    age: {
        type: Number,
        required:[true, 'Must input an age.']
    }
}, {timestamps:true})

const Dog = mongoose.model('Dog', DogSchema)

module.exports = {
    Dog: Dog,
    DogSchema: DogSchema
}