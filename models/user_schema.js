const mongo = require('mongoose');
const { use } = require('../routers/route');
const  userSchema = mongo.Schema({
    user_id : {
        type:     String,
        required: true
    },
    password: {
        type:     String,
        required: true
    }
});

const Auth =module.exports = mongo.model('Auth',userSchema);