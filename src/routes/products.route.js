import { Router } from 'express'
import { getProducts, getProduct, createProduct, deleteProduct, updateProduct, getTotalProduct } from '../controllers/products.controller'

const router = Router()

router.get('/products', getProducts)

router.post('/products/', createProduct)

router.get('/products/count', getTotalProduct)

router.get('/products/:id', getProduct)

router.delete('/products/:id', deleteProduct)

router.put('/products/:id', updateProduct)

export default router