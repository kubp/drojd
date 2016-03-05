import React from "react";
class PageHead extends React.Component {
constructor(props){
    super(props);
   console.log(this.props.data)
}

  render() {
    return ( 
      <head>
          <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>{this.props.data.title}</title>
    <meta name="description" content={this.props.data.description}/>
  <link rel="stylesheet" type="text/css" href="/main.css"/>

 
    <meta property="og:type" content="article" />
    <meta property="og:title" content={this.props.data.title} />
    <meta property="og:description" content={this.props.data.description}/>
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:description" content={this.props.data.description}/>
    <meta name="twitter:title" content={this.props.data.title}/>

       </head>
    	)
  }

 
}

module.exports=PageHead;