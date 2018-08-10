var ReactDOM = require('react-dom');
var React = require('react');
import {Sidebar} from './sidebar.js'

class Extends extends React.Component
{
    constructor(props)
    {
        super(props);
         this.state={parentMod:new Sidebar,renderIN:<div></div>};
  
        
    }
    
    childUpdate(obj,renderIN)
     {
         try
         {
           obj.setState({renderIN:renderIN})
           obj.render();  
         }catch (e)
         {
             
         }
        
     }
    
}


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
      this.state.parentMod.childUpdate(this);
     }
     
     
     render ()
     {
         return (<div id="page-content" style={ {'min-height': '977px'} } > 
         
         
                  {this.state.renderIN}
         
                </div> )
         
         
     }
     
      
}    