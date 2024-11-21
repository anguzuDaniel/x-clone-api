const mongose = require('mongoose');

const imageScheema = mongose.Schema({
    url: { type: String, required: true },
    key: { type: String, required: true },
    userId: { type: mongose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: String },
    uploadedAt: { type: Date, default: Date.now }
});

const Image = mongose.model('Image', imageScheema);

module.exports = Image;