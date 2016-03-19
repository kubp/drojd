import React from "react";

class Simple extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(<div>
    	 <link rel="stylesheet" type="text/css" href="/assets/style.css"/>
    	 <h1>The page you are looking for does not exist</h1>
    	 </div>)
  }

}



module.exports=Simple;