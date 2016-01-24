import React from "react";
class Page extends React.Component {
constructor(props){
    super(props);
    this.state = {
      page:this.props.data.page,
    };
}

  render() {
    return ( 
    	<div>
    	<h1>{this.state.page.headline}</h1>
    	<div dangerouslySetInnerHTML={{__html: this.state.page.raw_content}} />
    	</div>
    	)
  }

 
}

module.exports=Page;