const express = require("express")
const router = new express.Router();
const { authSchema } = require('../../moduls/auth')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Data Create 
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post("/", upload.single("profileImg"), (req, res) => {
    try {
        const email = req.body.email
        authSchema.find({ email: email })
            .exec()
            .then(async (user) => {
                if (user.length < 1) {
                    res.status(202).json({ message: "User No Found" })
                }
                else {
                    const _id = user[0]._id.toString();
                    const url = req.protocol + '://' + req.get('host')
                    req.body.profileImg = url + '/public/' + req.file.filename;
                    const updateUser = await authSchema.findByIdAndUpdate(_id, req.body, {
                        new: true
                    })
                    res.status(201).send(updateUser)
                }
            })
            .catch(e => {
                res.status(202).send({ message: "User Not Found" })
            })
    }
    catch (err) {
        console.log(err)
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