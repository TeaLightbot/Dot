var mongoose = require("mongoose");

var schema = mongoose.Schema({
    name: { type: String, required: true },
    karma: { type: Number, default: 0, required: true },
    heed: { type: Boolean },
    tea: { type: Boolean },
    wfh: {type: Boolean },
    __v: { type: Number, select: false }
});

var User = mongoose.model("User", schema);

module.exports = User;
