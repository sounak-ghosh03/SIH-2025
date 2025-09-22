import Appointment from "../models/appointment.model.js";
import mongoose from "mongoose";

// Helper: validate ISO date & future date
const isValidFutureDate = (dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime()) && date > new Date();
};

// Schedule appointment
export const scheduleAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, date, reason } = req.body;

        if (!patientId || !doctorId || !date) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
        }

        if (
            !mongoose.Types.ObjectId.isValid(patientId) ||
            !mongoose.Types.ObjectId.isValid(doctorId)
        ) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid patient or doctor ID",
                });
        }

        if (!isValidFutureDate(date)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid or past date" });
        }

        // Optional: Prevent double-booking for the doctor
        const exists = await Appointment.findOne({ doctorId, date });
        if (exists) {
            return res
                .status(409)
                .json({ success: false, message: "Time slot already booked" });
        }

        const appointment = new Appointment({
            patientId,
            doctorId,
            date,
            reason: reason || "General consultation",
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
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get appointments for a user (patient or doctor)
export const getAppointments = async (req, res) => {
    try {
        const { userId, role } = req.query;

        const allowedRoles = ["patient", "doctor"];
        if (!userId || !role || !allowedRoles.includes(role)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Missing or invalid userId/role",
                });
        }

        const filter =
            role === "patient" ? { patientId: userId } : { doctorId: userId };
        const appointments = await Appointment.find(filter).sort({ date: 1 });

        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error("getAppointments error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid appointment ID" });
        }

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
        res.status(500).json({ success: false, message: "Server error" });
    }
};
