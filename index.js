// appeler le Framework EXPRESS
const express = require('express');

// La constante "app" est définie: maintenant elle connait toutes les fonctions natives et inérente au Framework EXPRESS
const app = express();

// On passe le fichier "dbConfig.js"
require('./models/dbConfig')

// On appelle le "router"
const postsRoutes = require('./routes/postsController');

// On appelle BODY-PARSER (permet d'interpreter du JSON)
const bodyParser = require('body-parser');


// *******************************************************
// *****   code dans CODEPEN.IO pour tester l'API:   *****
// *******************************************************
//        fetch('http://localhost:5500/posts')
//          .then(res => res.json())
//          .then(res => console.log(res)); 
// *******************************************************
// *******************************************************
// MESSAGE : 
// « Access to fetch at 'http://localhost:5500/posts' from origin 'https://cdpn.io' has been blocked by CORS policy: 
// No 'Access-Control-Allow-Origin' header is present on the requested resource.
// If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled. »
// --> Pour pouvoir accéder au localhost depuis CODEPEN.IO :
// 1. On appelle CORS
const cors = require('cors');
// 2. On en fait un middleware
// app.use(cors()); // => ici sans aucune condition : on donne accès à tout le monde (on ouvre les portes de notre API)
app.use(cors({origin: 'https://cdpn.io'})); // => ici on donne accès uniquement à CODEPEN.IO




// *****************************************************************************
// ‼ MONGOOSE version 5 ‼
// MESSAGE : 
// « DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` 
// without the `useFindAndModify` option set to false are deprecated. »
// ---> Pour appliquer une option partout = on fait un middleware :
// 1. On appelle MONGOOSE
// const mongoose = require('mongoose');
// 2. On définit l'option et sa valeur à appliquer
// mongoose.set('useFindAndModify', false);
// *****************************************************************************



// On crée un middleware : une fonction qui va écouter chaque changement sur les "REQuests" et les "RESponses" de "postsController"
// pour parser tous nos éléments (du REQ et du RES) (les rendre lisible, les mettre en JSON)
app.use(bodyParser.json())

// On crée un middleware : une fonction qui va écouter chaque changement sur les "REQuests" et les "RESponses" de "postsController"
// (A chaque fois que ces éléments sont appelés, cette fonction sera enclecnchée)
// Si le chemin est '/posts' : renvois 'postsRoutes'
app.use('/posts', postsRoutes);



// Se connecter au serveur, sur le port 5500. On y ajoute un callback « () » pour nous dire s'il est lancé
app.listen(5500, () => console.log('Server started : 5500'));
