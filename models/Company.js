const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({

    companyName: {
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

    website: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    location: {
        type: String,
        required: true
    },

    industry: {
        type: String,
        default: ""
    },

    approved: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Company", companySchema);