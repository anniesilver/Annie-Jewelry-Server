const knex = require('knex')(require('../knexfile'));


const productSearch = async (req, res) => {
    try{
        const keywords = req.query.keywords;
        console.log(req.query);
        console.log(keywords);
        const queryBuilder = knex('products')
        .select('id','sku', 'name', 'main_img','price','sold','discount_price')
        .where(builder => {
            keywords.forEach((searchString, index) => {
            if (index === 0) {
                builder.where('name', 'like', `%${searchString}%`);
            } else {
                builder.andWhere('name', 'like', `%${searchString}%`);
            }
            })
        });       
        console.log(queryBuilder.toString());
        const data = await knex.from('products')       
            .select('id','sku', 'name', 'main_img','price','sold','discount_price')
            .where(builder => {
                keywords.forEach((searchString, index) => {
                if (index === 0) {
                    builder.where('name', 'like', `%${searchString}%`);
                } else {
                    builder.andWhere('name', 'like', `%${searchString}%`);
                }
                })
            });       
      
      if(data){
        res.status(200).json(data);
      }
      else{
        res.status(404).json({
            message:`Could not find any product with those keywords `
        });
      }      
    } 
    catch(e){
        res.status(500).json({
            message: `Error in searching proudct with keywords`,
        });
    }
}

  
module.exports = {
    productSearch,
};
  