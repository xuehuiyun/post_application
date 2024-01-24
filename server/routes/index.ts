import { Router } from "express";
import Blog from "./blog.route";
import Login from "./login.route";

const router = Router();

// =============================== //
// Post-Login routes (requires session)
// =============================== //
router.use(Login);

// Verify valid session
/**
 * TODO: implement login
 */
router.use("/api", (req, res, next) => {
    next();
});

router.use("/api", [Blog]);

export default router;
