const NodeRSA = require('node-rsa');

function encryptRequest(data, public_key){
  let plainText = JSON.stringify(data);
  const key = new NodeRSA();
  key.importKey(public_key, 'public');
  return key.encrypt(plainText, 'base64');
}

function signString(data_string, private_key){
  const key = new NodeRSA(private_key);
  return key.sign(data_string, 'base64');
}


function encryptAndSign(data, private_key, other_party_public_key){
  let ciphertext = encryptRequest(data, other_party_public_key);
  let signature = signString(ciphertext, private_key);
  return {ciphertext, signature};
}

module.exports = {
  encryptAndSign,
};
