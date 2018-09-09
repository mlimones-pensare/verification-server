const fs = require('fs');

const local_private_key = fs.readFileSync(process.env.PATH_TO_LOCAL_KEY, {encoding: 'utf-8'});
const remote_public_key = fs.readFileSync(process.env.PATH_TO_REMOTE_KEY, {encoding: 'utf-8'});

module.exports = {
  local_private_key,
  remote_public_key,
};
