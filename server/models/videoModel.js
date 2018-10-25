const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    ytId: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Video = mongoose.model('Video', videoSchema)
module.exports = Video