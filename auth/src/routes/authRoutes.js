// src/routes/authRoutes.js
const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/authController');


router.post('/login', AuthController.loginUser);

router.post('/signup', AuthController.signupUser);

module.exports = router;
