const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema(
    {
      specie: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
      },
      categorie: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        trim: true
      },
      price: {
        type: mongoose.Decimal128,
        required: true
      },
      age: {
        type: Number,
      },
      placed: {
        type: Boolean,
        default: false
      }
    },
    {
      timestamps: true,
    }
  );
  


const UserModel = mongoose.model("tree", treeSchema);

module.exports = UserModel;