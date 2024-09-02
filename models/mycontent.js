const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://196330307100jeetraval:B9UEqh51PM7NJeDy@cluster0.xi0kk.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster0")


const mycontentSchema = mongoose.Schema({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },

    note:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"note",
        required:true,
    },

    subTitle:{
        type:String,
        required:true,
    },

    desc:{
        type:String,
        required:true,
    }

})


module.exports = mongoose.model('mycontent',mycontentSchema)