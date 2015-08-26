module.exports = {
    init: function(req) {

        this.session=req.session;

    },
    login: function(name, pass) {
        //console.log(this.req.session);

        console.log(this.session);
        this.session.user="asdasd";
        db.users.find({name:name, pass:pass}, function (err, docs) {
            console.log(docs[0]['_id']);
            //this.session.user="asdasd";
            //this.session.user=docs[0]['_id'];
            if(docs[0]!==undefined){
                //this.session.user=docs[0]['_id'];  //docs[0]['_id']
        }else{
            console.log("bad password or username");
        }
        });



    },
    auth: function(){
        //console.log(this.req.session.user);
        if(this.req.session.user === undefined /*and this.req.session.user*/){
            return false;
        }else{
            return true;
        }

    }

}
