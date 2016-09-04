import React from "react";
import Post from "./Post";
import BlogList from "./BlogList";
import Page from "./Page";
import Error404 from "./error404";

class Content extends React.Component {
constructor(props){
    super(props);
}

  render() {
    if(this.props.data.type=="page"){
      return ( <Page data={this.props.data}/> )
    }else if(this.props.data.type=="post"){
      return ( <Post data={this.props.data}/> )
    }else if(this.props.data.type=="blog_section"){
      return ( <BlogList data={this.props.data}/> )
    }else{
    return (<Error404/>)
    }
  }

 

}
module.exports=Content;