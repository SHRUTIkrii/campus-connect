const express = require("express");
const Placement = require("../models/placement");

const router = express.Router();


// ================= STUDENT PLACEMENTS =================

router.get("/student/placements", async (req, res) => {

    if (!req.session.userId) {
        return res.redirect("/login");
    }

    if (req.session.role !== "student") {
        return res.send("Access denied");
    }

    try {

        const placements = await Placement.find();

        res.render("placements", {
            name: req.session.name,
            placements: placements
        });

    } catch (error) {

        console.log(error);
        res.send("Error loading placements");

    }

});


// ================= ADMIN ADD PLACEMENT PAGE =================

router.get("/admin/add-placement", (req, res) => {

    console.log("ADD PAGE ROLE:", req.session.role);

    if (!req.session.userId) {
        return res.redirect("/login");
    }

    if (req.session.role !== "admin") {
        return res.send("Access denied");
    }

    res.render("add-placement");

});


// ================= SAVE PLACEMENT =================

router.post("/admin/add-placement", async (req, res) => {

    console.log("SUBMIT USER ID:", req.session.userId);
    console.log("SUBMIT ROLE:", req.session.role);

    if (!req.session.userId) {
        return res.redirect("/login");
    }

    if (req.session.role !== "admin") {
        return res.send("Access denied");
    }

    try {

        const {
            company,
            jobRole,
            location,
            salary,
            eligibility,
            deadline,
            description
        } = req.body;


        const placement = new Placement({

            company,
            jobRole,
            location,
            salary,
            eligibility,
            deadline,
            description

        });


        await placement.save();


       res.redirect("/admin/dashboard");


    } catch (error) {

        console.log(error);

        res.send("Failed to add placement");

    }

});


module.exports = router;