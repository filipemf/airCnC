// index (retorna uma listagem (de sessões)), show (retorna uma única (sessão)), store (criar uma sessão), update (atualizar uma sessão), destroy (destruir uma sessão)
const User = require('../models/User');


module.exports = {
  async store(req, res) {
     const { email } = req.body;

    let user = await User.findOne({email});

    if (!user){
      user = await User.create({email});
    }

     return res.json(user);
 }
};