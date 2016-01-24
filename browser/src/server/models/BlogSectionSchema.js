var mongoose = require('mongoose')
var BlogSectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    headline: String,
    author: String,
    section: String

},{ versionKey: false });

module.exports = mongoose.model("BlogSection", BlogSectionSchema);