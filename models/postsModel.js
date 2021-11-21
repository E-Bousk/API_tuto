// On appelle MONGOOSE : "mongoose" va connaître toutes les méthodes de MONGOOSE
const mongoose = require('mongoose');

// On stock dans "PostsModel" un modèle de BDD
// ("model" est une méthode de mongoose)
const PostsModel = mongoose.model(
	"node-api", 																	// Dans quelle BDD ça se trouve
	{																							// Déclamer ce qu'il y a dans la table
		author: {
			type: String,
			required: true
		},
		message: {
			type: String,
			required: true
		},
		date: {
			type: Date,
			default: Date.now
		}
	},
	"posts"																				// dans quelle TABLE cela se trouve
);

// On exporter ce modèle : pour avoir accès à "PostModel" n'importe où depuis notre application
module.exports = { PostsModel };