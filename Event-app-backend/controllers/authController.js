const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

// Signup
const signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if user exists
        const [existing] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (existing.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await pool.query(
            'INSERT INTO users (name, email, phone, password, role, status) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, phone, hashedPassword, 'attendee', 'approved']
        );

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (err){
    console.error("FULL ERROR =>", err);
    return res.status(500).json({ message: "Server error", error: err.message });
    }
};


// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (users.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = users[0];

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { uid: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { signup, login };
