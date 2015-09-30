

var handler =function(){

    this.testHandler = notestHandler;

}


function notestHandler(req,res){
    res.send("ok");
}
module.exports = handler;