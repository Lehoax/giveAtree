const squareCtrl = require('./square.controller');
const treeCtrl = require ('../controllers/tree.controller');
const OrderModel = require('../models/order.model');
const UserModel = require('../models/user.model');
const ObjectID = require("mongoose").Types.ObjectId;



module.exports.newOrder = async (req, res) => {
    const {userId, treeId} = req.body;
    try {
        const order = await OrderModel.create({userId, treeId});
        console.log("order");
        await treeCtrl.placedTree(treeId);
        if (ObjectID(order._id)) {
            squareCtrl.setOrderInCase(order);
            const orderUser = await UserModel.findOneAndUpdate({_id: userId}, {orders: order._id}, {
                new: true,
                upsert: true,
              });
            return res.status(201);
        } else {
            return res.send(err.message).json(500);
        }
    
    } catch (err) {
        console.log(err.message);
    }
}

