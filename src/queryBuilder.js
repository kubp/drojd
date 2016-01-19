
module.exports = {
query: function(query) {

  if (typeof query === "undefined") {
    return {};
  }


  if (typeof query === "object") {

   
    var result = {};
    for (i = 0; i < query.length; i++) {
      var search = query[i].split(":");
      var q = search[0];
      var type = search[1];
   
      result[type] = [q]

    }
 console.log(result)
return result;

  } 



    var search = query.split(":");
    var query = search[0];
    var type = search[1];
    return {[type]: [query]}


  


//data={[{data:"as"},"-__v -visible",{ skip: 0, limit: 10 }]}


//return (d, b)


},


  ignore:function(params){
		params=params ? params : ""
	return("-visible "+params);

},

  paginator:function(page, per_page){
	
	return({ skip: page*per_page, limit: per_page });

}

}

