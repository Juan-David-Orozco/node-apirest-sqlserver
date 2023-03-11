import { connectDB, sql, queries } from '../database'

export const getProducts = async (req, res) => {
  try {
    const pool = await connectDB()
    const result = await pool.request().query(queries.getAllProducts)
    const products = result.recordset
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const createProduct = async (req, res) => {
  const { Name, Description } = req.body
  let { Quantity } = req.body
  if (Name == null || Description == null) {
    return res.status(400).json({msg: "Bad Request"})
  }
  if (Quantity == null) Quantity = 0
  try {
    const pool = await connectDB()
    await pool.request()
      .input("name", sql.VarChar, Name)
      .input("description", sql.Text, Description)
      .input("quantity", sql.Int, Quantity)
      .query(queries.addNewProduct)
    res.status(201).json({msg: "Create New Product"})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const getProduct = async (req, res) => {
  try {
    const pool = await connectDB()
    const result = await pool.request()
      .input("id", req.params.id)
      .query(queries.getProductById)
    if(result.rowsAffected[0] === 0) return res.status(400).json({msg: "Product Not Found"})
    const product = result.recordset[0]
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const pool = await connectDB()
    const result = await pool.request()
      .input("id", req.params.id)
      .query(queries.removeProduct)
    if(result.rowsAffected[0] === 0) return res.status(400).json({msg: "Product Not Found"})
    res.status(204).json()
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const getTotalProduct = async (req, res) => {
  try {
    const pool = await connectDB()
    const result = await pool.request()
      .query(queries.getTotalProducts)
    const totalProducts = result.recordset[0]['']
    console.log(totalProducts)
    res.status(200).json({msg: `Total products: ${totalProducts}`})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const updateProduct = async (req, res) => {
  const { Name, Description, Quantity } = req.body
  if (Name == null || Description == null || Quantity == null) {
    return res.status(400).json({msg: "Bad Request"})
  }
  try {
    const pool = await connectDB()
    const result = await pool.request()
      .input("id", req.params.id)
      .input("name", sql.VarChar, Name)
      .input("description", sql.Text, Description)
      .input("quantity", sql.Int, Quantity)
      .query(queries.editProduct)
    if(result.rowsAffected[0] === 0) return res.status(400).json({msg: "Product Not Found"})
    res.status(200).json({ Name, Description, Quantity })
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}