import Analytics from "../models/analytics.model.js";

// Get general analytics data
export const getAnalytics = async (req, res) => {
    try {
        // Example: aggregate some data
        const totalUsers = await Analytics.countDocuments({ type: "user" });
        const totalAppointments = await Analytics.countDocuments({
            type: "appointment",
        });

        res.status(200).json({
            success: true,
            data: { totalUsers, totalAppointments },
        });
    } catch (error) {
        console.error("getAnalytics error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// Get user-specific analytics
export const getUserAnalytics = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res
                .status(400)
                .json({ success: false, message: "Missing userId" });
        }

        // Example: fetch analytics for user
        const userData = await Analytics.find({ userId });

        res.status(200).json({ success: true, data: userData });
    } catch (error) {
        console.error("getUserAnalytics error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
