const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    relationship:{
        type: String,
        default:'bạn'
    },
    vocative:{
        type: String,
        default:'tui'
    },
    couple:{
        type: String,
        default:''
    },
    image:{
        type: String,
        default:'image.gif'
    },
    timeInviation: {
        type: String,
        default:'9h00'
    }, 
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
    deleteAt: {
        type: Date,
        default: null,
    },
    activeAt: {
        type: Date,
        default: null,
    }
})

module.exports = mongoose.model('user', User)