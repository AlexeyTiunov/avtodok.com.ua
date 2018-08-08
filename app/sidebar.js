var ReactDOM = require('react-dom');
var React = require('react'); 
import 'jquery'; 
var $=require('jquery'); 
var jQuery=require('jquery');
window.jQuery=jQuery;
var moment=require('moment');
window.moment=moment;
window.$=jQuery;  
var Li= require("./sidebar_li.js");
//var Sidebar_nav =require('./sidebar_nav.js');
import {Sidebar_nav} from './sidebar_nav.js';
import {items as ITEMS }from './sidebar_nav.js';
//import './css/plugins.css'; 
//require('style-loader!css-loader!./css/plugins.css');
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/css/bootstrap.css';
require ('./js/app.js');
   
 
 
  //alert(Sidebar_nav);
  //debugger   


     

export class Sidebar  extends React.Component
{
    constructor(props) 
     {  
       super(props);      
         
         
     } 
     
     
     render()
     {
       return  (<div id="page-container" className="header-fixed-top sidebar-partial sidebar-visible-lg sidebar-visible-lg sidebar-no-animations">            
                 <div id="sidebar" className="alert alert-success">        
                  <div className='sidebar-scroll'> 
                     <div id='sidebar-content'>  
                        <Sidebar_nav items={ITEMS}/>      
           
                     </div>  
                    </div>
                   </div>
                   <header className="navbar navbar-inverse navbar-fixed-top "> </header> 
                  </div>
                  
                  
                  
                  )     
         
       
         
     }
    
    
}
 debugger
ReactDOM.render(
<Sidebar/>,
 document.getElementById("app")

)
 debugger
 //require ('./js/app.js');     