import React from "react";
import axios from "axios";
var querystring = require('querystring');
import Time from "./Time"

class Blog extends React.Component {
constructor(props){
    super(props);
    this.state = { comments:[{}]};
  this.axiosSend = this.axiosSend.bind(this);
     this.handleChange = this.handleChange.bind(this);
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


  axiosSend(){

var comments = this.state.comments
comments.push({
  author:this.state.comment_name,
  content:this.state.comment_content,
  created_at:new Date()})
this.setState({comments:comments})

    axios.post(
  '/api/comment',
       querystring.stringify({
          post_id: this.props.data._id,
    author: this.state.comment_name,
    mail: this.state.comment_mail,
    content: this.state.comment_content


    })).catch(function (response) {
  });
  



}


  handleChange(evt){
    var name=evt.target.name;
    this.setState({[evt.target.name] : evt.target.value})
    
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
  <div className="comment">
  <h3>Komentáře</h3>
  <textarea placeholder="Leave a comment" name="comment_content" onChange={this.handleChange}></textarea>
  <input placeholder="Name" name="comment_name" onChange={this.handleChange}/>
  <input placeholder="Email" name="comment_mail" onChange={this.handleChange}/>
  <button onClick={this.axiosSend}>Send</button>


  <div className="comments">
    {this.state.comments.map(function(result,i) {
           return <Comment key={i} data={result}/>
        })}
</div>



  </div>

  </div>
</div>
      )
  }

 
}



class Comment extends React.Component {
constructor(props){
  super(props);
}


  render() {

    return (
            <div className="post">
  <div className="comment-detail"><div>{this.props.data.author}</div><span><Time time={this.props.data.created_at} /></span></div>


  <p>{this.props.data.content}</p>
</div>
       )
  }

 
}



module.exports=Blog;