const express = require("express");

const router = express.Router();

router.get("/company/dashboard", (req, res) => {

    if (!req.session.userId) {
        return res.redirect("/login");
    }

    if (req.session.role !== "company") {
        return res.send("Access denied");
    }

    res.render("company-dashboard", {
        name: req.session.name
    });

});

module.exports = router;