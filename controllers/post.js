const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors");

//                   Controleurs posts                //
//------------------Affichage des posts
exports.readPost = (req, res) => {
  postModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data:" + err);
    })
    .sort({ createdAt: -1 });
};

//------------------Création d'un post
exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }

    fileName = req.body.posterId + Date.now() + ".jpg";

    pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }

  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//----------------------Modification d'un post
exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  postModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error:" + err);
    }
  );
};

//-----------------------Supression d'un post
exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  postModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error:" + err);
  });
};

//--------------------------Like d'un post
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  try {
    postModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    userModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        if (err) res.status(400).send(err);
      }
    );
  } catch (err) {
    console.log(err);
    throw res.status(400).send(err);
  }
};

//--------------------------Unlike d'un post
exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  try {
    postModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    userModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        if (err) res.status(400).send(err);
      }
    );
  } catch (err) {
    throw res.status(400).send(err);
  }
};

// Controleurs de commentaires
//--------------   Ajouter un commentaire à un post
exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  try {
    return postModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//------------------  Editer un commentaire
exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  try {
    return postModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

//--------------------- Supprimer un commentaire
exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  try {
    return postModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      {
        new: true,
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
