import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// POST /chatbot/message - Send message to AI chatbot (Authenticated users)
router.post("/message", authMiddleware, async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({ message: "Message is required" });
        }

        // TODO: Integrate AI model logic here
        const aiReply = `You said: ${message}`;

        res.json({ reply: aiReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
