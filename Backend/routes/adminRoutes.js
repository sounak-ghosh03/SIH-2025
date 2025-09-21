import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

// GET /admin/users - List all users (Admins only)
router.get(
    "/users",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            // TODO: Fetch and return the list of users from DB
            res.json({ message: "List of users" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

// POST /admin/notify - Send notification to authorities (Admins only)
router.post(
    "/notify",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            // TODO: Notify authorities about outbreaks/red zones
            res.json({ message: "Authorities notified" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

export default router;
