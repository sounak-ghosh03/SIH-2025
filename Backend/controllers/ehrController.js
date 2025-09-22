import EHR from "../models/ehr.model.js";
import mongoose from "mongoose";

// Add EHR record
export const addEHR = async (req, res) => {
    try {
        const { patientId, records } = req.body;

        if (!patientId || !records) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
        }

        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid patient ID" });
        }

        if (typeof records !== "object") {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Records must be an object or array",
                });
        }

        // Optional: prevent duplicate EHR docs for the same patient
        const existing = await EHR.findOne({ patientId });
        if (existing) {
            return res
                .status(409)
                .json({
                    success: false,
                    message: "EHR already exists for this patient",
                });
        }

        const ehr = new EHR({ patientId, records });
        await ehr.save();

        res.status(201).json({
            success: true,
            ehr,
            message: "EHR added successfully",
        });
    } catch (error) {
        console.error("addEHR error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get EHR by patient ID
export const getEHRByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid patient ID" });
        }

        const ehr = await EHR.findOne({ patientId });
        if (!ehr) {
            return res
                .status(404)
                .json({ success: false, message: "EHR not found" });
        }

        res.status(200).json({ success: true, ehr });
    } catch (error) {
        console.error("getEHRByPatientId error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update EHR record
export const updateEHR = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid EHR ID" });
        }

        const ehr = await EHR.findByIdAndUpdate(id, updates, { new: true });
        if (!ehr) {
            return res
                .status(404)
                .json({ success: false, message: "EHR not found" });
        }

        res.status(200).json({
            success: true,
            ehr,
            message: "EHR updated successfully",
        });
    } catch (error) {
        console.error("updateEHR error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
