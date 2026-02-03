const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

/* Attendee creates booking */
router.post(
    "/",
    verifyToken,
    verifyRole("attendee"),
    bookingController.createBooking
);

/* Attendee views own bookings */
router.get(
    "/my",
    verifyToken,
    verifyRole("attendee"),
    bookingController.getMyBookings
);

/* Admin views all bookings */
router.get(
    "/",
    verifyToken,
    verifyRole("admin"),
    bookingController.getAllBookings
);

module.exports = router;
