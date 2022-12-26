const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose');

const homeRoutes = require('./routes/homeRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()


// app.use(morgan('combined'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(__dirname + '/views/'));
const connectDB = async ()=>{
    try {
        mongoose.set('strictQuery',false);
        const url = 'mongodb+srv://minhduc:minhduc@wedding.6boglae.mongodb.net/?retryWrites=true&w=majority'
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connecting database to minhduc successfully');
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

// app.get('/', inviationController.home)
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
connectDB()
app.use(express.static('./src/public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')
const PORT = 5000

app.listen(PORT, () =>{
    console.log('listening on port', PORT)
})