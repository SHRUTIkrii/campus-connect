const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

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
        default: ""
    },

    branch: {
        type: String,
        required: true
    },

    semester: {
        type: Number,
        default: 1
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
        default: 0
    },

    twelfthPercentage: {
        type: Number,
        default: 0
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