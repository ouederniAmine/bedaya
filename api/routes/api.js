const router = require('express').Router();
const {Client} = require('pg');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {users} = require('../database');


require('dotenv').config();
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
client.connect();




router.get('/invoices', async (req, res) => {
   // select all the data from invoice table where id = req.body.id and join with the foreing key clientId
    // select all the data from invoice table where id = req.body.id and join with the foreing key clientId

    try {
        const query = `SELECT * FROM invoices`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)

        res.status(500).json({message: 'Something went wrong'});
    }

}); 

router.post('/invoices', async (req, res) => {
    try {
        // insert into table invoices the values of columns : clientid, responses, date, pdflink
        const {clientid, responses, pdflink} = req.body;
        const date = new Date();
        const query = `INSERT INTO invoices (clientid, responses, date, pdflink) VALUES ('${clientid}', '${responses}', '${date.toDateString()}', '${pdflink}')`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)

        res.status(500).json({message: 'Something went wrong'});
    }
});

router.post('/choice', async (req, res) => {
    try {
        // insert into table choice the values of columns : name, uservalue , price, unitid ,variableid, questionid
        const {name, uservalue, price, unitid, variableid, questionid} = req.body;
        const query = `INSERT INTO choice (name, uservalue, price, unitid, variableid, questionid) VALUES ('${name}', '${uservalue}', '${price}', '${unitid}', '${variableid}', '${questionid}')`;
        const result = await client
        .query
        (query);            
        res.json(result.rows);
    } catch (e) {
        console.log(e)

        res.status(500).json({message: 'Something went wrong'});
    }
});
// 

router.post('/question', async (req, res) => {
    try {
        // update table question the values of columns : text
        const {text, choicesid} = req.body;
        const query = `INSERT INTO question (text) VALUES ('${text}') RETURNING id`;
        const result = await client
        .query
        (query);
       //get the last id from the question table
        const questionid = result.rows[0].id;
        

        //make an array of choiceids from choicesid
        const choiceid = choicesid.split(',');
        //update the questionid in each choice table with choiceid
        for (let i = 0; i < choiceid.length; i++) {
            const query = `UPDATE choice SET questionid = '${questionid}' WHERE id = ${choiceid[i]}`;
            const result = await client
            .query
            (query);

        }
        const result1 = await client
        .query
        (query);
        res.json(result1.rows);
    } catch (e) {
        console.log(e)  
        res.status(500).json({message: 'Something went wrong'});
    }
});
//put to question table
router.put('/question', async (req, res) => {
    try {
        // update table question the values of columns : text
        const {text, questionid, choicesid} = req.body;
        const query = `UPDATE question SET text = '${text}' WHERE id = '${questionid}'`;
        //make an array of choiceids from choicesid
        const choiceid = choicesid.split(',');
        //update the questionid in each choice table with choiceid
        for (let i = 0; i < choiceid.length; i++) {
            const query = `UPDATE choice SET questionid = '${questionid}' WHERE id = '${choiceid[i]}'`;
            const result = await client
            .query
            (query);

        }
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)  
        res.status(500).json({message: 'Something went wrong'});
    }
});
//delete from question table
router.delete('/question', async (req, res) => {
    try {
        // delete from table question the values of columns : text
        const {id} = req.body;
        const query = `DELETE FROM question WHERE id = '${id}'`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});

//get all the data from the table question
router.get('/question', async (req, res) => {
    try {
        const query = `SELECT * FROM question`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});


router.post('/unit', async (req, res) => {
    try {
        // insert into table unit the values of columns : name
        const {name} = req.body;
        const query = `INSERT INTO unit (name) VALUES ('${name}')`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)

        res.status(500).json({message: 'Something went wrong'});
    }
});
// get all data from table unit
router.get('/unit', async (req, res) => {
    try {
        const query = `SELECT * FROM unit`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});


// post to factor table
router.post('/factor', async (req, res) => {
    try {
        // insert into table factor the values of columns : name, value
        const {name, value} = req.body;
        const query = `INSERT INTO factor (name, value) VALUES ('${name}', '${value}')`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)

        res.status(500).json({message: 'Something went wrong'});
    }
});

// get all data from table factor
router.get('/factor', async (req, res) => {
    try {
        const query = `SELECT * FROM factor`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});

// post to reponse table
router.post('/response', async (req, res) => {
    try {
        // insert into table reponse the values of columns : questiondid, choiceid, invoiceid
        const {questionid, choiceid, invoiceid} = req.body;
        const query = `INSERT INTO response (questionid, choiceid, invoiceid) VALUES ('${questionid}', '${choiceid}', '${invoiceid}')`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)

        res.status(500).json({message: 'Something went wrong'});
    }
});
// get all the data from response table
router.get('/response', async (req, res) => {
    try {
        const query = `SELECT * FROM response`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});

// update factorid in the params by factor value in the body of the request
router.put('/factor/:factorid', async (req, res) => {
    try {
        const {factorid} = req.params;
        const {value} = req.body;
        const query = `UPDATE factor SET value = '${value}' WHERE factorid = '${factorid}'`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});
// update variableid in the params by variable value in the body of the request
router.put('/variableValue/:variableid', async (req, res) => {
    try {
        const {variableid} = req.params;
        const {value} = req.body;
        const query = `UPDATE variable SET value = '${value}' WHERE variableid = '${variableid}'`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});
// update resultid in the params by operation var1id and var2id in the body of the request
router.put('/operation/:resultid', async (req, res) => {
    try {
        const {operationtype} = req.params;
        const {var1id, var2id, resultid} = req.body;
        const query = `UPDATE operations SET var1id = '${var1id}', var2id = '${var2id}', operationtype = '${operationtype}' WHERE resultvarid = ${resultid}`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});

//delete variableid in the params
router.delete('/variable/:variableid', async (req, res) => {
    try {
        const {variableid} = req.params;
        const query = `DELETE FROM variable WHERE variableid = '${variableid}'`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});
//delete factorid in the params
router.delete('/factor/:factorid', async (req, res) => {
    try {
        const {factorid} = req.params;

        const query = `DELETE FROM factor WHERE factorid = '${factorid}'`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {

        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});

//delete questionid in the params
router.delete('/question/:questionid', async (req, res) => {
    try {
        const {questionid} = req.params;
        const query = `DELETE FROM question WHERE questionid = '${questionid}'`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});

//delete invoiceid in the params
router.delete('/invoice/:invoiceid', async (req, res) => {
    try {
        const {invoiceid} = req.params;
        const query = `DELETE FROM invoice WHERE invoiceid = '${invoiceid}'`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)

        res.status(500).json({message: 'Something went wrong'});
    }
});


//post to variable table
router.post('/variable', async (req, res) => {
    try {
        // insert into table variable the values of columns : name, factorid, value
        const {name, var1id, value , unitid, operationtype , var2id} = req.body;
        const query = `INSERT INTO variable (name, value, unitid) VALUES ('${name}', ${value} , ${unitid})`;
        const result = await client
        .query
        (query);
        //get the variableid of the last inserted row
        const query2 = `SELECT id as variableid FROM variable ORDER BY id DESC LIMIT 1`;
        const result2 = await client
        .query
        (query2);
        const resultid = result2.rows[0].variableid;
        //insert into table operation the values of columns : variable1id, variable2id, operationtype, resultid
        const query3 = `INSERT INTO operations (var1id, var2id, operationtype, resultvarid) VALUES (${var1id}, ${var2id}, '${operationtype}', ${resultid})`;
        const result3 = await client    
        .query
        (query3);

        res.json(result3.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});

    }
});
//get all data from variable table
router.get('/variable', async (req, res) => {
    try {
        const query = `SELECT * FROM variable`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});
// get all data from table choice
router.get('/choice', async (req, res) => {
    try {
        const query = `SELECT * FROM choice`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});


//post to client table with the values of columns : name, date, phone
router.post('/clients', async (req, res) => {
    try {
        const {name, phone} = req.body;
        //current date in string format dd/mm/yyyy
        const date = new Date().toLocaleDateString();
        const query = `INSERT INTO clients (name, date, phone) VALUES ('${name}', '${date}', '${phone}')`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});
//get all users from clients table
router.get('/clients', async (req, res) => {
    try {
        const query = `SELECT * FROM clients`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});

//post to operation table values: operationtype ,var1id ,var2id, resultid,operationname
router.post('/operation', async (req, res) => {
    try {
        const {operationtype, var1id, var2id, resultvarid, operationname} = req.body;
        const query = `INSERT INTO operations (operationtype, var1id, var2id, resultvarid, operationname) VALUES ('${operationtype}', '${var1id}', '${var2id}', '${resultvarid}', '${operationname}')`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});
//get all data from operation table
router.get('/operation', async (req, res) => {
    try {
        const query = `SELECT * FROM operations`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});
//get the operation type from req.body (operation might be + , - , / ) and then get from the body var1 and var2 then add the result of the operation to resultid
router.post('/operation/:operationtype', async (req, res) => {
    try {
        const {operationtype} = req.params;
        const {var1id, var2id, resultid} = req.body;
        //get var1 and var2 values from variable table
        const query1 = `SELECT value FROM variable WHERE variableid = '${var1id}'`;
        const query2 = `SELECT value FROM variable WHERE variableid = '${var2id}'`;
        const var1 = await client
        .query
        (query1);
        const var2 = await client
        .query
        (query2);
        let result;
        if (operationtype === '+') {
            result = var1 + var2;
        } else if (operationtype === '-') {
            result = var1 - var2;
        } else if (operationtype === '/') {
            result = var1 / var2;
        } else if (operationtype === '*') {
            result = var1 * var2;
        }
        const query = `UPDATE variable SET value = '${result}' WHERE variableid = '${resultid}'`;
        const res = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});
router.put('/operation/:operationtype', async (req, res) => {
    try {
        const {operationtype} = req.params;
        const {var1id, var2id, resultid} = req.body;
        //update operation table with operationType var1 and var2 values where resultid
        const query = `UPDATE operations SET operationtype = '${operationtype}', var1id = '${var1id}', var2id = '${var2id}' WHERE resultvarid = '${resultid}'`;
        const result = await client
        .query
        (query);
        console.log(result);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});
//get all data from choice table with the join of  foreign keys to variable table and unit table 

router.get('/fullChoice', async (req, res) => {
    try {    
        // get all choice.id, choice.name, variable.id, variable.name, variable.unitid, unit.name  from choice and variable and unit table with the join of  foreign keys to variable table and unit table

        const query = `SELECT choice.id as choiceID, choice.name as choiceName, variable.id as variableID, variable.name as variableName, variable.unitid as unitID, unit.name as unitName FROM choice JOIN variable ON choice.variableid = variable.id JOIN unit ON variable.unitid = unit.id`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});

// get full response table with the join of  foreign keys to question table ,choice table and  invoice table
router.get('/fullResponse', async (req, res) => {
    try {
       //sql query to get all data from response table with the join of  foreign keys to question table ,choice table and  invoices table
        const query = `SELECT  choice.uservalue as value, question.id as id, response.id as responseID, variable.name as variableName,response.questionid as questionID, response.choiceid as choiceID, response.invoiceid as invoiceID, question.text as questionName, choice.name as choiceName FROM response JOIN question ON response.questionid = question.id JOIN choice ON response.choiceid = choice.id JOIN invoices ON response.invoiceid = invoices.id JOIN variable on choice.variableid = variable.id`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }
});
router.get('/fullVariable', async (req, res) => {
    try {
        //sql query to get all data from variable table with the join of  foreign keys to unit table
        const query = `SELECT variable.id as id, variable.name as variableName, variable.unitid as unitID, unit.name as unitName FROM variable JOIN unit ON variable.unitid = unit.id`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'});
    }

});
module.exports = router;
