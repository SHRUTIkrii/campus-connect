const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    branch: {
        type: String,
        required: true
    },

    graduationYear: {
        type: Number,
        required: true
    },

    cgpa: {
        type: Number,
        required: true
    },

    tenthPercentage: {
        type: Number,
        required: true
    },

    twelfthPercentage: {
        type: Number,
        required: true
    },

    skills: {
        type: [String],
        default: []
    },

    projects: {
        type: [String],
        default: []
    },

    certifications: {
        type: [String],
        default: []
    },

    resume: {
        type: String,
        default: null
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);