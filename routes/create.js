var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
var contactsDAO = require('../src/models/dao/contactsDAO');
const { name } = require('ejs');
const crypto = require('crypto');

require('dotenv').config()

const uri = process.env['URI']
const client = new MongoClient(uri)



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
        Conpassword: form.Conpassword
    }
  }
  if (password === Conpassword){

  }
  try{
    await client.connect()
    const result = await contactsDAO.insertContact(client, form_data);
    res.render('entrar')
  } catch (err){
    res.send(err)
  } finally {
    await client.close()
  }
});

module.exports = router;