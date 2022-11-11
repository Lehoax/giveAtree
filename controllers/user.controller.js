const userSchema = require('../models/user.model');

module.exports.getUsers = async (req, res) => {
    res.status(200).json({users: "ddd"})
}