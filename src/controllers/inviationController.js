const User = require('../models/Users')

const home = (req, res, next) => {
    return res.render('indexNotLogin.ejs')
}

const inviation = async(req, res, next) => {
    const id  = req.query.id
    if(id){
        try {
            const user = await User.findById(id).exec()
            if(user){
                return res.render('inviation.ejs', {data: user})
            }else{
                return res.send('Lỗi server')
            }
        } catch (error) {
            next(error)
            return res.status(400).json({error})
        }
        
    }else{
        return res.render('login.ejs')
    }
    
}


module.exports = {
    home,
    inviation
}