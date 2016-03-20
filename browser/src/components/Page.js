import React from "react";
class Page extends React.Component {
constructor(props){
    super(props);
}

  render() {
    return ( 
    	<div>
        <div dangerouslySetInnerHTML={{__html: this.props.data.raw_content}} />
    	</div>
    	)
  }

 
}

module.exports=Page;