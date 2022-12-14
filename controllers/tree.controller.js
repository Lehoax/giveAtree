const TreeModel = require('../models/tree.model');
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.createTree = async (req, res) => {
    const {specie, categorie, price, age} = req.body
    try {
      const tree = await TreeModel.create({specie, categorie, price, age});
      console.log(tree);
      res.status(201).json({ tree: tree._id});
    }
    catch(err) {
      res.status(200).send(err)
    }
}

module.exports.allTreeNotPlaced = async (req, res) => {
    try {
        TreeModel.find({}, function(err, trees) {
            let arr = [];
            trees.map((tree) => {
                if (tree.placed == false) {
                    arr.push(tree);
                }     
            })  
           res.status(200).json(arr);  
          });
    }
    catch(err) {
      res.status(200).send(err);
    }
}


module.exports.placedTree = async (id) => {
    if (!ObjectID.isValid(id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await TreeModel.findOneAndUpdate(
        { _id: id },
        {
            $set: {
            placed: true
            },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
            if (err) return console.log(err.message); 
        }
        );
    } catch (err) {}
}

module.exports.seeTree = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await TreeModel.findById({ _id: req.params.id },
        (err, docs) => {
            if (err) return res.status(500).send(err);
            else res.status(200).send(docs);
        }
        );
    } catch (err) {}
}

module.exports.allTreePlaced = async (req, res) => {
    try {
        TreeModel.find({}, function(err, trees) {
            let arr = [];
            trees.map((tree) => {
                if (tree.placed == true) {
                    arr.push(tree);
                }     
            })  
           res.status(200).json(arr);  
          });
    }
    catch(err) {
      res.status(200).send(err);
    }
}

