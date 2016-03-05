import React from "react";
import axios from "axios";
import marked from "marked";

import Post from "./Post";
import BlogList from "./BlogList";
import Page from "./Page";
import Error404 from "./error404";
import Menu from "./Menu"
import PageHead from "./PageHead"
import PostHead from "./PostHead"
import BlogHead from "./BlogHead"

class Main extends React.Component {
constructor(props){
    super(props);

}





  render() {
      return(
        <html>
        
           {this.props.data.page ? <PageHead data={this.props.data.page}/> : null}
           {this.props.data.blogsection ? <BlogHead data={this.props.data.blogsection}/> : null}
          {this.props.data.post ? <PostHead data={this.props.data.post}/> : null}

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