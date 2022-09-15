const Joi = require('joi'); //npm i joi
const mongoose = require('mongoose'); //npm i mongoose

const categorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  uid: {
    type: String,
    required: true
  }


});

//const Category = mongoose.model('Category', categorySchema);
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

function validateMe(reqBody) {

  const schema = {
    name: Joi.string().min(3).required(),
    uid: Joi.string().required()
  };

  return Joi.validate(reqBody, schema);

}

exports.categorySchema = categorySchema;
exports.Category = Category; 
exports.validate = validateMe;