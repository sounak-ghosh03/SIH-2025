import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

// GET /ehr/:migrantId - Get EHR for a migrant
router.get("/:migrantId", authMiddleware, async (req, res) => {
    const { migrantId } = req.params;

    try {
        // Allow doctors/admins OR the migrant themselves
        if (
            req.user.role !== "doctor" &&
            req.user.role !== "admin" &&
            req.user.id !== migrantId
        ) {
            return res.status(403).json({ message: "Access denied" });
        }

        // TODO: Fetch EHR for migrantId from DB
        res.json({ message: `EHR data for migrant ${migrantId}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /ehr/:migrantId - Add/Update EHR for a migrant
router.post(
    "/:migrantId",
    authMiddleware,
    roleMiddleware("doctor", "admin"),
    async (req, res) => {
        const { migrantId } = req.params;

        try {
            // TODO: Save or update EHR data in DB
            res.json({ message: `EHR updated for migrant ${migrantId}` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

export default router;
