const mongoose = require("./dbconnect");
const modelName = "Task";

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: String,
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
}); // add validating Schema
const Task = mongoose.model(modelName, taskSchema);

module.exports = { Task, modelName, taskSchema };  // export the model