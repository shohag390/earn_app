import Admin from "../models/AdminSchema.js";

export const getAdminProfile = async (req, res) => {
  const adminId = req.userId;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const { password, ...rest } = doctor._doc;

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
