export const queries = {
  getAllProducts : 'SELECT * FROM Products',
  getProductById: 'SELECT * FROM Products WHERE id = @id',
  addNewProduct : 'INSERT INTO Products (name, description, quantity) VALUES (@name, @description, @quantity)',
  removeProduct : 'DELETE FROM Products WHERE id = @id',
  editProduct : 'UPDATE Products SET name = @name, description = @description, quantity = @quantity WHERE id = @id',
  getTotalProducts: 'SELECT COUNT(*) FROM [webstore].[dbo].[Products]'
}