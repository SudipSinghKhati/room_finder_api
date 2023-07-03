
const RoomFinder = require('../models/room_finder')
const getAllRooms = async(req, res) =>{
    try {
        const room = await RoomFinder.find();
        res.json(room);
    }
    catch (error) {
        console.log(error);
    }
}

const createARoom =(req,res,next) => {
    
    RoomFinder.create(req.body)
        .then(room => res.status(201).json(room))
        .catch(next)

    
}

const deleteAllRoom =(req, res) =>{
    RoomFinder.deleteMany()
        .then(() => res.status(201).json({ "message": "Deleted all successfully" }))
        .catch(next);
}

const getRoomById = (req,res,next) => {
    RoomFinder.findById(req.params.room_id)
    .then(room => {
        if(!room){
            res.status(404).json({error: "Room Not Found"})
        }
        res.json(room);
    })
    .catch(next);
}
const updateRoom = (req, res, next) => {
    RoomFinder.findByIdAndUpdate(
        req.params.room_id,
        {$set: req.body},
        {new: true}
    )
    .then(updatedRoom => res.status(200).json(updatedRoom))
    .catch(next)
}

const deleteRoomById = (req, res, next)=>{
    RoomFinder.findByIdAndDelete(
        req.params.room_id
    )
        .then((deletedRoom) => {
            if(!deletedRoom) res.status(404).json({error:"Not Found"})
            res.status(202).end()
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
}

module.exports = {
    getAllRooms,
    createARoom,
    deleteAllRoom,
    updateRoom,
    deleteRoomById,
    getRoomById,
    
}