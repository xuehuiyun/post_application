import { Router } from "express";
import Post from "./post.route";
import Login from "./login.route";
import User from "./user.route";

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

router.use("/api", [Post, User]);

export default router;
