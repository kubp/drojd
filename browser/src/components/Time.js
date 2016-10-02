import React from "react";
import moment from "moment"
moment.locale("cs");

class Time extends React.Component {
constructor(props){
    super(props);
    this.getFrom = this.getFrom.bind(this);
}

componentDidReceiveProps(){
}


getFrom(e){
  return moment().to(e)
}

  render() {
    return ( 
          <span>{this.getFrom(this.props.time)}</span>
    	)
  }

 
}

module.exports=Time;