const mongo = require('mongoose');
const crypto = require('crypto');
const { use } = require('../routers/route');
const  userSchema = mongo.Schema({
    user_id : {
        type:     String,
        required: true
    },
    password: {
        type:     String,
        required: true
    },
    
    salt: String
});
// Method to set salt and hash the password for a user 
userSchema.methods.hash = function(password) { 
     
    // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
     
       // Hashing user's salt and password with 1000 iterations, 
        
       return crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
   };
   
   


   // Method to check the entered password is correct or not 
   userSchema.methods.checkHash = function(password, salt) { 
    var hash = crypto.pbkdf2Sync(password,  
    salt, 1000, 64, `sha512`).toString(`hex`); 
    return hash; 
}; 



const Auth =module.exports = mongo.model('Auth',userSchema);