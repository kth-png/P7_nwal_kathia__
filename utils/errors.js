// erreur d'inscription
exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déja pris";

  if (err.message.includes("email")) errors.email = "Email incorrect ";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire minimum 6 caractères";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déja pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déja pris";

  return errors;
};

// erreurs de login

exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Mot de passe incorrect";

  return errors;
};

// erreurs upload image
exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file"))
    errors.format = "Format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors;
};
