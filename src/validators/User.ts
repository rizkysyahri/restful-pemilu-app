import Joi = require("joi");

const roles = ["user", "admin"];
const gender = ["Laki-laki", "Perempuan"];

export const UserValidator = Joi.object({
  fullname: Joi.string().required(),
  address: Joi.string().required(),
  gender: Joi.string()
    .valid(...gender)
    .required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});


export const LoginScema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(3).max(15)
})