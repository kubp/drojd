import React from "react";


class Blog extends React.Component {
constructor(props){
    super(props);
    this.state = {blog:this.props.data.blog};

}

  render() {
    return ( 
    	    <div className="row">
           <div className="col-1-4"/>
           <div className="col-1-2">
       <article>
    <h1 className="c">{this.state.blog.headline}</h1>
    <span>{this.state.blog.author}</span><span className="info"></span>
    <p dangerouslySetInnerHTML={{__html: this.state.blog.raw_content}} />

  </article>
  </div>
  </div>
    	)
  }

 
}


module.exports=Blog;