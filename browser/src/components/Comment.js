import React from "react";
import axios from "axios";
var querystring = require('querystring');
import Time from "./Time"

class Comments extends React.Component {
constructor(props){
    super(props);
  this.axiosSend = this.axiosSend.bind(this);
       this.handleChange = this.handleChange.bind(this);
  console.log(this.props.data)
  this.state = {comments: this.props.data}
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
          post_id: this.props.id,
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


module.exports=Comments;