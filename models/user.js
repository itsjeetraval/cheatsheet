
const mongoose = require('mongoose')
 
mongoose.connect("mongodb+srv://196330307100jeetraval:B9UEqh51PM7NJeDy@cluster0.xi0kk.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster0")

const userSchema =  mongoose.Schema({

    username : {
        type:String,
        required:true,
   
    },

    email:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        minlength:8,
        required:true,
    }

})


module.exports =  mongoose.model('user',userSchema)