module.exports = {
    init: function(req) {

        session=req.session;

    },
    login: function(name, pass) {

        db.users.find({name:name, pass:pass}, function (err, docs) {
            console.log(docs[0]['_id']);
            //console.log(this.session);
            this.session.user="asdasd";
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
