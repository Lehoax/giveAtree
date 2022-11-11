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


module.exports.placedTree = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await TreeModel.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
            placed: true
            },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
            if (!err) return res.status(201).send(docs);
            if (err) return res.status(500).send(err.message);
        }
        );
    } catch (err) {
        
    }
}

