import React from "react";
import axios from "axios";
import marked from "marked";

import Post from "./Post";
import BlogList from "./BlogList";
import Page from "./Page";
import Error404 from "./error404";
import Menu from "./Menu"
import Head from "./Head"
import config from "../../config.js"

class Main extends React.Component {
constructor(props){
    super(props);

}


  render() {
      return(
        <html>
          {this.props.data ? <Head data={this.props.data}/> : null}
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
            <script src={config.script} defer="defer"></script>
            
            {config.ga!=""?
            <div><script dangerouslySetInnerHTML={{__html: " ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;ga('create','"+config.ga+"','auto');ga('send','pageview');"}}/>
            <script src="https://www.google-analytics.com/analytics.js" async defer/></div>
            : null}

            <script src="https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.1/SmoothScroll.js"></script>
          </body>
        </html>
        )

 }

 
}



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