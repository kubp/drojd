import React from "react";
import axios from "axios";
var querystring = require('querystring');
import Time from "./Time"
var revalidator = require('revalidator');

class Comments extends React.Component {
constructor(props){
    super(props);

  this.axiosSend = this.axiosSend.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.state = {comments: this.props.data,reply:"",comment_content:""}
  this.reply = this.reply.bind(this);

}




reply(id, name){
  this.setState({
  reply_name:name,
  reply: id, 
  comment_content: "@" + name+" "+this.state.comment_content.replace(/@([a-zA-Z\-])+/,"")})

}


  axiosSend(){
     
      var validationData = { author: this.state.comment_name,
                             mail: this.state.comment_mail,
                             content: this.state.comment_content}

      var f = revalidator.validate(validationData, {
      properties: {
        
         content: {
          description: 'asddas',
            type: 'string',
             maxLength: 600,
            required: true,
            allowEmpty: false
            
        },
        author: {
          description: 'ajajaj',
            type: 'string',
            maxLength: 25,
    
          required: true,
          allowEmpty: false
        },
        mail: {
          description: 'asddas',
            type: 'string',
            format: "email",
            required: true,
        }
      }
    });

      
      if(!f.valid){
        this.setState({error_msg: f.errors[0].property +" "+ f.errors[0].message})
        return;
      }else{
        this.setState({error_msg:""})
      }


    var comments = this.state.comments
    comments.push({
      author:this.state.comment_name,
      content:this.state.comment_content,
      created_at:new Date()
    })
    this.setState({comments:comments})


    axios.post(
      '/api/comment',
      querystring.stringify({
      post_id: this.props.id,
      author: this.state.comment_name,
      mail: this.state.comment_mail,
      content: this.state.comment_content,
      reply: this.state.reply,
      reply_name: this.state.reply_name


    })).then(function (response) {
    
     

  }.bind(this)).catch(function (response) {
    
    }.bind(this));
  
  this.setState({comment_name:"",
                comment_mail:"",
                comment_content:"",
                reply:"",
                reply_name:""})
  }




  handleChange(evt){
    var name=evt.target.name;
    this.setState({[evt.target.name] : evt.target.value})
  }


  render() {
    var that = this;
    return ( 
        <div className="comment" id="comment">
          <h3>Komentáře</h3>
          <textarea placeholder="Leave a comment" name="comment_content" onChange={this.handleChange} value={this.state.comment_content}></textarea>
          <input placeholder="Name" name="comment_name" onChange={this.handleChange} value={this.state.comment_name}/>
          <input placeholder="Email" name="comment_mail" onChange={this.handleChange} value={this.state.comment_mail}/>
          <button onClick={this.axiosSend}>Send</button>
          <p>{this.state.error_msg}</p>

           <div className="comments">
              {this.state.comments.map(function(result,i) {
                return <Comment reply={that.reply.bind(null)} key={i} data={result}/>
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
            <div className="post" id={this.props.data.p_id}>
              <div className="comment-detail">
                <div>{this.props.data.author}</div>
                <span><Time time={this.props.data.created_at} /></span>
                <span><a href="#comment" onClick={this.props.reply.bind(null,this.props.data.p_id,this.props.data.author)}>reply</a></span>
              </div>

              {this.props.data.reply == "" || !this.props.data.reply ?
                <p>{this.props.data.content}</p>:
                <p><a href={"#"+this.props.data.reply}>@{this.props.data.reply_name}</a> 
              {this.props.data.content.replace(/@([a-zA-Z\-])+/,"")}</p>
              }
           </div>
       )
  }

 
}


module.exports=Comments;