
var PageSchema = new mongoose.Schema({
    title: String,
    description: String,
    raw_content: String,
    md_content: String,
    keywords: String,
    url: String,
    visible: {type: Number, default: 1}
   },{ versionKey: false });

PageSchema.index({ content: 'text' });
module.exports = mongoose.model("Page", PageSchema);