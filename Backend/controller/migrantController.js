import Migrant from "../models/migrant.model.js";

// Add migrant data
export const addMigrant = async (req, res) => {
    try {
        const { name, age, countryOfOrigin, status, arrivalDate } = req.body;

        if (!name || !age || !countryOfOrigin || !status) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
        }

        const migrant = new Migrant({
            name,
            age,
            countryOfOrigin,
            status,
            arrivalDate,
        });
        await migrant.save();

        res.status(201).json({
            success: true,
            migrant,
            message: "Migrant data added successfully",
        });
    } catch (error) {
        console.error("addMigrant error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// Get migrant by ID
export const getMigrantById = async (req, res) => {
    try {
        const { id } = req.params;

        const migrant = await Migrant.findById(id);
        if (!migrant) {
            return res
                .status(404)
                .json({ success: false, message: "Migrant not found" });
        }

        res.status(200).json({ success: true, migrant });
    } catch (error) {
        console.error("getMigrantById error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// Update migrant data
export const updateMigrant = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

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
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
