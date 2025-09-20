import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        migrant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Migrant",
            required: true,
        },
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, required: true },
        status: {
            type: String,
            enum: ["pending", "confirmed", "completed"],
            default: "pending",
        },
        telemedicineLink: String,
    },
    { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
