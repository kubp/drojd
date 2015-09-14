var string = require("../String/String");

/**
 * Loading modules from /src
 * @param {string} file
 * @returns {*}
 */

function load(file) {

    var file = string.capitalizeFirstLetter(file);

    try{
        return require(__dirname +'/../'+ file +'/'+ file +'');
    }catch (e){
        console.log("Function does not exist");
        return null;
    }


}


module.exports.load = load;