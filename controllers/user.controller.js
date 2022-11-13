const UserModel = require('../models/user.model');
const ObjectID = require("mongoose").Types.ObjectId;



module.exports.getUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.send(err);
        }
    }).select('pseudo orders createdAt')
    
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
            pseudo: req.body.pseudo,
            street: req.body.street,
            cp: req.body.cp,
            city: req.body.city
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


module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await UserModel.remove({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };