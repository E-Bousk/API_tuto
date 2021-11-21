// 'mongoose" va connaître toutes les méthodes de MONGOOSE
const mongoose = require('mongoose');

// Méthode CONNECT pour se connecter à la BDD
mongoose.connect(
	"mongodb://localhost:27017/node-api",
	{ useNewUrlParser: true, useUnifiedTopology: true},
	(err) => { err ? console.log("Connection error :" + err) : console.log("Mongodb connected");
		// if (!err) console.log("Mongodb connected");
		// else console.log("Connection error :" + err);
	}
)