const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken");
const { generateToken } = require('../middleware/authMiddleware')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get all users",
      error,
    })

  }
}

exports.registerController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // validation

    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }

    // existing user 
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user 

    const user = new userModel({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).send({
      success: true,
      message: "New user created",
      user,
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Register callback ",
      success: false,
      error,
    })

  }
}




exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    // 2. Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // 4 . generate token 

    const token = generateToken({ id: user._id, email: user.email });

    // store in cookie

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });
    // ✅ 6. Send success response
    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
      // ❌ Don't send token here — already set in cookie
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Login failed due to server error",
      error,
    });
  }
};

exports.logoutController = (req, res) => {
  res.clearCookie("token");
  res.status(200).send({
    success: true,
    message: "Logged out successfully"
  });
};