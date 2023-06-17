const mongoose = require("./dbconnect");
const modelName = "User";
const { Task } = require("./taskSchem");


//add validating Schema


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});
Task.find()
  .populate("user_name", "name") // Populate the user field and only retrieve the name field
  .exec()
  .catch((error) => {
    // Error retrieving tasks
    console.log(error);
  });

const User = mongoose.model(modelName, userSchema);
module.exports = { User, modelName, userSchema };
