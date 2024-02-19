const knex = require('knex')(require('../knexfile'));
const jwt = require("jsonwebtoken");
// NOTE: Secret Keys should NEVER be included in source code. Better kept in
// environment variables provided on deployment. For demo purposes only.
const jsonSecretKey = "0280190174cd2f36c48b3f431d1502fe1f54355751c75d2aac28e55f06b86637";


function authorize(req,res,next){
  const token = getToken(req);
  if (token) {
    console.log('Auth Token:', token);
    if (jwt.verify(token, jsonSecretKey)) {
      // Decode the token to pass along to end-points that may need
      // access to data stored in the token.
      req.decode = jwt.decode(token);
      console.log("decoded data", req.decode);
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

const users = {};

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
    console.log(user);
    const data = await knex('users')
    .insert(user); 
  } catch(err) {
    console.error(`Error insert in new USER info to db: ${err}`)
    res.status(500).json({ error: "Failed WHEN signup." });
  } 
  res.json({ success: "true" });
}

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try{
    console.log(`user ${email} trying to login with password： ${password}`)
    const user = await knex('users')
    .where({ email: email }).first();  
    console.log(typeof(user.password));
    console.log(typeof(password));
    if (user && user.password === password) {
      console.log('Found user:', user);
      const myToken = jwt.sign(
        { 
          firstname: user.firstname,
          user_id: user.id,
        }, jsonSecretKey);
      console.log(myToken);
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
  res.json(req.decode);
}

module.exports = {
  userLogin,
  userSignup,
  userProfile,
  authorize
};

