    const router = require('express').Router();
    //require mysql
    const {Client} = require('pg');

    const {check, validationResult} = require('express-validator');
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

    router.post('/signup', [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password').isLength({min: 6})
    ], async (req, res) => {
        
        try {
            //console log req.body
            console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(400).json({errors: errors.array(), message: 'Invalid data'});
            }
            const {email, password} = req.body;
            //check user email in database
            const query1 = `SELECT * FROM users WHERE email = '${email}'`;
            const result1 = await client
            .query(query1);
            const candidate = result1.rows[0];

            if (candidate) {
                return res.status(400).json({message: 'User already exists'});
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            //const user to create user in database
            // create user in postgres database
         
            const query = `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}')`;
            const result = await client.query
            (query);
            console.log(result);
            // create jwt token
            const token = jwt.sign(
                {email},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            );
            console.log(token);
            res.json({token});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Something went wrong'});
        }
    });

    router.get('/users', async (req, res) => {
        try {
            const query = `SELECT * FROM users`;
            const result = await client
            .query(query);
            res.json(result.rows);
        } catch (e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    });

    router.post('/login', async (req, res) => {
        try {
            const {email, password} = req.body;
            //check user email in database
            const query = `SELECT * FROM users WHERE email = '${email}'`;
            const result = await client
            .query(query);
            const candidate = result.rows[0];
            if (!candidate) {
                return res.status(400).json({message: 'User not found'});
            }
            const isMatch = await bcrypt.compare(password, candidate.password);
            if (!isMatch) {
                return res.status(400).json({message: 'Invalid password'});
            }
            const token = jwt.sign(
                {email},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            );
            res.json({token, userId: candidate.id});
        } catch (e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    }); 
module.exports = router;
