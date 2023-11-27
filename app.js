const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

const PORT = 3000

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/schemaPractice');
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error(error);
    }
}

dbConnect();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("HOMEPAGE VIEW!")
})

const products = require('./routes/products')

app.use('/products', products)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})