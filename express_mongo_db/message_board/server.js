const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const flash = require('express-flash')
const bcrypt = require('bcrypt')
const { doDuring } = require('async')
const app = express()

mongoose.connect('mongodb://localhost/messageBoard', {useNewUrlParser: true})

const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters']
    },
    comment: {
        type: String,
        required: [true, 'Comment is required'],
        minlength: [8, 'Comment must be at least 8 characters']
    }
}, {timestamps:true})

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        minlength: [8, 'Message must be at least 8 characters']
    },
    comments: [CommentSchema]
}, {timestamps:true})

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [3, 'First name must be at least 3 characters']
    },
    last_name: {
        type: String,
        required: [true, 'Last name id required'],
        minlength: [3, 'Last name must be at least 3 characters']
    },
    user_name:{
        type: String,
        required:[true, 'user_name is required'],
        minlength: [3, 'User Name must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minlength: [2, 'Email must be at least 2 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters']
    }
}, {timestamps:true})
//model
const User = mongoose.model('User', UserSchema)
const Message = mongoose.model('Message', MessageSchema)
const Comment = mongoose.model('Comment', CommentSchema)

app.use(express.static(__dirname + '/static'))
app.use(express.urlencoded(extended=true))
app.use(session({secret:'12345678'}))
app.use(flash())

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')


app.get('/', (req,res)=>{
    if (req.session['user_id']){
        User.findOne({_id: req.session['user_id']})
        .then(user=>{
            Message.find()
                .then(posts=>{
                    res.render('message', {posts:posts, user:user})
                })
                .catch(err=>{
                    console.log(err)
                    res.redirect('/user')
                })
        })
        .catch(err=>{
            console.log(err)
            res.redirect('/user')
        })
    }
    else {
        res.redirect('/user')
    }
})

app.get('/user', (req,res)=>{
    res.render('login')
})

app.post('/user/create', (req,res)=>{
    if (req.body.password == req.body.confirm_password){
        bcrypt.hash(req.body.password, 10)
            .then(hashed_password =>{
                req.body.password = hashed_password
                var user = new User(req.body)
                user.save()
                .then(user=>{
                    req.flash('Success', 'Account successfully created')
                    res.redirect('/user')
                })
                .catch(err=>{
                    for (let key in err.errors){
                        req.flash('err', err.errors[key].message)
                    }
                    res.redirect('/user')
                })
            })
            .catch(err=>{
                console.log(err, 'hash error')
            })
    }
    else{
        req.flash('error', 'Password does not match confirm password')
        res.redirect('/user')
    }
})

app.post('/user/login', (req,res)=>{
    User.findOne({email: req.body.email})
        .then(user=>{
            bcrypt.compare(req.body.password, user.password)
                .then(result=>{
                    if (result){
                        req.session['user_id'] = user._id
                        res.redirect('/')
                    }
                    else {
                        req.flash('err', 'Password is incorrect')
                        res.redirect('/')
                    }
                })
                .catch(err=>{
                        req.flash('err', 'Password is incorrect')
                        res.redirect('/')
                })
        })
        .catch(err=>{
            req.flash('err', "Login Failed")
            res.redirect('/user')
        })
})

app.post('/message/create', (req,res)=>{
    user = User.findOne({_id: req.session['user_id']})
        .then(user=>{
            var post = new Message()
                post.name = user.first_name
                post.message = req.body.message
                post.save()
                .then(post=>{
                    res.redirect('/')
                })
                .catch(err=>{
                    for (let key in err.errors){
                        req.flash('err', err.errors[key].message)
                    }
                    res.redirect('/')
                })
        })
        .catch(err=>{
            for (let key in err.errors){
                req.flash('err', err.errors[key].message)
            }
                res.redirect('/')
        })
})

app.post('/comment/create/:id', (req,res)=>{
    user = User.findOne({_id: req.session['user_id']})
    .then(user=>{
        const comment = new Comment()
        comment.name = user.first_name
        comment.comment = req.body.comment
        comment.save()
            .then(comment=>{
                Message.findOne({_id: req.params.id})
                    .then(message=>{
                        message.comments.push(comment)
                        message.save()
                            .then(updatedMessage=>{
                                console.log('Message updated')
                                res.redirect('/')
                            })
                            .catch(err=>console.log(err))
                    })
                    .catch(err=>console.log(err))
            })
            .catch(err=>{
                for (let key in err.errors){
                    req.flash('err', err.errors[key].message)
                }
                    res.redirect('/')
            })
    })
    .catch(err=>{
        for (let key in err.errors){
            req.flash('err', err.errors[key].message)
        }
            res.redirect('/')
    })
})

app.get('/message/destroy/:id', (req,res)=>{
    Message.findOneAndDelete({_id: req.params.id})
    .then(data=>{
        res.redirect('/')
    })
    .catch(err=>{
        console.log('ERROR on delete')
        res.redirect('/')
    })
})

// app.get('/comment/destroy/:message_id/:comment_id', (req,res)=>{
//     Message.findOne({_id:req.params.message_id}) 
//     .then(data=>{
//             Comments.findOne({_id: req.params.comment_id})
//             .then(comment=>{
//                 console.log(comment)
//                 res.redirect('/')

//             })
//              .catch(=>{console.log('*******')})
//     })
//     .catch(err=>{
//         console.log('ERROR on delete')
//         res.redirect('/')
//     })
// })


app.listen(8000, ()=>{
    console.log('listening on port 8000')
})
