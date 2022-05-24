const express = require('express');
const router = express.Router();
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
            console.log("Can not Delete record of Id:"+  req.params.id);
        }
        else{
            res.json({msg:"One  value deleted",result: result});
            console.log("Delete record of Id:"+  req.params.id);
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

// =============================  Auth Route   =============================================================

router.post('/register',(req,res,next)=>{

})

router.post('/login',(req,res,next)=>{
    
})
module.exports = router;