const mongoose = require('mongoose')
const constans = require('./constants.js');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(constans.DATABASE_URL)
        console.log('DB Connected')
    } catch (error) {
        console.log(error)
        console.log('DB Connection Error')
    }
}

// just checking for any updation in my code for EC2

module.exports = db