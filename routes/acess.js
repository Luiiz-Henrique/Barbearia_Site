var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
var contactsDAO = require('../src/models/dao/contactsDAO')
const { name } = require('ejs');
const crypto = require('crypto');
const { login } = require('../src/models/dao/contactsDAO');
//var cookieParser = require('cookie-parser');

require('dotenv').config()

const uri = process.env['URI']
const client = new MongoClient(uri)

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

const authTokens = {};

//router.use(cookieParser())

/* GET home page. */
router.post('/', function(req, res) {
    const {email, password} = req.body;
    const hashedPassword = getHashedPassword(password)

    contactsDAO.login(client, email, hashedPassword).then( (user) => {
        if (user) {
            const authToken = generateAuthToken();
            authTokens[authToken] = user;
            console.log("a lista de tokens  :")
            console.log(authTokens)
            res.cookie('AuthToken', authToken);
            res.redirect('/');
            console.log("\n\n\n\n\nlogado com sucesso")
            console.log('o user: ')
            console.log(user)
            console.log('os tokens: ')
            console.log(authTokens)
        } else {
            res.render('entrar')
            console.log("email ou senha errado")
        }
    })
});

module.exports = router;