import User from "../models/UserSchema.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "User Found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not found",
    });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "profile info is getting",
      data: { ...rest },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something want wrong, can not get",
    });
  }
};
