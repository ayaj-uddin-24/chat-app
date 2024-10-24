import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Passwords don't match" });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res
        .status(404)
        .json({ success: false, message: "Username already exist!" });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Profile pic
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = await User({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      await newUser.save();
      const token = generateToken(newUser._id, res);

      res
        .status(201)
        .json({ success: true, message: "Registration successful", token });
    } else {
      res.status(404).json({ success: false, message: "Invalid User" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("Error in register user", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const comparePassword = await bcryptjs.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(404)
        .json({ success: false, message: "Password doesn't match!" });
    }

    const token = generateToken(user._id, res);

    res.status(202).json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("Error in login user", error);
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("Error in logout user", error);
  }
};
