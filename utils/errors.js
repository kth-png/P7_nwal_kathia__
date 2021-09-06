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
