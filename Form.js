const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  formData: {
    type: Map,
    of: String,
    required: true,
  },
});

const Form = mongoose.model('Form', FormSchema);
module.exports = Form;
