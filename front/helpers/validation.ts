// import validator from "validator";

// export const validateEmail = (e: string) => {
//     let validation = "";
//     if (!validator.isEmail(e)) validation = "wrong Email addless.";
//     return validation;
// };
// export const validatePassword = (p: string) => {
//    let validation = "";
//    if (!validator.isLength(p, { min: 4, max: 8 }))
//        validation = "min: 4, max: 8.";
//    return validation;
// };
// export const validateName = (p: string) => {
//     let validation = "";
//     if (!validator.isLength(p, { min: 4, max: 8 }))
//         validation = "";
//     return validation;
// }
// export const validateAddress = (p: string) => {
//     let validation = "";
//     if (!validator.isLength(p, { min: 4, max: 8 }))
//         validation = "";
//     return validation;
// }
// export const validatePhone = (p: string) => {
//     let validation = "";
//     if (!validator.isLength(p, { min: 4, max: 8 }))
//         validation = "";
//     return validation;
// }

import validator from "validator";

// Función genérica para validar longitud
const validateLength = (value: string, fieldName: string, min = 4, max = 8): string => {
  return validator.isLength(value, { min, max })
    ? ""
    : `${fieldName} debe tener entre ${min} y ${max} caracteres.`;
};

export const validateEmail = (email: string): string => {
  return validator.isEmail(email) ? "" : "Email inválido.";
};

export const validatePassword = (password: string) : string =>{
    let error = validateLength(password, "contraseña");
    if(error) return error;
    
      if (!/[A-Z]/.test(password)) {
    return "La contraseña debe tener al menos una letra mayúscula.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "La contraseña debe tener al menos un carácter especial.";
  }

  return "";
}


// export const validatePassword = (password: string): string => {
//   return validateLength(password, "Contraseña");
// };

export const validateName = (name: string): string => {
  return validateLength(name, "Nombre");
};

export const validateAddress = (address: string): string => {
  return validateLength(address, "Dirección");
};

export const validatePhone = (phone: string): string => {
  return validateLength(phone, "Teléfono");
};




