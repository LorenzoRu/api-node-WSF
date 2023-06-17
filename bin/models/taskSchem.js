const mongoose = require("./dbconnect");
const modelName = "Task";

const taskSchema = new mongoose.Schema({
    task_name: { type: String, required: true },
    description: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
    created_at:  String,
    updated_at: String, 
    user_name: { type: String, required: true },
}); // add validating Schema
const Task = mongoose.model(modelName, taskSchema);


module.exports = { Task, modelName, taskSchema };  // export the model