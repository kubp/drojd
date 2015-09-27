/**
 * todo Prejmenovat
 * Funkce ktera bere data z req a dela z nich JSON
 */

function mongoose() {

    string=loader.load("String");



    /**
     * @param req
     * @param arg
     * @return JSON
     */
    this.get = function(req, arg ){


        var data='{';
        for(i=0; i<arg.length; i++){
            //console.log(req.query[arg[i]]);


            if(typeof req.params[arg[i]] !== 'undefined'){
                if(arg.length==i+1){
                    data=data + '"'+arg[i]+'"'+ ':"'+string.escapeHtml(req.params[arg[i]])+'"';
                }else{
                    data=data + '"'+arg[i]+'"'+ ':"'+string.escapeHtml(req.params[arg[i]])+'",';
                }


            }else if(typeof req.query[arg[i]] !=='undefined'){

                if(arg.length==i+1){
                    data=data + '"'+arg[i]+'"'+ ':"'+string.escapeHtml(req.query[arg[i]])+'"';
                }else{
                    data=data + '"'+arg[i]+'"'+ ':"'+string.escapeHtml(req.query[arg[i]])+'",';
                }


            }else if(typeof req.body[arg[i]] !=='undefined'){

                if(arg.length==i+1){
                    data=data + '"'+arg[i]+'"'+ ':"'+string.escapeHtml(req.body[arg[i]])+'"';
                }else{
                    data=data + '"'+arg[i]+'"'+ ':"'+string.escapeHtml(req.body[arg[i]])+'",';
                }


            }else{
                if(arg.length==i+1){
                    data=data + '"'+arg[i]+'"'+ ':""';
                }else{
                    data=data + '"'+arg[i]+'"'+ ':"",';
                }
            }


        }
        var data=data+'}';
        //console.log(data)
        return JSON.parse(data);

    }

}

module.exports = mongoose;