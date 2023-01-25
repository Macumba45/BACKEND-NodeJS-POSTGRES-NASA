import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({

    name: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,

    },
    favList: {
        type: [String]
    },

}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

export default User