const express = require('express');
const RoomFinder = require('../models/room_finder')
const roomFinderController = require('../controller/room_finder')
const rooms = require('../data/room')
const{verifyUser, verifyAdmin} = require('../middleware/auth')
const router = express.Router();

router.route('/')
.get(verifyUser,roomFinderController.getAllRooms)
.post(verifyUser,roomFinderController.createARoom)
.put((req,res, next) => {
    res.status(405).json({error: "Put request is not allowed"})
})
.delete(verifyAdmin,roomFinderController.deleteAllRoom)

router.route('/:room_id')

.get(verifyUser,roomFinderController.getRoomById)
.put(verifyUser, roomFinderController.updateRoom)
.delete(verifyUser,roomFinderController.deleteRoomById)
.post((req, res) => {
    res.status(405).json({ error: "POST method is not allowed here" });
});

module.exports = router;