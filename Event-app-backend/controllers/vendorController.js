const db = require("../db");

/* =======================
   CREATE VENDOR PROFILE
======================= */
exports.createVendorProfile = async (req, res) => {
    const { company_name, about, city, state, country } = req.body;

    try {
        const [exists] = await db.query(
            "SELECT * FROM vendors WHERE user_id=?",
            [req.user.uid]
        );

        if (exists.length > 0) {
            return res.status(400).json({ message: "Vendor profile already exists" });
        }

        await db.query(
            `INSERT INTO vendors (user_id, company_name, about, city, state, country)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [req.user.uid, company_name, about, city, state, country]
        );

        res.status(201).json({ message: "Vendor profile created successfully" });
    } catch (err) {
        console.error("Vendor profile error →", err);
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   GET VENDOR PROFILE
======================= */
exports.getVendorProfile = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM vendors WHERE user_id=?",
            [req.user.uid]
        );

        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   ADD VENDOR SERVICE
======================= */
exports.addVendorService = async (req, res) => {
    const { service_name, title, description, base_price } = req.body;

    try {
        const [vendor] = await db.query(
            "SELECT vendor_id FROM vendors WHERE user_id=?",
            [req.user.uid]
        );

        if (vendor.length === 0) {
            return res.status(400).json({ message: "Vendor profile not found" });
        }

        await db.query(
            `INSERT INTO vendor_services
             (vendor_id, service_name, title, description, base_price)
             VALUES (?, ?, ?, ?, ?)`,
            [vendor[0].vendor_id, service_name, title, description, base_price]
        );

        res.status(201).json({ message: "Vendor service added" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   GET MY SERVICES
======================= */
exports.getMyServices = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT vs.*
             FROM vendor_services vs
             JOIN vendors v ON vs.vendor_id = v.vendor_id
             WHERE v.user_id=?`,
            [req.user.uid]
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   GET ALL SERVICES (PUBLIC)
======================= */
exports.getAllServices = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT vs.*, v.company_name, v.city
             FROM vendor_services vs
             JOIN vendors v ON vs.vendor_id = v.vendor_id
             WHERE vs.is_active=1`
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   ADD AVAILABILITY
======================= */
exports.addAvailability = async (req, res) => {
    const { vendor_service_id, available_from, available_to } = req.body;

    try {
        await db.query(
            `INSERT INTO vendor_availability
             (vendor_service_id, available_from, available_to)
             VALUES (?, ?, ?)`,
            [vendor_service_id, available_from, available_to]
        );

        res.status(201).json({ message: "Availability added" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   GET AVAILABILITY
======================= */
exports.getAvailability = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT va.*
             FROM vendor_availability va
             JOIN vendor_services vs ON va.vendor_service_id = vs.vendor_service_id
             JOIN vendors v ON vs.vendor_id = v.vendor_id
             WHERE v.user_id=?`,
            [req.user.uid]
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
