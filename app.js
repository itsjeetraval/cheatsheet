const express = require('express')
const app = express();
const userModel = require('./models/user')
const noteModel = require('./models/note')
const contentModel = require('./models/mycontent')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const cros = require("cors")
const user = require('./routes/user')
const showNotes = require('./routes/showNotes');
const showContent = require('./routes/showContent')
const deleteContent = require('./routes/deleteContent')
const deleteNote = require('./routes/deleteNote')
const { verifyUser } = require('./Middleware/verifyUser');
const multer  = require('multer')
const path = require('path')


//track cros
var corsOptions = {
    origin: '*',
    methods: "GET,POST,PUT,DELETE",
    Credentials:true,
  }


app.use(cros(corsOptions))

app.set('view engine',"ejs")
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user',user)
app.use('/showNotes',showNotes)
app.use('/showContent',showContent)
app.use('/deleteContent',deleteContent)
app.use('/deleteNote',deleteNote)

app.get('/',(req,res) => {

    res.render("login")

})

// app.get('/userdata',isLoggedIn,async (req,res) => {

//     // console.log(req.user)

//     const info = await userModel.findById(req.user.userid)
//     res.send(info)

// })

app.post('/signup', async (req,res) => {

    let {username,email,password} = req.body

    let user = await userModel.findOne({email})

    if(user) return res.status(500).send("User already registered ")

    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(password,salt, async (err,hash) => {
            let user  = await userModel.create({
                username,
                email,
                password : hash
            })

            // let token = jwt.sign({email:email,userid:user._id},'secretkey')
            // res.cookie("token",token)
            res.send("SignUp Successfully")
        })
    })
})

app.post('/login', async (req,res) => {

    let {email,password} = req.body

    let user = await userModel.findOne({email})

    if(!user) return res.status(500).json({msg:"Account dooes not exist"})
    
    bcrypt.compare(password,user.password,(err,result) => {
       
        if(result){

            let token = jwt.sign({email:email,userid:user._id},"secretkey")
            // res.cookie("token",token)

            // res.status(200).send("Login Successfully")

            res.status(200).json({msg:"Login Successfull",token:token,userId: user._id.toString()})
        }
        else //res.send("Invalid email or password")
        {
            res.status(401).json({msg:"Invalid email or password"})
        }
    })
})

// app.get("/logout",(req,res) => {
//     res.cookie("token","")
//     res.send("Logout Successfully")
// })

// function isLoggedIn(req,res,next)
// {

//     if(req.cookies.token === "") res.send("you must be logged in")

//     else{
//        let data = jwt.verify(req.cookies.token,"secretkey")
//        req.user = data
//        next()
//     }
// }


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null,uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


app.post('/addnote',verifyUser,upload.single("image"),async (req,res) => {

    let userId = req.userid

    let {title} = req.body

    let imageName = req.file.filename

    let note = await noteModel.create({
        user:userId,
        image:imageName,
        title,
    })

    res.json({status:"ok"})

})

app.post('/addcontent',verifyUser,async (req,res) => {

    let userId = req.userid

    let {note,subTitle,desc} = req.body


    let content = await contentModel.create({
        user:userId,
        note,
        subTitle,
        desc
    })

    res.json({status:"ok"})

})



app.listen(3000)