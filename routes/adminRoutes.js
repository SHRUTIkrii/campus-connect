const express = require("express");

const router = express.Router();

router.get("/admin/dashboard", (req, res) => {

    if (!req.session.userId) {
        return res.redirect("/login");
    }

    if (req.session.role !== "admin") {
        return res.send("Access denied");
    }

    res.render("admin-dashboard", {
        name: req.session.name
    });

});

module.exports = router;