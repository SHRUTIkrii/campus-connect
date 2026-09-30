const express = require("express");
const Application = require("../models/application");

const router = express.Router();


// ================= STUDENT APPLY =================

router.post("/student/apply/:placementId", async (req, res) => {

    try {

        if (!req.session.userId) {
            return res.redirect("/login");
        }

        if (req.session.role !== "student") {
            return res.send("Access denied");
        }

        const existingApplication = await Application.findOne({
            student: req.session.userId,
            placement: req.params.placementId
        });

        if (existingApplication) {
            return res.send("You have already applied for this placement.");
        }

        await Application.create({
            student: req.session.userId,
            placement: req.params.placementId
        });

        res.redirect("/student/applications");

    } catch (error) {

        console.log(error);
        res.send("Error while applying");

    }

});


// ================= STUDENT APPLICATIONS =================

router.get("/student/applications", async (req, res) => {

    try {

        if (!req.session.userId) {
            return res.redirect("/login");
        }

        if (req.session.role !== "student") {
            return res.send("Access denied");
        }

        const applications = await Application.find({
            student: req.session.userId
        })
        .populate("placement");

        res.render("student-applications", {
            applications: applications
        });

    } catch (error) {

        console.log(error);
        res.send("Error loading applications");

    }

});


// ================= ADMIN APPLICATIONS =================

router.get("/admin/applications", async (req, res) => {

    try {

        if (!req.session.userId) {
            return res.redirect("/login");
        }

        if (req.session.role !== "admin") {
            return res.send("Access denied");
        }

        const applications = await Application.find()
            .populate("student")
            .populate("placement");

        res.render("admin-applications", {
            applications: applications,
            name: req.session.name
        });

    } catch (error) {

        console.log(error);
        res.send("Error loading applications");

    }

});


// ================= ADMIN UPDATE STATUS =================

router.post("/admin/application/:id/status", async (req, res) => {

    try {

        if (!req.session.userId) {
            return res.redirect("/login");
        }

        if (req.session.role !== "admin") {
            return res.send("Access denied");
        }

        const { status } = req.body;

        await Application.findByIdAndUpdate(
            req.params.id,
            {
                status: status
            }
        );

        res.redirect("/admin/applications");

    } catch (error) {

        console.log(error);
        res.send("Error updating application");

    }

});


module.exports = router;