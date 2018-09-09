var express = require('express');
var router = express.Router();
var { User, Payment } = require('../models/models.provider');
var { authenticationGuard } = require('../middleware/auth');
var { encryptAndSign } = require('../lib/json-encrypt');
const keystore = require('../lib/keystore');
const _ = require('lodash');
const NodeRSA = require('node-rsa');
require('express-async-errors');
const request = require('superagent');

class ApplicationError extends Error {
};

async function textToBodyMiddleware(req, res, next){
  let text = req.body.text;
  req.body = JSON.parse(text);
  next();
}

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

const JAZ_SERVER_HOST = '127.0.0.1:4000';
const JAZ_SERVER_PUBLIC_KEY = '';
const TRANSACTION_ENDPOINT= '';

async function notifyWebHooks(paymentInfo) {
  const url = JAZ_SERVER_HOST + '/execPayment';
  const encryptedPacket = encryptAndSign(paymentInfo, keystore.local_private_key, keystore.remote_public_key);
  console.log('TRANSACTION ACCEPTED');
  console.log(encryptedPacket);
  //await request.post(url).send(encryptedPacket);
  console.log('##########');
  console.log('SENDING MAIL');
  console.log('##########');
  console.log('END');
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

router.post('/',textToBodyMiddleware, sourceAccountUserFinder, sourceSignatureValidator, processPayment);

module.exports = router;
