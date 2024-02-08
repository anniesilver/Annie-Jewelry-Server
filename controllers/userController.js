const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
  try {
    const data = await knex('users');
    res.status(200).json(data);
  } catch(err) {
    res.status(400).send(`Error retrieving Users: ${err}`)
  }
}
const findOne = async (req, res) => {
  try {
    const usersFound = await knex("user")
      .where({ id: req.params.id });

    if (usersFound.length === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found` 
      });
    }

    const userData = usersFound[0];
    res.json(userData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve user data for user with ID ${req.params.id}`,
    });
  }
}

const posts = async (req,res) =>{
    try{
        const posts=await knex('user')
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
  index,
  findOne,
  posts
};

