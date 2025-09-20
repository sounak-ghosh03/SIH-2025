import mongoose from "mongoose";

// 🧾 Migrant Schema: Stores demographic & employer details + QR UID
const migrantSchema = new mongoose.Schema(
    {
        migrant_uid: {
            type: String,
            unique: true,
            required: true, // UUID or short hash for QR
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        age: Number,
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
        },
        phone: String,
        address: String,
        employer: String,
        geoLocation: {
            lat: Number,
            lng: Number,
        },
        languagePreference: {
            type: String,
            default: "en", // For multilingual support
        },
        registeredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Admin or doctor who registered
        },
    },
    { timestamps: true }
);

export default mongoose.model("Migrant", migrantSchema);
