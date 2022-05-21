const bodyParser = require('body-parser');
const cors = require('cors');
const express = require("express");
require('./src/db/connect')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 8000
app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: false }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: false }))
app.use(cors());

app.use("/api/auth/register", require("./src/routes/Authentication/register"))
app.use("/api/auth/login", require("./src/routes/Authentication/login"))
app.use("/api/auth", require("./src/routes/Authentication/forgetPassword"))
app.get("/", (req, res) => {
    res.send("hello Shahbaz");
})
app.listen(port, () => {
    console.log(`Server Is Running Please Open This Link http://localhost:${port}/`);
})
