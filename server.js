const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE);
const db = mongoose.connection;
db.on('error',()=>{
    console.log('Error');
});

db.once('open',()=>{
    console.log('Connected');
})

app.set('view engine','ejs');
app.use(express.static('Public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



// link routes
const urlRouter = require('./routes/urlRoutes')
app.use('/',urlRouter);
app.use('/back',urlRouter)

app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`);
});