

import React from "react";
import axios from "axios";
import marked from "marked";
import Head from "./components/Head"
import Error404 from "./components/error404"
import Content from "./components/Content";
//import config from "./../config.js"

//GENERATED
//GENERATED 



class Main extends React.Component {
constructor(props){
    super(props);
    this.getTemplate = this.getTemplate.bind(this);
}

  getTemplate(){
    var template = ""


template = <Error404/>;
 
 //GENERATED
//GENERATED 

this.props.data.layout == "Page" ? template = <Content data={this.props.data}/> : null
this.props.data.layout == "Blog" ? template = <Content data={this.props.data}/> : null
this.props.data.layout == "BlogSection" ? template = <Content data={this.props.data}/> : null
 
if(this.props.data.type == "404"){
  template = <Error404/>
}


    return template;
  }

  render() {

    var template = this.getTemplate()
      return(
        <html>
          <Head data={this.props.data}/> 
          <body>
            
            {template}

            <script dangerouslySetInnerHTML={{__html: "\n\n\n window._sharedData = "+JSON.stringify(this.props.data)}} />
            <script src="/assets/min.js" defer="defer"></script>

          </body>
        </html>
        )

 }


}



module.exports=Main;