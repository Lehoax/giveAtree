const TreeModel = require('../models/tree.model');
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.createTree = async (req, res) => {
    const {specie, categorie, price, age} = req.body

    try {
      const tree = await TreeModel.create({specie, categorie, price, age});
      res.status(201).json({ tree: tree._id});
    }
    catch(err) {
      res.status(200).send( res.error )
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
      res.status(200).send( res.error )
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
    } catch (err) {
        
    }
}

