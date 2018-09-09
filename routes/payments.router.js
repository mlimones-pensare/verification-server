var express = require('express');
var router = express.Router();
var { User } = require('../models/user.model');
var { authenticationGuard } = require('../middleware/auth');
const _ = require('lodash');
require('express-async-errors');

/* GET users listing. */
router.use(authenticationGuard);

function findUserBySourceAccount(source_account){
  return User.findOne({
    where:{
      account_id: source_account,
    }
  });
}

function isValid(payload, signature, public_key){
  let stringPayload = JSON.strinfigy(payload);
  return false;
}

async function processPayment(){
  let body = req.body;
  let payload =  _.omit(body, ['signature']);
  let signature = body.signature;
  try{
    let sourceUser = await findUserBySourceAccount(body.source_account);
    if(sourceUser){
      let hasValidSignature = isValid(payload, signature, sourceUser.public_key);
      if(hasValidSignature){
        res.status(200).json(body.source_account);
      } else {
        res.status(400).json({message: 'signature is not valid'});
      }
    }else{
      res.status(404).json({message: 'user not found!'});
    }
  }catch(e){
    res.status(400).json(e.message);
  }
}

router.post('/', async function(req, res){
  throw new Error('this is a error');
});

module.exports = router;
