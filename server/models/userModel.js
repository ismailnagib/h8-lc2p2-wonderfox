const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likedVideos: [{
        type: Schema.Types.ObjectId,
        ref: 'Videos' 
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema)
module.exports = User