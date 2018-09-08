const NodeRSA = require('node-rsa');

function genenerateKeys(){
  const rsaObject = new NodeRSA({b: 512});
  let keys = {
    public_key: rsaObject.exportKey('public'),
    private_private: rsaObject.exportKey('private'),
  };
  return keys;
}

module.exports = {
  genenerateKeys
};
