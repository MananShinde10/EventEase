const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");
const { verifyToken, verifyRole, verifyRoleMultiple } = require("../middleware/authMiddleware");

/* CREATE EVENT (ADMIN + ORGANISER) */
router.post(
    "/",
    verifyToken,
    verifyRoleMultiple("admin", "organiser"),
    eventController.createEvent
);

/* VIEW ALL EVENTS (PUBLIC / ATTENDEE) */
router.get("/", eventController.getAllEvents);

/* VIEW SINGLE EVENT */
router.get("/:id", eventController.getEventById);

/* ADMIN APPROVES ORGANISER EVENT */
router.put(
    "/approve/:id",
    verifyToken,
    verifyRole("admin"),
    eventController.approveEvent
);

/* DELETE EVENT (ADMIN ONLY) */
router.delete(
    "/:id",
    verifyToken,
    verifyRole("admin"),
    eventController.deleteEvent
);

module.exports = router;
