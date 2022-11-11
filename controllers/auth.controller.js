const UserModel = require("../models/user.model");
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}


module.exports.signUp = async (req, res) => {
    const {pseudo, email, password, firstName, lastName, street , city, cp} = req.body

    try {
      const user = await UserModel.create({pseudo, email, password, firstName, lastName, street , city, cp});
      res.status(201).json({ user: user._id});
    }
    catch(err) {
      res.status(200).send( res.error )
    }
}


module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
  
    try {
      const user = await UserModel.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge});
      res.status(200).json({ user: user._id})
    } catch (err){
      res.status(400).json({"err": err.message});
    }
}
  
module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}
