const knex = require('knex')(require('../knexfile'));
const orderList = async (_req, res) => {
    try {
      const data = await knex.from('orders')
      .select('id','user_id');            
      res.status(200).json(data);
    } catch(err) {
      res.status(400).send(`Error retrieving Users: ${err}`)
    }
}

module.exports = {
    orderList
}