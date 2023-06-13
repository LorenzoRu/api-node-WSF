const mongoose = require("./dbconnect");
const modelName = "User";
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: String,
});
 userSchema.statics.logUser = async (name, password) => {
   const user = User.findOne({ name: name }).exec();
    if (user === null) throw "Erreur pas";
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw "Erreur d'authentification";
    return user;
 };
const User = mongoose.model(modelName, userSchema);
module.exports = { User, modelName, userSchema };