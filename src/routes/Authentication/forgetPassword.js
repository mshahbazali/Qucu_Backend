const express = require("express")
const router = new express.Router();
const { authSchema } = require('../../moduls/auth')
const bcrypt = require('bcrypt')
const accountSid = "ACb6fb8253fb7d40091b2900d74907b33e";
const authToken = "fc1fff0d78092aebde9de442b1fc40e2";
const authPhoneNumber = "+19403735129";
const client = require('twilio')(accountSid, authToken);
router.post("/forgotpassword", async (req, res) => {
    try {
        const phoneNumber = req.body.identifier
        authSchema.findOne({ phoneNumber: phoneNumber })
            .exec()
            .then(async (user) => {
                if (user.length < 1) {
                    res.status(202).send({
                        massage: "Please enter valid mobile number"
                    })
                }
                else {
                    const _id = user[0]._id.toString();
                    const otp = Math.floor(Math.random() * 92) * 64;
                    req.body.otp = otp;
                    const updateauth = await authSchema.findByIdAndUpdate(_id, req.body, {
                        new: true
                    })
                    client.messages
                        .create({
                            to: phoneNumber,
                            from: authPhoneNumber,
                            body: `Your QUCU verification code is: ${otp}`,
                        })
                        .then(message => console.log(message.sid)).catch((err) => console.log(err))
                    setTimeout(async () => {
                        req.body.otp = null;
                        const updateauth = await authSchema.findByIdAndUpdate(_id, req.body, {
                            new: true
                        })
                    }, 300000);

                }
            })
            .catch(e => {
                res.status(404).send({
                    massage: "User Not Found"
                })
            })
    }
    catch (e) {
        res.status(400).send(e)
    }
})
router.post("/verify", async (req, res) => {
    try {
        let user = await authSchema.findOne({ otp: req.body.otp });
        if (!user) {
            return res.status(202).send({ message: 'Your One Time Verification Code is Invalid' });
        } else {
            res.status(202).send({
                id: user[0]._id,
                message: "One Time Verification Code Successfully Verified"
            })
        }

    }
    catch (err) {
        res.status(202).send({ message: "Please fill valid information" })
    }
})
router.post("/reset-password", async (req, res) => {
    try {
        authSchema.findById({ _id: req.body.id })
            .exec()
            .then(async (user) => {
                if (user.length < 1) {
                    res.status(404).send({
                        massage: "User Not Found"
                    })
                }
                else {
                    const _id = req.body.id
                    const securePass = await bcrypt.hash(req.body.password, 10);
                    req.body.password = securePass
                    const updateauth = await authSchema.findByIdAndUpdate(_id, req.body, {
                        new: true
                    }).then(() => {
                        res.status(201).send({
                            message: "Your password successfully reset",
                        })
                    })
                }
            })
            .catch(e => {
                res.status(404).send({
                    massage: "User Not Found"
                })
            })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// Data Read 

router.get("/", async (req, res) => {
    try {
        const recivedData = await authSchema.find();
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
        const updateauth = await authSchema.findByIdAndUpdate(_id, req.body, {
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
        const updateauth = await authSchema.findByIdAndDelete(_id)
        res.status(202).send(updateauth)
    }
    catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router