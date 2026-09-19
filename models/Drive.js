const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema({

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

    jobTitle: {
        type: String,
        required: true
    },

    package: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    requiredSkills: {
        type: [String],
        default: []
    },

    eligibleBranches: {
        type: [String],
        default: []
    },

    minimumCGPA: {
        type: Number,
        required: true
    },

    minimumTenthPercentage: {
        type: Number,
        required: true
    },

    minimumTwelfthPercentage: {
        type: Number,
        required: true
    },

    graduationYear: {
        type: Number,
        required: true
    },

    applicationDeadline: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Drive", driveSchema);