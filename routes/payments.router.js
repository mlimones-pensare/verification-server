var express = require('express');
var router = express.Router();
var { User, Payment } = require('../models/models.provider');
var { authenticationGuard } = require('../middleware/auth');
const _ = require('lodash');
const NodeRSA = require('node-rsa');
require('express-async-errors');

/* GET users listing. */
router.use(authenticationGuard);

class ApplicationError extends Error {
};

async function sourceAccountUserFinder(req, res, next){
  let source_account = req.body.source_account;
  let user = await User.findOne({
    where:{
      account_id: source_account,
    }
  });
  if(user){
    req.sourceAccountPublicKey = user.public_key;
    next();
  }else{
    res.status(404).json({message: `source account '${req.body.source_account}' not registered`}).end();
  }
}

async function sourceSignatureValidator(req, res, next){
  let body = req.body;
  let payload =  _.omit(body, ['signature']);
  let public_key = req.sourceAccountPublicKey;
  let signature = body.signature;
  if(verifySignature(payload, signature, public_key)){
    next();
  }else{
    res.status(400).json({message: 'invalid signature'}).end();
  }
}

function verifySignature(payload = '', signature = '', public_key){
  const text = JSON.stringify(payload);
  verifier = new NodeRSA();
  verifier.importKey(public_key, 'public');
  return verifier.verify(text, signature, 'utf-8', 'base64');
}

async function notifyWebHooks(notifyWebHooks) {
}


function findByFieldName(paymentInfo, field){
  let foundTuple = paymentInfo.dOp.find((tuple) => {
    return _.keys(tuple).find(key => key===field);
  });
  return foundTuple ? foundTuple[field] : null;
}

async function consumePayment(paymentInfo){
  let payment = {
    id: paymentInfo.uuid,
    destination_account: findByFieldName(paymentInfo, 'cl'),
    source_account: paymentInfo.source_account ,
    amount: findByFieldName(paymentInfo, 'amount'),
  };
  try{
    await Payment.create(payment);
  }catch(e){
    if(e.name=="SequelizeUniqueConstraintError"){
      throw new ApplicationError('authorization token already used');
    }else{
      throw e;
    }
  }
}

async function validateTTL(paymentInfo){
}

async function processPayment(req, res){
  let paymentInfo = req.body;
  try {
    await validateTTL(paymentInfo);
    await consumePayment(paymentInfo);
    await notifyWebHooks(paymentInfo);
    res.status(200).json({message: 'success'});
  } catch (e){
    if(e instanceof ApplicationError){
      res.status(400).json({message: e.message});
    }else{
      throw e;
    }
  }
}

router.post('/', sourceAccountUserFinder, sourceSignatureValidator, processPayment);

module.exports = router;
