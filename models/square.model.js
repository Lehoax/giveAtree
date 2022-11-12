const mongoose = require('mongoose');


const squareSchema = new mongoose.Schema(
    {
      case: [{
        _id: String,
        userId: String,
        treeId: String
      }],
      caseRemainning: {
        type: Number,
        required: true
      },
    },
    {
      timestamps: true,
    }
  );
  


const SquareModel = mongoose.model("square", squareSchema);

module.exports = SquareModel;