const express = require("express");

const router = express.Router();

router.get("/student/dashboard", (req, res) => {

    if (!req.session.userId) {
        return res.redirect("/login");
    }

    if (req.session.role !== "student") {
        return res.send("Access denied");
    }

    res.render("student-dashboard", {
        name: req.session.name
    });
});

module.exports = router;