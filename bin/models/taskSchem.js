const mongoose = require("./dbconnect");
const modelName = "Task";

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}); // add validating Schema
const Task = mongoose.model(modelName, taskSchema);

module.exports = { Task, modelName, taskSchema };  // export the model