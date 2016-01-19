
var PageSchema = new mongoose.Schema({
    title: String,
    description: String,
    headline: String,
    raw_content: String,
    md_content: String,
    keywords: String,
    url: String
   },{ versionKey: false });

PageSchema.index({ content: 'text' });
module.exports = mongoose.model("Page", PageSchema);