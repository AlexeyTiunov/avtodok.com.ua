var ReactDOM = require('react-dom');
var React = require('react');
var Li= require("./sidebar_li.js");
//var Sidebar_nav =require('./sidebar_nav.js');
import {Sidebar_nav} from './sidebar_nav.js';
import {items as ITEMS }from './sidebar_nav.js'; 
 
 
  alert(Sidebar_nav);
  debugger   


     

export class Sidebar  extends React.Component
{
    constructor(props) 
     {  
       super(props);      
         
         
     } 
     
     
     render()
     {
       return   <div id='sidebar'>  
                  <Sidebar_nav items={ITEMS}/>      
           
                     </div>        
         
       
         
     }
    
    
}
 debugger
ReactDOM.render(
<Sidebar/>,
 document.getElementById("app")

)
 debugger