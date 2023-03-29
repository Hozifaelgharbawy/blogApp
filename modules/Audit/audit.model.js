let mongoose = require("mongoose");

let auditSchema = mongoose.Schema({
    auditOn: Date,
    auditBy: String,
    auditData: Object,
    auditStatus: Number,
    auditAction: String,
    errorMessage: Object
});

let auditModel = mongoose.model("audits", auditSchema);

module.exports = auditModel;