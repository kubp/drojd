import React from "react";
class Menu extends React.Component {
constructor(props){
    super(props);
}

  render() {
    return ( 
    	<ul>
      {this.props.menu.map((item) =>
           <li key={item._id}><a href={item.href}>{item.text}</a></li>
        )}
   
       </ul>
    	)
  }

 
}

module.exports=Menu;