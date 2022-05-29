var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
// const data = require('../userData');
const methods = require('../methods');
const User = require('../models/user');




// constantes para rutas de paginas, login y register
const loginPage = "../views/pages/login";
const registerPage = "../views/pages/register";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});





// registro de rutas
router.get('/home', function(req, res) {
  if (req.user) {
    res.render('home', {
      userName: req.user.fullName 
    });
  } else {
    res.render(loginPage, {
      message: "Inicie sesion para continuar",
      messageClass: "alert-danger"
    });
  }
});


router.get('/login', (req, res) => {
  res.render(loginPage);
});


router.get('/register', (req,res) => {
  res.render(registerPage);
});




router.post('/register', async (req, res) => {
  const { departamento, codpostal, pais, est_civil, ciudad, direccion, usuario, email, secretnumber, contraseña, ccontraseña } = req.body;
  // validacion
  if (contraseña === ccontraseña) {
    user = await User.findOne({ Email: email })
    .then(user => {
      if(user) {
        res.render(registerPage, {
          message: "El usuario ya esta registrado",
          messageClass: "alert-danger"
        });
      } else {
        const hashedPassword = methods.getHashedPassword(contraseña);



        //creacion e importacion de los datos a Mongo
        const userDB = new User({
          'Departamento': departamento,
          'Codigo_Postal': codpostal,
          'Pais': pais,
          'Estado_civil': est_civil,
          'Ciudad': ciudad,
          'Direccion': direccion,
          'Nombre_usuario': usuario,
          'Email': email,
          'Numero_secreto': secretnumber,
          'Contraseña': hashedPassword
        });
        userDB.save();
        


        
        res.render(loginPage, {
          message: "Registro exitoso. Inicie sesion",
          messageClass: "alert-success"
        });
      }
    })
  } else {
    res.render(registerPage, {
      message: "Las contaseñas no coinciden",
      messageClass: "alert-danger"
    });
  }

});





router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = methods.getHashedPassword(password);

  user = await User.findOne({ Email: email, Contraseña:hashedPassword })
    .then(user => {
      if(user){
        const authToken = methods.generateAuthToken();
        methods.authTokens[authToken] = user;
        res.cookie('AuthToken', authToken); //setting token
        res.redirect("/home"); //redirect
      } else {
        res.render(loginPage, {
          message: "Usuario y clave invalidos",
          messageClass: "alert-danger"
        });
      }
    }) 
});






router.get('/logout', (req, res) => {
  res.clearCookie('AuthToken');
  return res.redirect('/');
});

module.exports = router;
