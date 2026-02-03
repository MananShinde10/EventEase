const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

/* =======================
   ADMIN ROUTES
======================= */

// Get all users
router.get(
    "/",
    verifyToken,
    verifyRole("admin"),
    userController.getAllUsers
);

// Delete user
router.delete(
    "/:id",
    verifyToken,
    verifyRole("admin"),
    userController.deleteUser
);

// Approve / Reject role request
router.put(
    "/update-role/:id",
    verifyToken,
    verifyRole("admin"),
    userController.updateUserRole
);

/* =======================
   USER ROUTES
======================= */

// Request role upgrade (attendee → organiser/vendor)
router.put(
    "/request-role",
    verifyToken,
    userController.requestRoleUpgrade
);

module.exports = router;
