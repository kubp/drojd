var PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    headline: String,
    perex: String,
    md_content: String,
    raw_content: String,
    tags:[String],
    author: String,
    date: Date,
    section: String,
    url: String,
    image: String,
    visible: {type: Number, default: 1}


},{ versionKey: false });

module.exports = mongoose.model("Post", PostSchema);