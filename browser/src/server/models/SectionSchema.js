var mongoose = require('mongoose')
var SectionSchema = new mongoose.Schema({
    url: String,
    type: String,
    section: String,
    visible: {type: Number, default: 1},
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    blogsection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogSection'
    }
    
   },{ versionKey: false });

module.exports = mongoose.model("Section", SectionSchema);
