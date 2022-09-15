const Joi = require('joi'); //npm i joi //https://joi.dev/api/?v=12.1.0
const mongoose = require('mongoose'); //npm i mongoose

const bookmarkSchema = new mongoose.Schema({

  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  catId: {
    type: String,
    required: true,
    maxlength: 50
  },
  uid: {
    type: String,
    required: true
  }


});


const Bookmark = mongoose.models.Bookmark || mongoose.model('Bookmark', bookmarkSchema);

function validateMe(reqBody) {

  const schema = {
    title: Joi.string().optional(),
    notes: Joi.optional(),
    url: Joi.string().required(),
    uid: Joi.string().required(),
    catId: Joi.string().required()
  };

  return Joi.validate(reqBody, schema);

}

exports.bookmarkSchema = bookmarkSchema;
exports.Bookmark = Bookmark; 
exports.validate = validateMe;