const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Session } = require("../bin/models/sessionsSchem");

function passwordHash(password) {
  return bcrypt.hashSync(password, 10);
}

async function auth(req, res, next) {
  try {
    //get token
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.jsonRes("Token manquant", null, null, 401);
  const token = authHeader.split(" ")[1];
  //check token
  const decodedToken = jwt.verify(token, "cookies");

  //find session token 
  const sessionId = await Session.findOne({ token: token }).exec();
  match = sessionId.token === token ? true : false;
  if (!match) return res.jsonRes("Token invalide", null, null, 401);
  next();
} catch (err) {
  console.log(err);
  return res.jsonRes("Erreur d'authentification", null, err, 401);
}
}

module.exports = { passwordHash, auth };
