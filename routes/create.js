var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
var contactsDAO = require('../src/models/dao/contactsDAO');
const { name } = require('ejs');
const crypto = require('crypto');

require('dotenv').config()

const uri = process.env['URI']
const client = new MongoClient(uri)

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash
}

/* GET home page. */
router.post('/', async function(req, res, next) {
    const form = req.body;
    const form_data = 
    {
        name: form.name,
        phone: form.phone,
        email: form.email,
        passwords: {
            password: form.password,
            conPassword: form.conPassword
        }
    }
    if (form_data.passwords.password === form_data.passwords.conPassword){
        const result = await contactsDAO.findContactsByEmail(client, form_data.email)
            if (result.length == 0){
                const passwordCodificado = getHashedPassword(form_data.passwords.password)

                contactsDAO.insertContact(client, {
                    name: form.name,
                    phone: form.phone,
                    email: form.email,
                    password: passwordCodificado
                });

                res.render('entrar')
            } else {
                res.render('criar-conta');
            }
  } else {
    console.log("senha")
    res.render('criar-conta')
  }
  
});

module.exports = router;