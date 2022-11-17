const squareCtrl = require('./square.controller');
const treeCtrl = require ('../controllers/tree.controller');
const OrderModel = require('../models/order.model');
const TreeModel = require('../models/tree.model');
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.newOrder = async (req, res) => {
    const {userId, treeId} = req.body;
    try {
        const order = await OrderModel.create({userId, treeId});
        console.log("order");
        await treeCtrl.placedTree(treeId);
        if (ObjectID(order._id)) {
            squareCtrl.setOrderInCase(order);
            return res.send(order).json(201);
        } else {
            return res.send(err.message).json(500);
        }
    
    } catch (err) {
        console.log(err.message);
    }
}

