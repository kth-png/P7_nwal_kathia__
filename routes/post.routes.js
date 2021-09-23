const router = require("express").Router();
const postCtlr = require("../controllers/post");
const multer = require("multer");
const upload = multer();

router.get("/", postCtlr.readPost);
router.post("/", upload.single("file"), postCtlr.createPost);
router.put("/:id", postCtlr.updatePost);
router.delete("/:id", postCtlr.deletePost);
router.patch("/like-post/:id", postCtlr.likePost);
router.patch("/unlike-post/:id", postCtlr.unlikePost);

// Routes commentaires
router.patch("/comment-post/:id", postCtlr.commentPost);
router.patch("/edit-comment-post/:id", postCtlr.editCommentPost);
router.patch("/delete-comment-post/:id", postCtlr.deleteCommentPost);

module.exports = router;
