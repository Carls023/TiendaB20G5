const bcrypt = require('bcryptjs');

const User = require('../models/user');

const usersGet = (req, res) => {
    res.json({msg: 'Get Api controller'});
}

const userPost = async (req, res) => {
    const { name, email, password, rol } = req.body

    user = new User({ name, email, password, rol });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
}

const userPut = (req, res) => {
    res.json({msg: 'Put Api controller'});
}

const userDel = (req, res) => {
    res.json({msg: 'Delete Api controller'});
}

module.exports = {
    userPost,
}