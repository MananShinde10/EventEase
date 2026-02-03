const express = require("express");
const router = express.Router();

const vendorController = require("../controllers/vendorController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

/* Vendor profile */
router.post(
    "/profile",
    verifyToken,
    verifyRole("vendor"),
    vendorController.createVendorProfile
);

router.get(
    "/profile",
    verifyToken,
    verifyRole("vendor"),
    vendorController.getVendorProfile
);

/* Vendor services */
router.post(
    "/services",
    verifyToken,
    verifyRole("vendor"),
    vendorController.addVendorService
);

router.get(
    "/services",
    verifyToken,
    verifyRole("vendor"),
    vendorController.getMyServices
);

router.get(
    "/services/all",
    vendorController.getAllServices
);

/* Vendor availability */
router.post(
    "/availability",
    verifyToken,
    verifyRole("vendor"),
    vendorController.addAvailability
);

router.get(
    "/availability",
    verifyToken,
    verifyRole("vendor"),
    vendorController.getAvailability
);

module.exports = router;
