const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    transaction_amount: {
        type: Number,
        required: true,
    },
    transaction_date: {
        type: Date,
        required: true,
    },
    transaction_user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    transaction_fund: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
