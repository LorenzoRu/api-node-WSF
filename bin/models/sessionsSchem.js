const mongoose = require('./dbconnect');
const modelName = 'Session';

const sessionSchema = new mongoose.Schema({
    user_id: {type:mongoose.Types.ObjectId, required: true},
    token: { type: String, required: true },
    user_agent: { type: String, required: true },
    created_at: { type: Date, required: true },
});

const Session = mongoose.model(modelName, sessionSchema);

module.exports = { Session, modelName, sessionSchema};