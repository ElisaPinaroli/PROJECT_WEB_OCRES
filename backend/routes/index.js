var express = require("express");
var router = express.Router();


require('./models/dbConfig');
const postsRoutes = require('./routes/postsController');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
//mongoose.set('useFindAndModify', false);
const cors = require('cors'); //rend api accessible depuis n'importe ou


app.use(bodyParser.json());
//si le chemin c'est juste l'entrée, connexion au router

//app.use(cors()); //donne access a tout le monde
app.use(cors({origin: 'http://localhost:3000'})); //autorise access a l'api a localhost3000 --> frontend en react
app.use('/posts', postsRoutes);

//connecter au serveur
app.listen(5500, () => console.log('server started : 5500'));




/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("This is my homepage");
});

module.exports = router;





