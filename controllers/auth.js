const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {sendHttpResponse} = require('../utils/createResponse');
const bcrypt = require('bcrypt');


const signup = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).json({ message: "Email already in use" });
        }

        
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
  
      const user = await newUser.save();
      const token = user.toAuthJSON();
      res.setHeader('Authorization', token);
  
      const { password, ...others } = user._doc;
  
      res.status(200).json({ ...others});
    } catch (error) {
        console.log('err ---------------------- signup ---------------------- auth.js', error?.message);
      next(error);
    }
  };
  

const signin = async (req, res, next) => {
    try {
    const {id, name, email, role } = req.user;
    const token = req.user.toAuthJSON();
    
    // Use res.setHeader() to set the Authorization header in the response
    res.setHeader('Authorization', token);

    sendHttpResponse(res, 'Success', {
        id,
        name,
        email,
        role
    });
    }
    catch (error) {
        console.log('err ---------------------- signin ---------------------- auth.js', error?.message);
        next(error);
    }
}

const googleAuth = async (req, res, next) => {
    try {
        const { email, password: userPassword, name } = req.body;

        // Check if the user already exists
        let user = await getUser({ email });

        if (user) {
            // User exists, authenticate with password
            const isPasswordValid = await bcrypt.compare(userPassword, user.password);
            if (!isPasswordValid) {
                return sendHttpResponse(res, 'Invalid credentials', {}, 401, false);
            }

            // Generate JWT token
            const token = user.toAuthJSON();

            // Set token in response header
            res.setHeader('Authorization', token);

            // Respond with user data excluding the password
            const { password: _, ...others } = user._doc;
            return res.status(200).json({ ...others });
        } else {
            // New user, create and save to the database
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userPassword, salt);

            const newUser = new User({
                name: name || 'Google User', // If no name provided, set a default name
                email,
                password: hashedPassword,
                fromGoogle: true
            });

            const savedUser = await newUser.save();

            // Generate JWT token for new user
            const token = savedUser.toAuthJSON();

            // Set token in response header
            res.setHeader('Authorization', token);

            // Respond with user data excluding the password
            const { password: _, ...others } = savedUser._doc;
            return res.status(200).json({ ...others });
        }
    } catch (err) {
        console.log('err ---------- googleAuth ----- auth.js', err?.message);
        next(err);
    }
};

const logout = async (req, res, next) => {
    
    try {
        if (req.user.role !== 'admin') {
            return sendHttpResponse(res, 'Unauthorized access', {}, 403, false);
        }

        res.setHeader('Authorization', '');
        sendHttpResponse(res, 'Logged out successfully', {}, 200, true);
    } catch (error) {
        console.error(
            'Error ---------------------- logout ---------------------- auth.js',
            error?.message
        );
        sendHttpResponse(res, 'Failed to logout', {}, 500, false);
    }
}


const getALlUser = async(req, res) => {
    try {
        const users = await User.find();
        console.log('users', users)
        sendHttpResponse(res, 'Success',
            users.map(user => {
                const { password, ...others } = user._doc;
                return others;
            })
            );
    } catch (err) {
        console.error(
            'err ------', err?.message
        )
    }
}

const getUser = async obj => 
    user = await User.findOne(
        obj
    )

module.exports = { signup, signin, googleAuth, logout, getALlUser, getUser };
