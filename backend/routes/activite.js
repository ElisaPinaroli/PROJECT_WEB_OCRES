const express = require('express');
const axios = require('axios');
// Lodash utils library
const _ = require('lodash');

const router = express.Router();

const activiteController = require('../controllers/activite');

const activites = [];

router.post('/:id', activiteController.post)
//creer
router.post('/', (req, res) => {
    console.log(req.body);
    const newRecord = new activite({
        author : req.body.author,
        message: req.body.message
    });

    newRecord.save((err, docs) => {
        if (!err) res.send(docs);
        else console.log("error creating new data : " + err);

    })
});

//modifier
router.put("/:id", (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    const updateRecord = {
        author: req.body.author,
        message: req.body.message
    };
    
    activite.findByIdAndUpdate(
        req.params.id,
        {$set : updateRecord},
        {new: true},
        (err, docs) => {
            if(!err) res.send(docs)
            else console.log("Update error : " + err);

        }
    );
})

//delete
router.delete("/:id", (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
        activite.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
          if(!err) res.send(docs);  
          else console.log("delete error : " + err);
        }
        );
});  


module.exports = router;