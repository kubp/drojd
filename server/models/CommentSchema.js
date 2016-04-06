var CommentSchema = new mongoose.Schema({
    post_id: String,
    p_id: String,
    author: String,
    mail: String,
    profile_picture: String,
    reply: String,
    reply_name: String,
    content: String,
    permission: {type: Number, default: 1},
    created_at : {type : Date, default:Date.now()},


},{ versionKey: false });

module.exports = mongoose.model("Comment", CommentSchema);