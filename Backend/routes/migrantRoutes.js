import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

// GET /migrants - List migrant workers (Doctors & Admins)
router.get(
    "/",
    authMiddleware,
    roleMiddleware("doctor", "admin"),
    async (req, res) => {
        try {
            // TODO: Fetch list of migrants from DB
            res.json({ message: "List of migrant workers" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

// POST /migrants - Add new migrant worker (Admins only)
router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
        // TODO: Add migrant worker to DB
        res.json({ message: "Add migrant worker" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
