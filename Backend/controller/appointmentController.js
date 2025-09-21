import Appointment from "../models/appointment.model.js";

// Schedule appointment
export const scheduleAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, date, reason } = req.body;

        if (!patientId || !doctorId || !date) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
        }

        const appointment = new Appointment({
            patientId,
            doctorId,
            date,
            reason,
            status: "Scheduled",
        });
        await appointment.save();

        res.status(201).json({
            success: true,
            appointment,
            message: "Appointment scheduled successfully",
        });
    } catch (error) {
        console.error("scheduleAppointment error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// Get appointments for a user (patient or doctor)
export const getAppointments = async (req, res) => {
    try {
        const { userId, role } = req.query; // role: 'patient' or 'doctor'

        if (!userId || !role) {
            return res
                .status(400)
                .json({ success: false, message: "Missing userId or role" });
        }

        const filter =
            role === "patient" ? { patientId: userId } : { doctorId: userId };

        const appointments = await Appointment.find(filter).sort({ date: 1 });

        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error("getAppointments error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status: "Cancelled" },
            { new: true }
        );
        if (!appointment) {
            return res
                .status(404)
                .json({ success: false, message: "Appointment not found" });
        }

        res.status(200).json({
            success: true,
            appointment,
            message: "Appointment cancelled successfully",
        });
    } catch (error) {
        console.error("cancelAppointment error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
