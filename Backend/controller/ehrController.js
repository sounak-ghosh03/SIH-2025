import EHR from "../models/ehr.model.js";

// Add EHR record
export const addEHR = async (req, res) => {
    try {
        const { patientId, records } = req.body;

        if (!patientId || !records) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
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
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// Get EHR by patient ID
export const getEHRByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;

        const ehr = await EHR.findOne({ patientId });
        if (!ehr) {
            return res
                .status(404)
                .json({ success: false, message: "EHR not found" });
        }

        res.status(200).json({ success: true, ehr });
    } catch (error) {
        console.error("getEHRByPatientId error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// Update EHR record
export const updateEHR = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

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
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
