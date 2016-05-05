import React from "react";


class BlogList extends React.Component {
constructor(props){
    super(props);
    
}

  render() {
    return (
       <div className="row">
       {this.props.data.posts.map(function(result) {
           return <Post data={result} key={result._id}/>;
        })}
       </div>
       
    	)
  }

 
}


class Post extends React.Component {
constructor(props){
    super(props);
    
  
}

  render() {
    return ( 
          <div className="col-1-3">
            <article>
              <h1>{this.props.data.headline}</h1>
                <span>{this.props.data.post.author}</span><span className="info"></span>
                <p dangerouslySetInnerHTML={{__html: this.props.data.post.perex}} />
                <a href={this.props.data.url}>Přečíst...</a>
            </article>
          </div>
    	)
  }

 }




module.exports=BlogList;