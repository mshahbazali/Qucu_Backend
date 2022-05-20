const express = require("express")
const router = new express.Router();
const users = require('../../moduls/users')
// Data Create 

// router.post('/', secured(),async function(req, res) {
//     try{
//       var assetData = {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//       };
//       await FixedAsset.create(assetData, function (error, asset) {
//         if (error) {
//           return next(error);
//         } else {
//           res.redirect('/financial/assets/fixed-assets');
//         }
//       });
//     }
//     catch(err){
//       res.redirect('/somewhere else/ a 404 page')
//     }
//   });

router.post("/",  async (req, res) => {
    try {
        const addUsers = new users(req.body)
        addUsers.save()
        res.status(201).send(req.body)
        console.log(req.body.name)
    }
    catch (e) {
        res.status(400).send(e)
    }

})

// Data Read 

router.get("/", async (req, res) => {
    try {
        const recivedData = await users.find();
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
        const updateUsers = await users.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.status(202).send(updateUsers)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

// Data Delete 

router.delete("/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const updateUsers = await users.findByIdAndDelete(_id)
        res.status(202).send(updateUsers)
    }
    catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router