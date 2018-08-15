var ReactDOM = require('react-dom');
var React = require('react');
import {Extends} from './main_component.js' 




export class Page_content  extends Extends
{
   constructor(props) 
     {  
       super(props);      
       //this.state={renderIN:""};
       //this.state={parentMod:props.parentMod};  
         
     }
      componentDidMount()
     {
         super.componentDidMount();
      // super.childUpdate(this,<h1>success</h1>);   
     // this.state.parentMod.childUpdate(this);
      
      //  super.makeRequest("POST","/ws/auth.php",false,"LOGIN=Alex");
       
     }
     componentDidUpdate(prevProps, prevState)
     {
        super.componentDidUpdate(prevProps, prevState);
     }
     
     
     render ()
     {
         return (<div id="page-content" style={ {'min-height': '977px'} } > 
         
         
                  {this.state.renderIN}
         
                </div> )
         
         
     }
     
      
}    