const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },

    jobRole: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    salary: {
        type: String,
        required: true
    },

    eligibility: {
        type: String,
        required: true
    },

    deadline: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Placement", placementSchema);