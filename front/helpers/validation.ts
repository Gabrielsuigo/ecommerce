import validator from "validator";

export const validateEmail = (e: string) => {
    let validation = "";
    if (!validator.isEmail(e)) validation = "wrong Email addless.";
    return validation;
};
export const validatePassword = (p: string) => {
   let validation = "";
   if (!validator.isLength(p, { min: 4, max: 8 }))
       validation = "min: 4, max: 8.";
   return validation;
};
export const validateName = (p: string) => {
    let validation = "";
    if (!validator.isLength(p, { min: 4, max: 8 }))
        validation = "";
    return validation;
}
export const validateAddress = (p: string) => {
    let validation = "";
    if (!validator.isLength(p, { min: 4, max: 8 }))
        validation = "";
    return validation;
}
export const validatePhone = (p: string) => {
    let validation = "";
    if (!validator.isLength(p, { min: 4, max: 8 }))
        validation = "";
    return validation;
}






