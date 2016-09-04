var TemplateSchema = new mongoose.Schema({
    html: String,
    jsx: String,
    file: String,
    name: String

},{ versionKey: false });

module.exports = mongoose.model("Template", TemplateSchema);
