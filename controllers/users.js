const bcrypt = require('bcryptjs');
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const user = require('../models/user');

const User = require('../models/user');

const usersGet = async (req, res) => {
    const { limit = 5, page = 1} = req.query;
    const query = { status: true}
    const skip = limit * (page - 1);

    // const users = await User.find(query)
    //                         .skip(Number(skip))
    //                         .limit(limit)

    // const totalUsers = await User.countDocuments(query);

    const [ users, totalUsers ] = await Promise.all([
                User.find(query)
                    .skip(Number(skip))
                    .limit(limit),
                User.countDocuments(query)
                        ])

    res.json({
        users,
        totalUsers
    })
}

const usersLogin = async (req = request , res = response) =>{
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({ msg: "Email o contrseña erroneas", field: "email" })
        }

        if(!user.status){
            return res.status(400).json({ msg: "Cuenta inactiva" })
        }

        const validatePassword = bcrypt.compareSync(password, user.password);

        if(!validatePassword){
            return res.status(400).json({ msg: "Email o contrseña erroneas", field: "password"})
        }
        
        const token = jwt.sign(user.toJSON(), process.env.SECRECTKEY, {
            expiresIn: '12h'
        })

        res.json({
            user,
            token
        })
    }
    catch(err){
        res.status(500).json({
            msg: "Contactese con el administrador"
        })
    }
}

const userPost = async (req, res) => {
    const { name, email, password, rol } = req.body

    let user = new User({ name, email, password, rol });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
}

const userPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, ...data } = req.body;

    if(password){
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(password, salt); 
    }

    const user = await User.findByIdAndUpdate(id, data, {new: true});

    res.json(user);
}

const userDel = async (req, res) => {
    const { id } = req.params;

    // Eliminacion fisica del registro, se pierde la integridad de los dartos en la DB
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { status: false});

    res.json( user );
}

module.exports = {
    usersGet,
    usersLogin,
    userPost,
    userPut,
    userDel
}