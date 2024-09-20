const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const constants = require('../config/constants.js');
const bcrypt = require('bcrypt');
// Load private key for JWT signing
const privateKey = fs.readFileSync('private_key.pem', 'utf8');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    img: {
        type: String,
    },
    fromGoogle: {
        type: Boolean,
        default: false
    },
    bookmarks: {
        type: [String],
    },
    role : {
        type: String,
        default: 'user'
    }
}, { timestamps: true });

UserSchema.methods.authenticateUser = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Instance method to create a JWT token
UserSchema.methods.createToken = function () {
    return jwt.sign(
        {
            email: this.email,
        },
        privateKey,
        {
            issuer: 'Dawdle',
            audience: `${this._id}`,
            expiresIn: constants.JWT_EXPIRATION,
            algorithm: 'RS256'
        }
    );
};

// Instance method to return the token in Bearer format
UserSchema.methods.toAuthJSON = function () {
    return `Bearer ${this.createToken()}`;
};

module.exports = mongoose.model('User', UserSchema);
