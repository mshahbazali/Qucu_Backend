const express = require("express")
const router = new express.Router();
const { authSchema } = require('../../moduls/auth')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path');

// Data Create 

// async function main(email, otp) {
//     let transporter = nodemailer.createTransport({
//         service: "gmail",
//         host: "smtp.gmail.com",
//         auth: {
//             user: "freecodestore854@gmail.com",
//             pass: "ShahbazAli8520123@",
//         },
//     });
//     const handlebarOptions = {
//         viewEngine: {
//             partialsDir: path.resolve('././src/views/'),
//             defaultLayout: false,
//         },
//         viewPath: path.resolve('././src/views/'),
//     };
//     transporter.use('compile', hbs(handlebarOptions))
//     let info = await transporter.sendMail({
//         from: '"WebixNow" <freecodestore854@gmail.com>', // sender address
//         to: email, // list of receivers
//         subject: "One Time Password", // Subject line
//         text: "OTP",
//         template: 'index', // the name of the template file i.e email.handlebars
//         context: {
//             otp: otp, // replace {{name}} with Adebola
//             style: "././src/views/style.css",
//         }

//     });
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }


router.post("/forget-password", async (req, res) => {
    try {
        const email = req.body.email
        authSchema.find({ email: email })
            .exec()
            .then(async (user) => {
                if (user.length < 1) {
                    res.status(404).send({
                        massage: "User Not Found"
                    })
                }
                else {
                    const _id = user[0]._id.toString();
                    const otp = Math.floor(Math.random() * 972) * 634;
                    await main(user[0].email, otp).catch("error").then(async () => {
                        req.body.otp = otp;
                        const updateauth = await authSchema.findByIdAndUpdate(_id, req.body, {
                            new: true
                        })
                        setTimeout(async () => {
                            req.body.otp = null;
                            const updateauth = await authSchema.findByIdAndUpdate(_id, req.body, {
                                new: true
                            })
                            console.log("OK")
                            res.status(202).send(updateauth)
                        }, 120000);
                    })
                        .catch((e) => {
                            console.log(e)
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
router.post("/reset-password", async (req, res) => {
    try {
        const userOtp = req.body.otp
        authSchema.find({ otp: userOtp })
            .exec()
            .then(async (user) => {
                if (user.length < 1) {
                    res.status(404).send({
                        massage: "User Not Found"
                    })
                }
                else {
                    if (req.body.otp == user[0].otp) {
                        res.status(201).send({
                            massage: "User OTP SUCCESS"
                        })
                        const _id = user[0]._id.toString();
                        const securePass = await bcrypt.hash(req.body.password, 10);
                        req.body.password = securePass
                        const updateauth = await authSchema.findByIdAndUpdate(_id, req.body, {
                            new: true
                        })
                        // res.status(201).send(updateauth)

                    }
                    else {
                        console.log("sorry")
                    }
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