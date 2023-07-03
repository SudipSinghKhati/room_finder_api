const express = require('express');

const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/signUp', (req, res, next) => {
    const { firstName, middleName, lastName, contactNumber, email, password } = req.body
    User.findOne({ email: email })
        .then((user) => {
            if (user) return res.status(400).json({ error: 'Duplicate Email' })
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) return res.status(500).json({ error: err.message })
                User.create({ email, password: hash, firstName, middleName, lastName, contactNumber })
                    .then((user) => {
                        res.status(201).json(user)
                    }).catch(next)

            })
        }).catch(next)
});


router.post('/signIn', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password, (err, success) => {
                if (err) return res.status(500).json({ error: err.message })
                if (!success) return res.status(400).json({ error: 'Password doesnot match' })
                const payload = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    middleName: user.middleName,
                    lastName: user.lastName,
                    role: user.role
                }
                jwt.sign(
                    payload, process.env.SECRET,
                    { expiresIn: '1D' },
                    (err, token) => {
                        if (err) return res.status(500).json({ error: err.message })
                        res.json({ status: 'success', token: token })
                    }
                )
            })
        }).catch(next)
});

module.exports = router;