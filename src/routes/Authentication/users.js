const express = require("express")
const router = new express.Router();
const auth = require('../../moduls/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Data Read 

router.get("/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const recivedData = await auth.findById(_id)
            .then((result) => {
                res.status(201).send(result)
            })
            .catch((err) => {
                res.status(404).send({
                    massage: "no user"
                })
            })
    }
    catch (e) {
        res.status(204).send(e)
    }
})

// Data Update 

router.patch("/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const updateauth = await auth.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.status(202).send(updateauth)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

// Data Delete 

router.delete("/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const updateauth = await auth.findByIdAndDelete(_id)
        res.status(202).send(updateauth)
    }
    catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router