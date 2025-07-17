const express = require('express');
const {getAllUsers , registerController , loginController , logoutController} = require('../controllers/userController')
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');



router.get('/all-users', getAllUsers)
router.post('/register', registerController)
router.post('/login',loginController)
router.get("/logout", logoutController);





module.exports = router;

// http://localhost:5000/api/v1/user/all-users
// http://localhost:5000/api/v1/user/register
// http://localhost:5000/api/v1/user/login

