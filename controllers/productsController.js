const knex = require('knex')(require('../knexfile'));
const productList = async (_req, res) => {
    try {
      const data = await knex.from('products')
      .select('id','sku', 'name', 'main_img','price','sold','discount_price');            
      res.status(200).json(data);
    } catch(err) {
      res.status(400).send(`Error retrieving Users: ${err}`)
    }
}
const productById = async (req, res) => {
    try {
      const productFound = await knex("products")
        .where({ id: req.params.id });  
      if (productFound.length === 0) {
        return res.status(404).json({
          message: `product with ID ${req.params.id} not found` 
        });
      }
      res.json(productFound[0]);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve product data for product with ID ${req.params.id}`,
      });
    }
  }
  
const productComments = async (req,res) =>{
    try{
        const posts=await knex('products')
        .join("post", "post.user_id", "user.id")
      .where({ user_id: req.params.id });
        res.status(200).json(posts);
    }catch{
      res.status(500).json({
        message: `Unable to retrieve posts  for user with ID ${req.params.id}`,
      });
    }
}

module.exports = {
    productList,
    productById,
    productComments
  };
  