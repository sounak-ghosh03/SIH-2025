import mongoose from "mongoose";
const ehrRecordSchema = new mongoose.Schema(
    {
        migrant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Migrant",
            required: true,
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Doctor who updated the record
            required: true,
        },
        pastIllnesses: [String],
        vaccinations: [String],
        allergies: [String],
        occupationalHazards: [String],
        prescriptions: [
            {
                date: Date,
                medication: String,
                dosage: String,
                notes: String,
            },
        ],
        attachments: [
            {
                fileName: String,
                fileUrl: String, // URL returned from S3/MinIO
                uploadedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        notes: String,
    },
    { timestamps: true }
);

export default mongoose.model("EhrRecord", ehrRecordSchema);
