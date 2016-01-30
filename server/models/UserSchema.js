 var UserSchema = new mongoose.Schema({
        mail: String,
        pass: String,
        name: String,
        profile_picture: String,
        permission: {type: Number, default: 1},
        updated_at: {type: Date, default: Date.now}
    });

 module.exports = mongoose.model("User", UserSchema);