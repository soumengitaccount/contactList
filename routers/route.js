const express = require('express');
const router = express.Router();
var jwt  =require('jsonwebtoken');
const Contact =require('../models/contacts');
const Auth =require('../models/user_schema');

// get all conntacts=========================================================
router.get('/contact-list',(req, res, next)=>{
  Contact.find((err, contact)=>{
      res.json(contact);

  })
    // res.send('Retrive Contact Lists');
});
// get contact by id==========================================================
router.post('/getbyid',(req, res, next)=>{
    console.log("Request id: "+req.body._id);
    Contact.find({_id:req.body._id},(err, result)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return false;
        }
        res.json(result);
  
    })
    
});
// add new contact==========================================================
router.post('/add-contact',(req, res, next)=>{
   
   var newcontact = new Contact({
       name : req.body.name,
       number : req.body.number
   });
//    res.send(data);
     newcontact.save(function(err,contact){
       if(err){
           res.json({msg: "faild to store data: "+err,status:false});
           console.log("Data not saved:");
           console.log(req.body);
       }
       else{
           res.json({msg: "new contact saved",status:true});
           console.log("new data saved to db:");
           console.log(req.body);
       }

   });
})


// delete conntact by  id==============================================
router.get('/delete-contact/:id',(req, res, next)=>{
    Contact.remove({_id: req.params.id}, (err, result)=>{
        if(err){
            res.json({msg:"Can not delete"});
            console.log("Can not Delete contact record of Id:"+  req.params.id);
        }
        else{
            res.json({msg:"One  value deleted",result: result});
            console.log("Delete contact record of Id:"+  req.params.id);
        }
      
    })
    // res.send('deleting Contact List');
})


//delete all conntact====================================================
router.get('/bulk-delete',(req,res,next)=>{
    Contact.remove({},(err,result)=>{
        if(err){
            res.json({msg:"Can not delete"});
            console.log("Can not  Delete all record of collection");
        }
        else{
            res.json({msg:"Deleted Successfuly",result: result});
            console.log("Delete all record of collection");
        }
      
    })
});


// update contact ?=====================================================
router.post('/update-contacts',(req,res,next)=>{
Contact.findOneAndUpdate({_id:req.body._id},{$set:{name:req.body.name, number:req.body.number}},(err,result)=>{
    
    if(err){
        res.json({msg: "faild to Update data: "+err,status:false});
        console.log("Record Not Update  of Id:"+  req.body._id);
        
    }
    else{
        res.json({msg: "Updated successfully",status:true});
        console.log("Update record of Id:"+  req.body._id);
    }
    
})
})



// =============================  Auth Route Register  =============================================================

router.post('/register',(req,res,next)=>{
   let  auth =new Auth({
        user_id: req.body.email,
        password: ''
   });
  auth.password =  auth.hash(req.body.password);
   Auth.findOne({user_id:req.body.email},(error,user)=>{
       console.log(user);
       if(error){
        res.json({msg:'Registration Faild: '+err,status: false});
       }
       else{
        if(user){
            res.json({msg:'Email Or UserID already Exists',status: false});
        }
        else{
             auth.save(function(err,registeredUser){
                 if(err){
                     res.json({msg:'Registration not ssuccess due  to  some issue: '+err,status:false})
                 }
         
                 else{
                     console.log("successfully registerd:");
                     console.log(req.body);
                     let payload = {subject: registeredUser._id};
                     let token = jwt.sign(payload,'secreteKey');
                     res.json({token:token,msg:'you are successfully registerd',status:true})
                 }
             })
        }
       }
   })
   
})



// ================================= delete all auth data=================================
router.get('/delauth',(req,res,next)=>{
    Auth.remove(function(err, result){
        if(err){
            res.json({msg:'try again'})
        }
        else{
            res.json({sg:'All deleted'})
        }
    })
})


// ===============================  Login ===============================================
router.post('/login',(req,res,next)=>{
    Auth.findOne({user_id:req.body.email},(err,user)=>{
        // console.log(user.checkHash(req.body.password,user.salt));
        if(user){
            if(user.password.match(user.checkHash(req.body.password,user.salt)))
            {   let payload = {subject: user._id};
                let token = jwt.sign(payload,'secreteKey');
                res.json({token:token,msg:'Login Successfully Please wait..... to redirect',status:true})
            }
            else{
                res.json({msg:'Invalid Password',status:false});
            }
        }
        else{
            res.json({msg:'Invalid Log-in Details, Or Invalid user ID',status:false});
        }
    })


})


module.exports = router;