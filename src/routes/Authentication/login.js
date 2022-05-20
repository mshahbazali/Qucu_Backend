const express = require("express")
const router = new express.Router();
const { authSchema } = require('../../moduls/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Data Create 

router.post("/", async (req, res) => {
    try {
        const phoneNumber = req.body.identifier
        authSchema.find({ phoneNumber: phoneNumber })
            .exec()
            .then(async (user) => {
                if (user.length < 1) {
                    res.status(202).send("User Not Found")
                }
                else {
                    await bcrypt.compare(req.body.password, user[0].password).then((pass) => {
                        if (pass === true) {
                            const token = jwt.sign({ id: user.id }, "secret_Qucu", { expiresIn: "10h" });
                            res.status(202).send({ token: token })
                        }
                        else {
                            res.status(202).send({ message: "Your password is incorrect" })
                        }
                    })
                    // jwt.verify(user[0].token, user[0].email, function (err, decoded) {
                    //     res.status(201).send({
                    //         message: "User Found",
                    //         user: user
                    //     })
                    // });
                }
            })
            .catch(e => {
                console.log(e);
                res.status(201).send({ message: "User Not Found", user: 'false' })
            })
    }
    catch (e) {
        res.status(201).send({ message: "User Not Found", user: 'false' })
    }
})

// Data Read 

router.get("/", async (req, res) => {
    try {
        const recivedData = await auth.find();
        res.status(202).send(recivedData)
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