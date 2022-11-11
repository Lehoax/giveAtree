const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');


const userSchema = new mongoose.Schema(
    {
      pseudo: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true
      },
      firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        trim: true
      },
      email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        max: 1024,
        minlength: 6
      },
      street :{
        type: String,
        required: true,
        max: 1024
      },
      cp: {
        type: Number,
      },
      city: {
        type: String,
        required: true,
        max: 1024
      },
      orders: {
        type: [Array]
      }
    },
    {
      timestamps: true,
    }
  );
  
// play function before save into bdd ,
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user
      }
      throw Error('incorrect password')
    }
    throw Error('incorrect email')
  };
  


const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;