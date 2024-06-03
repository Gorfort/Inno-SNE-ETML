import crypto from "crypto";

// Permet de hashé un mot de passe passé en paramêtre
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

// Compare le hash de deux mot de passe
const compareHashPassword = (password, hashedPassword) => {
  // Hash le mot de passe en claire et compare sont hash avec celui déjà hashé
  if (hashPassword(password) === hashedPassword) {
    return true;
  }
  return false;
};

export default compareHashPassword;
