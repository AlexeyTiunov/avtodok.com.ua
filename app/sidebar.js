var ReactDOM = require('react-dom');
var React = require('react'); 
import $ from 'jquery';
import jQuery from 'jquery';
//var $=require('jquery'); 
//var jQuery=require('jquery');
window.jQuery=jQuery;
var moment=require('moment');
window.moment=moment;
window.$=jQuery;  
var Li= require("./sidebar_li.js");
//var Sidebar_nav =require('./sidebar_nav.js');
import {Sidebar_nav} from './sidebar_nav.js';
import {items as ITEMS }from './sidebar_nav.js';
import {Sidebar_header} from './sidebar_header.js'
import {Page_content} from './page_content.js'
import {Sidebar_userinfo} from './sidebar_userinfo.js'
import {Sidebar_brand} from './sidebar_brand.js'
import {Extends} from './main_component.js'

 
import './css/plugins.css'; 

require ('bootstrap/dist/js/bootstrap.js');
require ('bootstrap/dist/css/bootstrap.css');

require ('./js/app.js');
//require('style-loader!css-loader!./css/plugins.css');         
 
 
  //alert(Sidebar_nav);
  //debugger   

/*class Extends extends React.Component
{
    constructor(props)
    {
        super(props);
         this.state={parentMod:this};
        
    }
    
}  */
     

export class Sidebar  extends Extends
{
    constructor(props) 
     {  
       super(props);      
         
         
     } 
     
     componentDidMount()
     {
       
     }
     childUpdate(obj)
     {
         try
         {
           obj.setState({renderIN:<h1>success</h1>})
           obj.render();  
         }catch (e)
         {
             
         }
        
     }
     
     render()
     {
       return  (<div id="page-container" className="header-fixed-top sidebar-partial sidebar-visible-lg sidebar-visible-lg sidebar-no-animations">            
                 <div id="sidebar" className="">        
                  <div className='sidebar-scroll'> 
                     <div id='sidebar-content' className='sidebar-content'>
                        <Sidebar_brand/>    
                        <Sidebar_userinfo/> 
                        <Sidebar_nav items={ITEMS}/>      
           
                     </div>  
                    </div>
                   </div>
                   <div id="main-container"> 
                     <Sidebar_header parentMod={this}/>
                     <Page_content parentMod={this}/>
                   </div>
                  </div>
                  
                  
                  
                  )     
         
       
         
     }
    
    
}
 debugger
 var body=document.getElementsByTagName("body"); 
ReactDOM.render(
<Sidebar/>,
   body[0]

)
 debugger
 //require ('./js/app.js');     