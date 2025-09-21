import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

// GET /analytics/outbreaks - Get disease outbreak data (Doctors & Admins)
router.get(
    "/outbreaks",
    authMiddleware,
    roleMiddleware("doctor", "admin"),
    async (req, res) => {
        try {
            // TODO: Fetch outbreak analytics from DB or service
            res.json({ message: "Outbreak analytics data" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

// GET /analytics/redzones - Get red zone info (Doctors & Admins)
router.get(
    "/redzones",
    authMiddleware,
    roleMiddleware("doctor", "admin"),
    async (req, res) => {
        try {
            // TODO: Fetch red zone data from DB or service
            res.json({ message: "Red zone data" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

export default router;
