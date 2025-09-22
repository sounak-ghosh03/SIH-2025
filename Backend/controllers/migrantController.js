import Migrant from "../models/migrant.model.js";
import mongoose from "mongoose";

// Add migrant data
export const addMigrant = async (req, res) => {
    try {
        const { name, age, countryOfOrigin, status, arrivalDate } = req.body;

        // Basic validation
        if (!name || !age || !countryOfOrigin || !status) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
        }

        if (typeof age !== "number" || age <= 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Age must be a positive number",
                });
        }

        const allowedStatuses = ["pending", "approved", "rejected"];
        if (!allowedStatuses.includes(status)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid status value" });
        }

        const migrant = new Migrant({
            name,
            age,
            countryOfOrigin,
            status,
            arrivalDate: arrivalDate ? new Date(arrivalDate) : undefined,
        });
        await migrant.save();

        res.status(201).json({
            success: true,
            migrant,
            message: "Migrant data added successfully",
        });
    } catch (error) {
        console.error("addMigrant error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get migrant by ID
export const getMigrantById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid ID format" });
        }

        const migrant = await Migrant.findById(id);
        if (!migrant) {
            return res
                .status(404)
                .json({ success: false, message: "Migrant not found" });
        }

        res.status(200).json({ success: true, migrant });
    } catch (error) {
        console.error("getMigrantById error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update migrant data
export const updateMigrant = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid ID format" });
        }

        const migrant = await Migrant.findByIdAndUpdate(id, updates, {
            new: true,
        });
        if (!migrant) {
            return res
                .status(404)
                .json({ success: false, message: "Migrant not found" });
        }

        res.status(200).json({
            success: true,
            migrant,
            message: "Migrant data updated successfully",
        });
    } catch (error) {
        console.error("updateMigrant error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
