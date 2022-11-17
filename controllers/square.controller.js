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
    console.log(orders);
       try {
        const square = await SquareModel.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, square) {
            return square; 
        }).clone();
        if (ObjectID(square._id)) {
            try {
                await SquareModel.findOneAndUpdate(
                    { _id: square._id },
                    {
                        $push: {
                        case: [
                            {
                                _id: orders._id, 
                                userId: orders.userId,
                                treeId: orders.treeId
                            }
                        ]
                        },
                    },
                    { new: true, upsert: true, setDefaultsOnInsert: true },
                    (err, docs) => {
                        console.log('placed in square');
                        if (!err) return docs;
                        if (err) return err.message;
                    }
                );
            } catch (err) {console.log("-"+err)};
        }
   
    } catch (err) {console.log(err);}
}

module.exports.allTreeSquare = async (req, res) => {
    try {
        SquareModel.find({}, function(err, squares) {
           res.status(200).json(squares[0].case);  
        });
    } catch (err) {console.log(err);}
}