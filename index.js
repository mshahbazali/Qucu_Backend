const bodyParser = require('body-parser');
const cors = require('cors');
const express = require("express");
require('./src/db/connect')
require('dotenv').config();
// const accountSid = 'AC6a2f45fbb7b4d63a6ded3bcdc57aa1ed'; // Your Account SID from www.twilio.com/console
// const authToken = 'e0ef986bc2db9bcb77f08d51049f9a0d'; // Your Auth Token from www.twilio.com/console

// const client = require('twilio')(accountSid, authToken);

const app = express()
const port = process.env.PORT || 8000
app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: false }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: false }))
app.use(cors());

app.use("/api/user", require("./src/routes/Authentication/user"))
app.use("/api/auth/register", require("./src/routes/Authentication/register"))
app.use("/api/auth/login", require("./src/routes/Authentication/login"))
app.use("/api/auth/user", require("./src/routes/Authentication/users"))
app.use("/api/auth/updateprofile", require("./src/routes/Authentication/updateProfile"))
app.use("/api/auth/subjects", require("./src/routes/subjectsData/index"))

// Forget Password 

app.use("/api/auth", require("./src/routes/Authentication/forgetPassword"))
// app.use("/api/profile", require("./src/routes/profileImg"))
// app.use("/api/auth/otp", require("./src/routes/users"))
// app.use("/api/auth/reset-password", require("./src/routes/users"))

// Data Create Post Method 
// Data Read Get Method 
// Data Update Put and Patch Method 
// Data Delete Delete Method 
// app.use('/public', express.static('public'));
// app.use((req, res, next) => {
//     // Error goes via `next()` method
//     setImmediate(() => {
//         next(new Error('Something went wrong'));
//     });
// });
app.get("/", (req, res) => {
    // client.messages
    //     .create({
    //         body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    //         from: '+923424652710',
    //         to: '+923172988830'
    //     })
    //     .then(message => console.log(message.sid))
    //     .catch((err) => {
    //         console.log(err)
    //     })
    res.send("hello Shahbaz");
})
app.listen(port, () => {
    console.log(`Server Is Running Please Open This Link http://localhost:${port}/`);
})


// twilio verification code
// 5c3Px50cCrBs3lWvMeOn2dYW4tn0vCWojq3nxcY_