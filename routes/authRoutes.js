const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();


// ================= REGISTER =================

// Register Page
router.get("/register", (req, res) => {
    res.render("register");
});


// Register User
router.post("/register", async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.send("All fields are required");
        }

        if (password.length < 6) {
            return res.send("Password must be at least 6 characters");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        res.send("Registration successful");

    } catch (error) {

        console.log(error);
        res.send("Registration failed");

    }

});


// ================= LOGIN =================

// Login Page
router.get("/login", (req, res) => {
    res.render("login");
});


// Login User
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.send("Invalid email or password");
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

       if (!passwordMatch) {
    return res.send("Invalid email or password");
}

req.session.userId = user._id;
req.session.role = user.role;
req.session.name = user.name;

// Role ke according dashboard
if (user.role === "student") {
    return res.redirect("/student/dashboard");
}

if (user.role === "company") {
    return res.redirect("/company/dashboard");
}

if (user.role === "admin") {
    return res.redirect("/admin/dashboard");
}

res.send("Invalid role");

    } catch (error) {

        console.log(error);
        res.send("Login failed");

    }

});

// ================= LOGOUT =================

router.get("/logout", (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            console.log(err);
            return res.send("Logout failed");
        }

        res.redirect("/login");

    });

});

module.exports = router;