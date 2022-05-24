const mongo = require('mongoose');
const contactSchema = mongo.Schema({
    name:{
        type: String,
        required:  true
    },
    number:{
        type: String,
        required:  true
    }
});
const Contact = module.exports = mongo.model('Contact',contactSchema);