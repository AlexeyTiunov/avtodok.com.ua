var ReactDOM = require('react-dom');
var React = require('react');
import {Sidebar} from './sidebar.js'

export class Extends extends React.Component
{
    constructor(props)
    {
        super(props);
         this.state={parentMod:Object,renderIN:<div></div>};
  
        
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
     componentDidUpdate(prevProps, prevState)
     {
         alert("updated");
     }
    
}