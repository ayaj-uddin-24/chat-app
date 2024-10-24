import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } });

    res.status(201).json({ success: true, filteredUsers });
  } catch (error) {
    console.log("Error in getUsers", error);
    res.status(404).json({ success: false, message: error.message });
  }
};
