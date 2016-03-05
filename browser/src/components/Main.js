import React from "react";
import axios from "axios";
import marked from "marked";

import Post from "./Post";
import BlogList from "./BlogList";
import Page from "./Page";
import Error404 from "./error404";
import Menu from "./Menu"

class Main extends React.Component {
constructor(props){
    super(props);

}

makeTitle(value){
 
  if(typeof value.blogsection != "undefined"){ return value.blogsection.title }
 if(typeof value.post != "undefined"){ return value.post.title }
 if(typeof value.page != "undefined"){ return value.page.title }
  return "";
}

makeDescription(value){

  if(typeof value.blogsection != "undefined"){ return value.blogsection.description }
 if(typeof value.post != "undefined"){ return value.post.description }
 if(typeof value.page != "undefined"){ return value.page.description }
  return "";
}



  render() {
      return(
        <html>
          <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
            <link rel="stylesheet" type="text/css" href="/main.css"/>
            <title>{this.makeTitle(this.props.data)}</title>
            <meta name="description" content={this.makeDescription(this.props.data)}/>

          </head>
          <body>
            <header>
              {this.props.data.menu ? <Menu menu={this.props.data.menu}/> : null}
              

              <div className="clear"></div>
              </header>
               
                  
              <main>


               <div className="wrapper">
                  <Content data={this.props.data}/>
                  
           
            
              </div>
              </main>

          <footer>Achieved with <a href="cms">Drojd CMS</a></footer>
          <script dangerouslySetInnerHTML={{__html: "window._sharedData = "+JSON.stringify(this.props.data)}} />
          <script src="http://localhost:8080/js/app.js" defer="defer"></script>
             <script src="https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.1/SmoothScroll.js"></script>
          </body>
        </html>
        )

 }

 
}


 //<script src="/min.js"></script>

class Content extends React.Component {
constructor(props){
    super(props);
}


  render() {
       
       if(this.props.data.type=="page"){
      return ( <Page data={this.props.data}/> )
    }else if(this.props.data.type=="post"){
      return ( <Post data={this.props.data}/> )

    }else if(this.props.data.type=="blog_section"){
      return ( <BlogList data={this.props.data}/> )

    }else{
        return (<Error404/>)
    }
  }

 

}


module.exports=Main;