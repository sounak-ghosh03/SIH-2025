import User from "../models/user.model.js";

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password").sort({ createdAt: -1 });
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("getAllUsers error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update user role
export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const validRoles = ["migrant", "doctor", "admin", "ngo"];
        if (!role || !validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid or missing role. Allowed: " +
                    validRoles.join(", "),
            });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        ).select("-password");
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User role updated successfully",
            user,
        });
    } catch (error) {
        console.error("updateUserRole error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: `User (${user.email}) deleted successfully`,
        });
    } catch (error) {
        console.error("deleteUser error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
