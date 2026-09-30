const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    placement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Placement",
        required: true
    },

    status: {
        type: String,
        enum: ["Applied", "Shortlisted", "Selected", "Rejected"],
        default: "Applied"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Application", applicationSchema);