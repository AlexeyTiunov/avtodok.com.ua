var ReactDOM = require('react-dom');
var React = require('react');
var Li= require("./sidebar_li.js");
//var Sidebar_nav =require('./sidebar_nav.js');
import {Sidebar_nav} from './sidebar_nav.js';
import {items as ITEMS }from './sidebar_nav.js';
//import './css/plugins.css'; 
//require('style-loader!css-loader!./css/plugins.css');
 
 
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
       return   <div id="sidebar"> 
       
                  <div class="sidebar-scroll"> 
                     <div id='sidebar-content'>  
                        <Sidebar_nav items={ITEMS}/>      
           
                     </div>  
                    </div>
                   </div>      
         
       
         
     }
    
    
}
 debugger
ReactDOM.render(
<Sidebar/>,
 document.getElementById("app")

)
 debugger