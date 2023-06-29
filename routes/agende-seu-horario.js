var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
  console.log("cookie aq   :")
  console.log(req.cookies['AuthToken'])
  const authToken = req.cookies['AuthToken'];
  console.log("\n\no token do cookie  :")
  console.log(authToken)
  console.log("o possivel array  :")
  req.user = authToken;
  console.log("era pra ser o usuario  :")
  console.log(req.user)
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.render('agende-seu-horario');
  } else {
    res.render('entrar');
    console.log("primeiro faça o login")
  }
});

module.exports = router;