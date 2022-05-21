const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://qucu:qucuApplication123@cluster0.v9grx.mongodb.net/?retryWrites=true&w=majority" , { useNewUrlParser: true }).then(() => {
    console.log("connected");
})
    .catch((e) => {
        console.log("no connected");
    })