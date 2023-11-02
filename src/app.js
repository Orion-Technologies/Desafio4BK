import express from "express";
import routerProducts from "./router/products.router.js"
import routerCarts from "./router/carts.router.js"
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
import { Server } from "socket.io";
import routerViews from "./router/views.router.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static', express.static('./src/public'))
app.use(express.static(__dirname + '/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// this is the route to use realtimeproducts
app.use('/', routerViews)

//this is the route that it uses to get routerProducts
app.use('/api/products', routerProducts)
//this is the route that it uses to get routerCarts
app.use('/api/carts', routerCarts)

const PORT = process.env.PORT || 8080
const httpServer = app.listen(PORT, () => console.log(`Server Running at 8080 port`))
const io = new Server(httpServer)

io.on('connection', socket => {
    console.log('Usuario conectado')
    socket.on('productList', data => io.emit('updateProducts', data))
})