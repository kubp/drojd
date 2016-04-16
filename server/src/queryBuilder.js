module.exports = {
  
  /**
  * @param {object} query
  * @return {object} type:query
  */
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
      
        return result;

    } 

      var search = query.split(":");
      var query = search[0];
      var type = search[1];
      return {[type]: [query]}


},

 /**
 * @param {string} params - Ignore
 * @param {string} params ß- Ignore
 * @return {string} 
 */

  ignore:function(params){
    params=params ? params : ""
    return(params);

},

 /**
 * @param {number} page
 * @param {number} per_page
 * @return {object}
 */
  paginator:function(page, per_page){
	var page = parseInt(page)
  var per_page = parseInt(per_page)
	return({ skip: page*per_page, limit: per_page });

},

 /**
  * @param {object} sort
  * @return {object} sort
  */
  sort:function(sort){
    if(typeof sort === "string"){

    var hasOrder = sort.match('^([a-z-_]+):(1|-1)$')
    if(hasOrder){
      return({[hasOrder[1]] : hasOrder[2]})
    }else{
        return sort;
    }

}
},


  doc:function(req, doc){
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.match('^[^?]*')[0];
    
    for(i=0; i<doc.length; i++){
      doc[i].page_url=fullUrl+"/"+doc[i]._id
    }
    
    
    return doc

}

}

