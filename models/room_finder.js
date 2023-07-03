const mongoose = require('mongoose')
const rooms = require('../data/room')


const roomFinderSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    images: {
        type: Array,
        default : []
    },
    user: {type: mongoose.Types.ObjectId, ref: 'user'}
}, {
    timestamps: true    
});
roomFinderSchema.set('toJSON', {
    transform:(document, returnDocument) => {
        returnDocument.id = document._id.toString(),
        delete returnDocument._id;
        delete returnDocument.__v

    }
});

module.exports = mongoose.model('RoomFinder', roomFinderSchema)