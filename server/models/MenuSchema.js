var MenuSchema = new mongoose.Schema({
    href: String,
    text: String,
    title: String,
    active: Number,
    menu_id: Number

},{ versionKey: false });

module.exports = mongoose.model("Menu", MenuSchema);