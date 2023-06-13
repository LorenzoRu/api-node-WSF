const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function passwordHash(password) {
  return bcrypt.hashSync(password, 10);
}

 async function auth(req, res, next) {
  // get token
  const authorisation = req.heders.authorization.split(" ");
  const token = authorisation[1];
  // verify token and decrypt
  const decodedToken = jwt.verify(token, 'cookies');
  console.log(decodedToken);
  // find token in sessions
   const session = req.db.sessions.find(session => session.user_id === decodedToken.id && token === session.token);
  // !error 
  if(session === undefined){
    res.jsonRes('Invalid token', null, null, 403);
  }
  else {
    next();
  }
}

module.exports = { passwordHash, auth };