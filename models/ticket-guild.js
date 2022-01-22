const {
    Schema,
    model
} = require('mongoose');

const Tickets = new Schema({
    guildID: String,
    index: Number
})

module.exports = model("ticket-guild", Tickets);