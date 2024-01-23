import { Router } from "express";
import Blog from "./blog.route";

const router = Router();

// =============================== //
// Post-Login routes (requires session)
// =============================== //

// Verify valid session
/**
 * TODO: implement login
 */
router.use("/api", (req, res, next) => {
    next();
});

router.use("/api", [Blog]);

export default router;
