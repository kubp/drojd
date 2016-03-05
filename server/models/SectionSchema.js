var SectionSchema = new mongoose.Schema({
    url: String,
    type: String,
    section: String,
    visible: {type: Number, default: 1},
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    blogsection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogSection'
    }
    
   },{ versionKey: false });

module.exports = mongoose.model("Section", SectionSchema);
