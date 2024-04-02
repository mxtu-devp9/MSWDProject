const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fundSchema = new Schema({
    fund_name: {
        type: String,
        required: true,
    },
    fund_description: {
        type: String,
        required: true,
    },
    fund_goal: {
        type: Number,
        required: true,
    },
    fund_current: {
        type: Number,
        required: true,
        default: 0,
    },
    fund_start: {
        type: Date,
        required: true,
    },
    fund_end: {
        type: Date,
    },
    fund_creator: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    fund_category: {
        type: String,
        required: true,
    },
});

const Fund = mongoose.model("Fund", fundSchema);

module.exports = Fund;
