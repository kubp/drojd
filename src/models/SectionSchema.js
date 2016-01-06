var SectionSchema = new mongoose.Schema({
    url: String,
    type: String,
    section: [String],
    visible: {type: Number, default: 1},
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    }
    
   },{ versionKey: false });

module.exports = mongoose.model("Section", SectionSchema);
