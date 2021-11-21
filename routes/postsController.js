// appeler le Framework EXPRESS
const express = require('express');

// La constante "router" joint l'objet ROUTER de EXPRESS
const router = express.Router();

// Pour récuperer un l'ID d'un objet
const ObjectID = require('mongoose').Types.ObjectId;

// On va chercher notre modèle de POSTS
const { PostsModel } = require('../models/postsModel');


// On exporte : le ROUTER est accessible n'importe où depuis notre application
module.exports = router;



// **********************************************
// ******* Afficher les données de la BDD *******
// **********************************************
router.get('/', (req, res) => {
	PostsModel.find((err, docs) => { // 1er paramètre si il y a une erreur, 2eme si il n'y en a pas
		// console.log(docs);
		// if (!err) res.send(docs);
		// else console.log("Error to get data : " + err);
		err ? console.log("Error to get data : " + err) : res.send(docs);
	});
});



// **********************************************
// ****** Ajouter des données dans la BDD *******
// **********************************************
router.post('/', (req, res) => {
	// console.log(req.body);
	const newRecord = new PostsModel ({ 
		author: req.body.author, 					// ‼⚠  "req.body" fonctionne avec "BODY-PARSER" ⚠‼
		message: req.body.message					// (« npm i -s body-parser »)
	});

	newRecord.save((err, docs) => {
		// if (!err) res.send(docs);
		// else console.log("Error creating new data : " + err);
		err ? console.log("Error creating new data : " + err) : res.send(docs);
	});
});



// **********************************************
// ****** Modifier des données dans la BDD ******
// **********************************************
router.put("/:id", (req, res) => {		// Pour récuperer l'ID on a besoin de « ObjectID »
	if (!ObjectID.isValid(req.params.id))
		return res.status(400).send("Invalid ID : " + req.params.id);
	
	const updateRecord = {
		author: req.body.author,
		message: req.body.message		
	};

	PostsModel.findByIdAndUpdate(
		req.params.id,
		{ $set: updateRecord },
		{ new: true },
		(err, docs) => {
			// if (!err) res.send(docs);
			// else console.log("Update error : " + err);
			!err ? res.send(docs) : console.log("Update error : " + err);
		}
	);
});



// **********************************************
// ****** Supprimer des données de la BDD *******
// **********************************************
router.delete("/:id", (req, res) => {
	if (!ObjectID.isValid(req.params.id))
		return res.status(400).send("Invalid ID : " + req.params.id);
	
	PostsModel.findByIdAndRemove(
		req.params.id,
		(err, docs) => {
			if (!err) res.send(docs);
			else console.log("Delete error : " + err);
		}
	);
});
