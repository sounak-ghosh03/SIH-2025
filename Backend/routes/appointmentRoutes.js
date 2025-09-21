import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

//GET /appointments - List appointments (Doctors & Admins)
router.get(
    "/",
    authMiddleware,
    roleMiddleware("doctor", "admin"),
    async (req, res) => {
        try {
            // TODO: Fetch appointments from DB
            res.json({ message: "List of appointments" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

//POST /appointments - Create new appointment (Migrants & Admins)
router.post(
    "/",
    authMiddleware,
    roleMiddleware("migrant", "admin"),
    async (req, res) => {
        try {
            // TODO: Create appointment in DB
            res.json({ message: "Appointment created" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

export default router;
