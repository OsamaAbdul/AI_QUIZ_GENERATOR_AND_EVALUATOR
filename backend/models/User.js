import mongoose from "mongoose";


// Schema

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true}
});

// Model

export default mongoose.model('User', userSchema);