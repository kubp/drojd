
var PageSchema = new mongoose.Schema({
    title: String,
    description: String,
    headline: String,
    content: String,
    keywords: String,
   },{ versionKey: false });


module.exports = mongoose.model("Page", PageSchema);