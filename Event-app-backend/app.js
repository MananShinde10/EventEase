const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");
const bookingRoutes = require("./routes/bookings");
const vendorRoutes = require("./routes/vendors");
const notificationRoutes = require("./routes/notifications");
const weddingRoutes = require("./routes/weddings");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/notifications", notificationRoutes);
app.use("/api/weddings", weddingRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
