
function AuthController (userModel, tokenManger, emailVerificator) {

  async function login (req, res, next) {
    const credentials = req.body;
    const user = await userModel.findOne({
      where: {
        phone_number: credentials.phone_number
      }
    });
    if (user) {
      const token = tokenManger.create(user);
      res.status(200).json({token: token});
    } else {
      res.status(401).json({message: 'invalid credentials' });
    }
  }

  return {
    login,
  };
};

module.exports = {
  AuthController,
};
