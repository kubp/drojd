import React from "react";
class PageHead extends React.Component {
constructor(props){
    super(props);

}

  render() {
    return ( 
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>{this.props.data.title}</title>
        <meta name="description" content={this.props.data.description}/>
        <link rel="stylesheet" type="text/css" href="/assets/style.css"/>

        {this.props.data.image ? <meta property="og:image" content={this.props.data.image}/>:null}
        {this.props.data.image ? <meta property="twitter:image" content={this.props.data.image}/>: null}
        
        <meta property="og:title" content={this.props.data.title} />
        <meta property="og:description" content={this.props.data.description}/>
     
        <meta name="twitter:description" content={this.props.data.description}/>
        <meta name="twitter:title" content={this.props.data.title}/>

       </head>
    	)
  }

 
}

module.exports=PageHead;