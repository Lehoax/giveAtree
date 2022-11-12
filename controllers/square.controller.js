const SquareModel = require('../models/square.model');
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.createSquare = async (req, res) => {
    try {
      const square = await SquareModel.create({caseRemainning: 1000});
      res.status(201).json({ square: square._id});
    }
    catch(err) {
      res.status(500).send( err.message )
    }
}


module.exports.setOrderInCase = async (orders) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const square = await SquareModel.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, square) {
            return square; 
        });
        if (ObjectID(square._id)) {
            await SquareModel.findOneAndUpdate(
                { _id: square._id },
                {
                    $set: {
                    case: [
                        {
                            _id: orders._id, 
                            userId: orders.userId,
                            TreeId: orders.treeId
                        }
                    ]
                    },
                },
                { new: true, upsert: true, setDefaultsOnInsert: true },
                (err, docs) => {
                    if (!err) return res.status(201).send(docs);
                    if (err) return res.status(500).send(err.message);
                }
            );
            
        }
   
    } catch (err) {console.log(err);}
}