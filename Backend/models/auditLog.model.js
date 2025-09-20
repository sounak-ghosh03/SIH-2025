import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        action: { type: String, required: true },
        targetId: { type: String }, // ID of the affected resource
        details: String,
        timestamp: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
