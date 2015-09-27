module.exports = {
    
    login: function(req, name, pass) {
        //session=req.session;
       
    var SectionSchema = new mongoose.Schema({
            mail: String,
            pass: String,
            level: String,
            
            updated_at: {type: Date, default: Date.now}
        });

     


    var SectionModel = mongoose.model('user', SectionSchema);


        SectionModel.find({}, function (err, user) {
            console.log(user)
        });
    




        req.session.user="asdasd";

    },
    auth: function(req){
        console.log(req.session.user);
        if(req.session.user === undefined /*and this.req.session.user*/){
            return false;
        }else{
            return true;
        }

    }

}
