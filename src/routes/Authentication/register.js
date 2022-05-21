const express = require("express")
const router = new express.Router();
const { authSchema } = require('../../moduls/auth')
const bcrypt = require('bcrypt');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const authPhoneNumber = process.env.TWILIO_PHONENUMBER;
const client = require('twilio')(accountSid, authToken);

router.post("/", async (req, res) => {
    try {
        let user = await authSchema.findOne({ phoneNumber: req.body.phoneNumber });
        if (user) {
            return res.status(202).send({ message: 'Your phone number is already registered' });
        } else {
            const securePass = await bcrypt.hash(req.body.password, 10)
            const otp = Math.floor(Math.random() * 72) * 34;
            req.body.password = securePass
            req.body.otp = otp
            req.body.verify = "false"
            client.messages
                .create({
                    to: req.body.phoneNumber,
                    from: authPhoneNumber,
                    body: `Your QUCU verification code is: ${otp}`,
                })
                .then(message => console.log(message.sid)).catch((err) => console.log(err))
            setTimeout(async () => {
                req.body.otp = null;
                const addauth = new authSchema(req.body)
                addauth.save()
            }, 300000);
            const addauth = new authSchema(req.body)
            addauth.save()
            res.status(202).send({ message: "One Time Verification Code Sended" })
        }

    }
    catch (err) {
        console.log(err);
        res.status(202).send({ message: "Please fill valid information" })
    }
})

router.post("/verify", async (req, res) => {
    try {
        let user = await authSchema.findOne({ otp: req.body.otp });
        if (!user) {
            return res.status(202).send({ message: 'Your One Time Verification Code is Invalid' });
        } else {
            const _id = user[0]._id
            req.body.verify = "true";
            const updateauth = await authSchema.findByIdAndUpdate(_id, req.body, {
                new: true
            })
            res.status(202).send({ message: "Your account was created successfully!" })
        }

    }
    catch (err) {
        res.status(202).send({ message: "Please fill valid information" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const _id = req.params.id
        authSchema.findOne({ _id: _id }, async (err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                res.status(201).send(user)
            }
        }
        )
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