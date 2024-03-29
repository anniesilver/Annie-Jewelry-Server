const knex = require('knex')(require('../knexfile'));
const jwt = require("jsonwebtoken");
// NOTE: Secret Keys should NEVER be included in source code. Better kept in
// environment variables provided on deployment. For demo purposes only.
const jsonSecretKey = "0280190174cd2f36c48b3f431d1502fe1f54355751c75d2aac28e55f06b86637";


function authorize(req,res,next){
  const token = getToken(req);
  if (token) {
    if (jwt.verify(token, jsonSecretKey)) {
      req.decode = jwt.decode(token);
      next();
    } else {
      res.status(403).json({ error: "Not Authorized." });
    }
  } else {
    res.status(403).json({ error: "No token. Unauthorized." });
  }
}

function getToken(req) {
  if(!req.headers.authorization){
    return;
  } else {
    return req.headers.authorization.split(" ")[1];
  }
}



const userSignup = async (req, res) => {
  const { email, firstname,lastname, password } = req.body;
  
  try {     
    const user = {
      email:email,
      firstname:firstname,
      lastname:lastname,
      password:password,
      contact:JSON.stringify({
        address:"house NO. street name Drive",
        phone:"6476673308",
        postal:"L6J7C4"
      })    
    }
    const user_id = await knex('users')
    .insert(user); 
    const myToken = jwt.sign(
      { 
        firstname: user.firstname,
        user_id: user_id[0],
      }, jsonSecretKey);

    res.json({ success: "true", token: myToken });

  } catch(err) {
    console.error(`Error insert in new USER info to db: ${err}`)
    res.status(500).json({ error: "Failed WHEN signup." });
  } 
  res.json();
}

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try{

    const user = await knex('users')
    .where({ email: email }).first();  

    if (user && user.password === password) {

      const myToken = jwt.sign(
        { 
          firstname: user.firstname,
          user_id: user.id,
        }, jsonSecretKey);

      res.json({ token: myToken });
    } 
    else {
      res.status(403).json({
        token: "",
        error: {
          message: "Error logging in. Invalid username/password combination.",
        },
      });
    }
  }catch(e){
    console.error("could not find user",e);
    res.status(403).json({
      token: "",
      error: {
        message: "Error logging in. Invalid username/password combination.",
      }
    });
  }
}


async function userProfile(req, res){
  const user_id = req.decode.user_id;

  try {
    const userFound = await knex("users")
      .where({ id: user_id });  
    if (userFound.length === 0) {
      return res.status(404).json({
        message: `user with ID ${req.params.user_ID} not found` 
      });
    }

    res.json(userFound[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve product data for product with ID ${req.params.id}`,
    });
  }
}



module.exports = {
  userLogin,
  userSignup,
  userProfile,
  authorize
};

