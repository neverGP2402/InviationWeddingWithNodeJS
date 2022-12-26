const jwt = require('jsonwebtoken');

const encodedToken = (username) => {
    return jwt.sign({
        iss: 'admin',
        sub: username,
        iat: new Date().getTime(),
        // exp: new Date().setDate(new Date().getDate() +  30) ngày hết hạn token
    }, 'encodeAuthenticationToken')
}

module.exports = {encodedToken}