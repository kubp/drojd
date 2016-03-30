import React from "react";
import axios from "axios";
var querystring = require('querystring');
import Time from "./Time"
import Comments from "./Comment"

class Blog extends React.Component {
constructor(props){
    super(props);
    this.state = {};

}

componentDidMount(){

axios.get('/api/comment/'+this.props.data._id+'')
  .then(function (response) {
  this.setState({comments: response.data
  })

}.bind(this)).catch(function (response) {
  this.setState({comments: []})
  }.bind(this));

}




  render() {
    return ( 
          <div className="row">
           <div className="col-1-4"/>
           <div className="col-1-2">
       <article>
    <h1 className="c">{this.props.data.headline}</h1>
    <span>{this.props.data.post.author}</span><span className="info"></span>
    <p dangerouslySetInnerHTML={{__html: this.props.data.raw_content}} />

  </article>

{this.state.comments && this.props.data.post.comments ? 
 <Comments data={this.state.comments} id={this.props.data._id}/>
: null}

  </div>
</div>
      )
  }

 
}




module.exports=Blog;