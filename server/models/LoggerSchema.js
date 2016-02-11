var LoggerSchema = new mongoose.Schema({
    url: String,
    ip: String,
    user_agent: String,
    referer: String,
    ip: String,
    method: String,
    access_time: {type: Date, default: Date.now}
},{ versionKey: false });

module.exports = mongoose.model("Logger", LoggerSchema);