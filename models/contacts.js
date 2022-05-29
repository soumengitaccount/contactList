const mongo = require('mongoose');
const contactSchema = mongo.Schema({
    name:{
        type: String,
        required:  true
    },
    number:{
        type: String,
        required:  true
    },
    photo:{
        type: String,
        required:false
    }
});
const Contact = module.exports = mongo.model('Contact',contactSchema);