const userModel = require("../models/user.model");
const objectID = require("bson");
const Mongoose = require("mongoose");

//Récupérer tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
  const users = await userModel.find().select("-password");
  res.status(200).json(users);
};

//Récupérer un seul utilisateur
module.exports.userInfo = (req, res) => {
  if (!Mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  userModel
    .findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID unknown:" + err);
    })
    .select("-password");
};

// Modifier la bio de l'utilisateur
module.exports.updateUser = (req, res) => {
  if (!Mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    userModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  if (!Mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    userModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
