require('dotenv').config();
const express = require('express')
const app =new express()
const routes=require('./routes')
const logger=require('morgan')

require('./db')
const cors =require('cors');
const { router } = require('./controllers/productController');



const PORT = process.env.PORT || 9656;

app.use(cors({
    origin: '*',
})) 

app.use(express.json())

app.use('/api', router);

app.use(express.urlencoded({ extended: true }))
 
app.use(logger('dev'))
app.use('/',routes)


 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})