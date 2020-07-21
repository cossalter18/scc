//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//use and serve HTML files
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

//globals
const port = 5000;
let entries = [];
let solvedProblem = [];

//spin up server
app.listen(port, () => {
    console.log('server up:', port);
})

// routes
app.get('/entries', (req, res) => {
    console.log('in /entries GET');
    res.send(entries);
}) //end /entries GET

app.get('/solved', (req,res) => {
    console.log('in /solved GET');
    res.send(solvedProblem)
})

app.post('/entries', (req, res) => {


    let numberOne = req.body.numberOne;
    let numberTwo = req.body.numberTwo;
    let operator = req.body.operator;
    let answer = 0;


    switch (operator) {
        case "+":
            answer = Number(numberOne) + Number(numberTwo)
            break;
        case "-":
            answer = Number(numberOne) - Number(numberTwo)
            break;
        case "*":
            answer = Number(numberOne) * Number(numberTwo)
            break;
        case "/":
            answer = Number(numberOne) / Number(numberTwo)
            break;
    }

    let solvedProblem = {
        numberOne: numberOne,
        numberTwo: numberTwo,
        operator: operator,
        answer: answer
    }

    entries.push(solvedProblem)
    res.send(solvedProblem)
})