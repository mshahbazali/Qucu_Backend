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
        let user = await authSchema.findOne({ phoneNumber: req.body.identifier });
        if (user == null) {
            res.status(202).send({
                massage: "Please enter valid mobile number"
            })
        }
        else {
            const _id = user._id.toString();
            const otp = Math.floor(1000 + Math.random() * 9000);
            req.body.otp = otp;
            const updateauth = await authSchema.findByIdAndUpdate(_id, req.body, {
                new: true
            })
            client.messages
                .create({
                    to: req.body.identifier,
                    from: authPhoneNumber,
                    body: `Your QUCU verification code is: ${otp}`,
                })
                .then(message => {
                    res.status(202).send({ message: "Otp Sended" })
                }).catch((err) => console.log(err))
            res.status(202).send({
                message: "Mobile number is valid",
                user: updateauth
            })
            setTimeout(async () => {
                req.body.otp = null;
                const updateauth = await authSchema.findByIdAndUpdate(_id, req.body, {
                    new: true
                })
            }, 300000);
        }
    }
    catch (err) {
        res.status(400).send({ err: err })
    }
})
router.post("/verify", async (req, res) => {
    try {
        let user = await authSchema.findOne({ otp: req.body.otp });
        if (user == null) {
            return res.status(202).send({ message: 'Your One Time Verification Code is Invalid' });
        } else {
            res.status(202).send({
                id: user._id.toString(),
                message: "One Time Verification Code Successfully Verified"
            })
        }

    }
    catch (err) {
        res.status(202).send({ message: "Please fill valid information" })
    }
})
router.post("/resetpassword", async (req, res) => {
    try {
        let user = await authSchema.findOne({ _id: req.body.id });
        if (user == null) {
            res.status(202).send({
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
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.post("/resend", async (req, res) => {
    try {
        let user = await authSchema.findOne({ id: req.body.id });
        if (!user) {
            return res.status(202).send({ message: 'User Not Found' });
        } else {
            const _id = user._id
            const otp = Math.floor(1000 + Math.random() * 9000);
            req.body.otp = otp
            client.messages
                .create({
                    to: req.body.phoneNumber,
                    from: authPhoneNumber,
                    body: `Your QUCU verification code is: ${otp}`,
                })
                .then(message => console.log(message.sid)).catch((err) => console.log(err))
            const updateauth = await authSchema.findByIdAndUpdate(_id, req.body, {
                new: true
            })
            res.status(202).send({ message: "Otp Send Sucessfully" })
        }
    }
    catch (err) {
        res.status(202).send({ message: "Please fill valid information" })
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