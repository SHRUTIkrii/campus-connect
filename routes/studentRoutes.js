const express = require("express");
const Student = require("../models/Student");

const router = express.Router();


// ================= STUDENT DASHBOARD =================

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


// ================= STUDENT PROFILE PAGE =================

router.get("/student/profile", async (req, res) => {

    if (!req.session.userId) {
        return res.redirect("/login");
    }

    if (req.session.role !== "student") {
        return res.send("Access denied");
    }

    try {

        const student = await Student.findOne({
            user: req.session.userId
        });

        res.render("student-profile", {
            name: req.session.name,
            email: req.session.email,
            student: student
        });

    } catch (error) {

        console.log(error);
        res.send("Error loading profile");

    }
});


// ================= SAVE STUDENT PROFILE =================

router.post("/student/profile", async (req, res) => {

    if (!req.session.userId) {
        return res.redirect("/login");
    }

    if (req.session.role !== "student") {
        return res.send("Access denied");
    }

    try {

        const {
            name,
            phone,
            branch,
            semester,
            cgpa,
            tenthPercentage,
            twelfthPercentage,
            skills,
            graduationYear
        } = req.body;


        const skillsArray = skills
            ? skills.split(",").map(skill => skill.trim()).filter(skill => skill !== "")
            : [];


        let student = await Student.findOne({
            user: req.session.userId
        });


        if (student) {

            // Existing profile → Update

            student.name = name;
            student.phone = phone;
            student.branch = branch;
            student.semester = semester;
            student.cgpa = cgpa;
            student.tenthPercentage = tenthPercentage;
            student.twelfthPercentage = twelfthPercentage;
            student.skills = skillsArray;
            student.graduationYear = graduationYear;

            await student.save();

        } else {

            // New profile → Create

            student = new Student({

                user: req.session.userId,

                name: name,

                email: req.session.email,

                phone: phone,

                branch: branch,

                semester: semester,

                cgpa: cgpa,

                tenthPercentage: tenthPercentage,

                twelfthPercentage: twelfthPercentage,

                skills: skillsArray,

                graduationYear: graduationYear

            });

            await student.save();

        }


        res.redirect("/student/profile");

    } catch (error) {

        console.log(error);

        res.send("Profile save failed");

    }

});


module.exports = router;