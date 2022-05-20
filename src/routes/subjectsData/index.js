const express = require("express")
const router = new express.Router();
const { authSchema, validate } = require('../../moduls/auth')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');

// Data Create 





router.post("/", async (req, res) => {
    try {
        let user = await authSchema.findOne({ email: req.body.email });
    }
    catch (err) {
        console.log(err)
    }
})

// Data Read 

router.get("/", async (req, res) => {
    try {
        // const _id = req.params.id
        // authSchema.findOne({ _id: _id }, async (err, user) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        const data = {
            subject: [{
                name: "Computer Science",
                chapter: [{
                    chapterName: "Chapter 1",
                    quiz: [
                        {
                            question: 'Which is used to test the solutions ?',
                            answer: ["Best solution", "Top design", "Verification", 'Analyze'],
                            corectAnswer: "Verification",
                            selectAnswer: "",
                            score: ""
                        }
                        ,
                        {
                            question: 'What is the purpose of an parallelogram shape in flowcharting ?',
                            answer: ["Decision", "Connector", "Input / Output", 'Start or End'],
                            corectAnswer: "Input / Output",
                            selectAnswer: "",
                            score: ""
                        }
                        ,
                        {
                            question: 'Which means to test if the required solution is there ?',
                            answer: ["Verification", "Algorithm", "Validation", 'Flowchart'],
                            corectAnswer: "Verification",
                            selectAnswer: "",
                            score: ""
                        }
                        ,
                        {
                            question: 'Which word refers to something spontaneous and unplanned ?',
                            answer: ["Draw", "Algorithm", "Candid", 'Flowchart'],
                            corectAnswer: "Candid",
                            selectAnswer: "",
                            score: ""
                        }
                        ,
                        {
                            question: 'Which is straightforward and unplanned in problem solving ?',
                            answer: ["Analyze", "Candid solution", "Debugging", 'Testting'],
                            corectAnswer: "Candid solution",
                            selectAnswer: "",
                            score: ""
                        }
                        ,
                        {
                            question: 'Strategy that divides a complex problem into smaller problems is called:',
                            answer: ["Prototype", "Act it Out", "Divide and Conquer", 'Solution'],
                            corectAnswer: "Divide and Conquer",
                            selectAnswer: "",
                            score: ""
                        }
                        ,
                        {
                            question: 'Which is a matter or situation needs to be dealt with and overcome ? ',
                            answer: ["Algorithm", "Problem", "Flowchart", 'Debugger'],
                            corectAnswer: "Problem",
                            selectAnswer: "",
                            score: ""
                        }
                        ,
                        {
                            question: 'Which solutions are not reached through proper algorithms or work planning ? ',
                            answer: ["Prepared solution", "Candid solution", "Strategized solution", 'Best solution'],
                            corectAnswer: "Candid solution",
                            selectAnswer: "",
                            score: ""
                        }
                        ,
                        {
                            question: 'Which is a set of steps to solve a problem ?',
                            answer: ["Program", "Algorithm", "Flowchart", 'Runtime'],
                            corectAnswer: "Algorithm",
                            selectAnswer: "",
                            score: ""
                        }
                        ,
                        {
                            question: 'Which is the initial stage of problems solving process ?',
                            answer: ["Defining", "Analyzing", "Porgramming", 'Stepping'],
                            corectAnswer: "Defining",
                            selectAnswer: "",
                            score: ""
                        }
                        ,
                        {
                            question: '________ a problem helps to solve that problem quickly.',
                            answer: ["Analyzing", "Debugger", "Algorithm", 'Solution'],
                            corectAnswer: "Analyzing",
                            selectAnswer: "",
                            score: ""
                        }
                        ,
                        {
                            question: 'A well-defined problem is the one that does not contain:',
                            answer: ["Simplicity", "Ambiguities", "Turning", 'Running'],
                            corectAnswer: "Ambiguities",
                            selectAnswer: "",
                            score: ""
                        }
                    ],
                }],
                icon: "",
                grade: ""
            }],

        }
        res.status(201).send(data)
    }
    // }
    // )
    // }
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