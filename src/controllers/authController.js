const User = require('../models/Users')
const argon2 = require('argon2')
const encodedToken = require('../middleware/encodedToken')
const { response } = require('express')

const login = (req, res, next) => {
    return res.render('login.ejs')
}

const getAllUsers = async ()=> {
    try {
        User.find({}, function(err, users) {
            const data = users
            return data
          });
    } catch (error) {
        console.error(error)
    }
}

const handleLogin = async (req, res, next) => {
    const {username , password} = req.body
    if(username && password) {
        try {
            const user = await User.findOne({username}).exec()
            if(!user) {
                return res.send('Tài khoản không đúng xin vui lòng thử lại')
            }else{
                const verifyPass = await argon2.verify(user.password, password)
                if(verifyPass){
                    res.render('index.ejs',{id: user._id})
                }else{
                    res.send('Mật khẩu không đúng xin vui lòng thử lại')
                }
            }
        } catch (error) {
            console.log('err:',error)
        }
    } else{
        return res.send('Vui lòng nhập đủ thông tin')
    }
}

const createUser = (req, res, next) =>{
    return res.render('createUser.ejs')
}

const handleCreateUser =async(req, res, next) =>{
    const {username, password} = req.body
    const data = req.body
    console.log(req.body)
    try {
        const checkUser = await User.findOne({username})
        console.log(checkUser)
        if(checkUser){
            return res.send('User đã tồn tại')
        }else{
            const hasPassword = await argon2.hash(password)
            const newUser = await User({
                fullName: data.fullName,
                username,
                password: hasPassword,
                relationship: data.relationship,
                vocative: data.vocative,
                couple: data.couple,
                image: data.image,
                timeInviation: data.timeInviation,
            })
            await newUser.save()
            const accessToken = encodedToken.encodedToken(newUser.username)
            return res.render('createUser.ejs')
        }
    } catch (error) {

        console.error(error)
        return next(error)
    }
}

const listUsers = async (req, res, next) => {
    try {
        User.find({}, function(err, users) {
            if(err) {
                next(err)
                res.status(400).json({message:'Not Find User',error:err})
            }
            const data = users
            return res.render('listUser.ejs',{data}) 
          });
    } catch (error) {
        next(error)
        console.log(error)
        return next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.query.id
        if(id) {
            User.findById(id).remove().exec()
            User.find({}, function(err, users) {
                if(err) {
                    next(err)
                    res.status(400).json({message:'Not Find User',error:err})
                }
                const data = users
                return res.render('listUser.ejs',{data}) 
              });

        }else{
            return res.status(404).json({message : 'Not find by id',success:false})
        }
    } catch (error) {
        next(error)
        console.log(error)
        return res.status(400).json({message:'Not Delete User',error})
    }
}

const updateUser = async (req, res, next) => {
    const id = req.query.id
    if(id) {
        try {
            const user = await User.findById(id).exec()
            if(user) {
                return res.render('editUser.ejs', {data: user})
            }
        } catch (error) {
            next(error)
            return res.status(400).json({message: 'Not Found',success:false})
        }
    }
}

const handleEditUser = async (req,res,next) => {
    try {
        const data = req.body
        const dataUpdate = {
            fullName: data.fullName,
            username: data.username,
            relationship: data.relationship,
            vocative: data.vocative,
            couple: data.couple,
            image: data.image,
            timeInviation: data.timeInviation,
            updateAt: new Date().getTime(),
        }
        if(data.username) {
            const user = await User.findOneAndUpdate({username: data.username},dataUpdate).exec()
            User.find({}, function(err, users) {
                if(err) {
                    next(err)
                    res.status(400).json({message:'Not Find User',error:err})
                }
                const allUsers = users
                return res.render('listUser.ejs',{data:allUsers}) 
              });
            
        }else{
            return res.status(404).json({message: 'Missing username',success:false})
        }

    } catch (error) {
        next(error)
        console.log(error)
        return next(error)
    }
}

module.exports = {
    login,
    handleLogin,
    createUser,
    handleCreateUser,
    listUsers,
    deleteUser,
    updateUser,
    handleEditUser
}