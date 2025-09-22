import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES_IN = "7d";

// Register
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res
                .status(409)
                .json({ success: false, message: "Email already registered" });
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Password must be at least 8 characters long",
                });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email: normalizedEmail,
            password: hashedPassword,
            role: role || "migrant",
        });

        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error("registerUser error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Email and password required",
                });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail }).select(
            "+password"
        );
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: TOKEN_EXPIRES_IN,
        });

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("loginUser error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Logout (stateless JWT)
export const logoutUser = async (_req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        console.error("logoutUser error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
