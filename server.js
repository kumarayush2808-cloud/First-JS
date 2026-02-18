const cors = require('cors')
const express = require('express')
const productsRouter = require('./product')
const app = express()

app.use(express.json())

app.use('/products',productsRouter)
app.use(cors({
    origin: ['http://127.0.0.1:5500','http://localhost:5500']
}))
 
app.use((req,res,next)=>{
    console.log(req.mehtod,req.path)
    next()
})

app.get('/', (req, res) => {
    res.send("Hello from express")
})

app.get('/about', (req, res) => {
    res.send("This is the about page")
})

app.get('/products', (req,res) => {
    res.json([
        {id:1, name: 'laptop',price:1000},
        {id:2, name: 'mouse',price:500}
    ])
})

app.get('/products/:id',(req,res) =>{
    const id =  Number(req.params.id)

    const products = [
        {id:1, name: 'laptop',price:1000},
        {id:2, name: 'mouse',price:500}
    ]

    const requestedProduct = products.find((product) => product.id === id)
    res.json(requestedProduct)
})

app.get('/message',(req,res) => {
    res.json({ message: "Hello from express Backend" })
})

app.post('/message',(req,res) =>{
    const{name,message} =req.body

    console.log('New Message: ',name ,message)
    res.json({message:"Thankyou for your message"})
})

app.listen(3000, () => {
    console.log("The server is running")
})
