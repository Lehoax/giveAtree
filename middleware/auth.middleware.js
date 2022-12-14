const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
let token;


module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(403).json('no token');
      } else {
        next();
      }
    });
  } else {
    res.status(403).json('no valid token');
  }
};

module.exports.adminAuth = (req, res, next) => {

console.log(token);
  if (token) {

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(403).json('no token');
      } else{
          UserModel.findById(decodedToken.id, function(err, result) {
            console.log(result);
          if (err) {
           console.log("err");  
          } else {
              if (result.admin == true) {
                next();
              } else {
                try {
                  res.send('not admin').json(403);
                } catch (error) {console.log(error) }
              }
            }
          });
      }
    });
  } else {
    res.status(403).json({error: "no token"});
  }
};