const router = require("express").Router();
const authCtrl = require("../controllers/auth");
const userCtrl = require("../controllers/user");

//inscription
router.post("/signup", authCtrl.signUp);

//connexion
router.post("/signin", authCtrl.signIn);

//deconnexion
router.get("/logout", authCtrl.logout);

//récupération des infos des tous les utilisateurs
router.get("/", userCtrl.getAllUsers);

router.get("/:id", userCtrl.userInfo);

//modifier les infos utilisateurs
router.put("/:id", userCtrl.updateUser);

//supprimer un utilisateur
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
