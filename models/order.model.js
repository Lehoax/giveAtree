const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true
      },
      treeId: {
        type: String,
        required: true
      },
    },
    {
      timestamps: true,
    }
  );
  


const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;