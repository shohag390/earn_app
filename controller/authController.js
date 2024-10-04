import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/AdminSchema.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "365d",
  });
};

export const register = async (req, res) => {
  const { email, password, name, role, phone, photo, blance } = req.body;

  try {
    let user = null;

    if (role === "user") {
      user = await User.findOne({ email });
    } else if (role === "admin") {
      user = await Admin.findOne({ email });
    }

    //check if user exist
    if (user) {
      return res.status(400).json({
        message: "user already exist",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "user") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        phone,
        blance,
        role,
      });
    }

    if (role === "admin") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        phone,
        role,
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Sign Up Successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error, Try again",
    });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;
    const userProfile = await User.findOne({ email });
    const adminProfile = await Admin.findOne({ email });

    if (userProfile) {
      user = userProfile;
    }

    if (adminProfile) {
      user = adminProfile;
    }

    //check if user exist or not
    if (!user) {
      return res.status(404).json({
        message: "You Have no Account",
      });
    }

    //compare password

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        status: false,
        message: "You have no account . Please sign up first",
      });
    }

    //get token
    const token = generateToken(user);

    const { password, role, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Faild to login , Please try again",
    });
  }
};
