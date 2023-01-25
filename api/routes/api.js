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
        const {clientid} = req.body;
        const query = `INSERT INTO invoices (clientid) VALUES ( '${clientid}')`;
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

router.post('/question', async (req, res) => {
    try {
        // insert into table question the values of columns : text
        const {text} = req.body;
        const query = `INSERT INTO question (text) VALUES ('${text}')`;
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
router.put('/variable/:variableid', async (req, res) => {
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


//post to variable table
router.post('/variable', async (req, res) => {
    try {
        // insert into table variable the values of columns : name, factorid, value
        const {name, factorid, value , unitid} = req.body;
        const query = `INSERT INTO variable (name, factorid, value, unitid) VALUES ('${name}', '${factorid}', '${value}' , '${unitid}')`;
        const result = await client
        .query
        (query);
        res.json(result.rows);
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
        const {operationtype, var1id, var2id, resultid, operationname} = req.body;
        const query = `INSERT INTO operation (operationtype, var1id, var2id, resultid, operationname) VALUES ('${operationtype}', '${var1id}', '${var2id}', '${resultid}', '${operationname}')`;
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
        const query = `SELECT * FROM operation`;
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
