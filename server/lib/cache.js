var Menu = require("../models/MenuSchema")
module.exports =  {
  menu: [],
  init: function(){
    var that = this
  Menu.find({active:1}).select("-active -menu_id").exec(function(error, menu){

    that.menu=menu
  })

  },
  setCache: function(){
  },
  getCache: function(){
    return this.menu
  }
}