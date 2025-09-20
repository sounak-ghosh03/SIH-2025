import mongoose from "mongoose";

const vectorDocSchema = new mongoose.Schema(
    {
        text: String,
        embedding: { type: [Number], index: "2dsphere" }, // or use pgvector in Postgres
        metadata: Object, // e.g., source doc IDs
    },
    { timestamps: true }
);

export default mongoose.model("VectorDoc", vectorDocSchema);
