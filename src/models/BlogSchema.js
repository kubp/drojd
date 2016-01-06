var BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    headline: String,
    perex: String,
    content: String,
    tags:[String],
    author: String,
    date: Date


},{ versionKey: false });

module.exports = mongoose.model("Blog", BlogSchema);