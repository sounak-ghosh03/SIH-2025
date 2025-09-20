import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["migrant", "doctor", "admin", "ngo"],
            required: true,
        },
    },
    { timestamps: true }
);

// Password hash middleware
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Password check method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
