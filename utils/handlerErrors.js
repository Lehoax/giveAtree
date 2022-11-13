module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "", firstName:"", lastName: "", street: "", cp: "", city: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  if (err.message.includes("firstName"))
    errors.firstName = "Votre prénom est obligatoire";

  if (err.message.includes("lastName"))
    errors.lastName = "Votre nom est obligatoire";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

  if (err.message.includes("street"))
    errors.street = "Votre adresse est obligatoire";

  if (err.message.includes("cp"))
    errors.cp = "Votre code postal est obligatoire est dois être dans ce format 10000";

  if (err.message.includes("city"))
    errors.city = "Votre ville est obligatoire";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: ''}

  if (err.message.includes("email")) 
    errors.email = "Email inconnu";
  
  if (err.message.includes('password'))
    errors.password = "Le mot de passe ne correspond pas"

  return errors;
};