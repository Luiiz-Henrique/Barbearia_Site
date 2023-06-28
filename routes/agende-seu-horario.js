var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("isso aq q ta dando undefined?")
  console.log(req.user)
  if (req.user) {
    res.render('agende-seu-horario');
  } else {
    res.render('entrar');
  }
});

module.exports = router;