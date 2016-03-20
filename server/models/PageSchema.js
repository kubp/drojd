
var PageSchema = new mongoose.Schema({
      url: String,
      type: String, //post, blog_section, page
      description: String,
      headline: String,
      section: String,
      title: String,
     
      md_content: String, //markdown
      raw_content: String, //html content

      post:{
        perex: String,
        author: String,
        tags:[String],
        comments: Boolean
      },
     

      image: String,
      created_at: {type: Date, default: Date.now},
      visible: {type: Number, default: 1}
   },{ versionKey: false });

PageSchema.index({ md_content: 'text' });

PageSchema.statics.findName = function (name){
  return this.find({image:name}).exec()
}

module.exports = mongoose.model("Page", PageSchema);