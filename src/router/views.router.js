import { Router } from "express";
import ProductManager from '../ProductManager.js'

const router = Router()

router.get('/realtimeproducts', async (req, res) => {
    const productManager = new ProductManager('./database/db.json')
    const products = await productManager.getProducts()

    res.render('home', { products })
})

router.get('/', async (req, res) => {
    const productManager = new ProductManager('./database/db.json')
    const products = await productManager.getProducts()

    res.render('home', { products })
})

export default router