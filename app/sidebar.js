var ReactDOM = require('react-dom');
var React = require('react'); 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import $ from 'jquery';
import jQuery from 'jquery';
//var $=require('jquery'); 
//var jQuery=require('jquery');
window.jQuery=jQuery;
window.$=jQuery;  
var moment=require('moment');
window.moment=moment;

var Li= require("./sidebar_li.js");
//var Sidebar_nav =require('./sidebar_nav.js');
import {Sidebar_nav} from './sidebar_nav.js';
import {items as ITEMS }from './sidebar_nav.js';
import {Sidebar_header} from './sidebar_header.js'
import {Page_content} from './page_content.js'
import {Sidebar_userinfo} from './sidebar_userinfo.js'
import {Sidebar_usersettings} from './sidebar_userinfo.js'
import {Sidebar_usersettings_modal} from './sidebar_userinfo.js' 
import {Sidebar_brand} from './sidebar_brand.js'
import {Extends} from './main_component.js'
import {Search_table} from './search_content.js'

import {Basket_items_forModal} from './basket_items.js' 
import {Basket} from './basket_items.js' 
import {Order_basket} from './order_basket.js'   
import {Order_list} from './order_list.js'  
import {Info_message} from './info_message.js'         
import {Auth} from './auth.js' 
 
import './css/plugins.css'; 

require ('bootstrap/dist/js/bootstrap.js');
require ('bootstrap/dist/css/bootstrap.min.css');

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
       return (<Router>
                <div id="page-container" className="header-fixed-top sidebar-partial sidebar-visible-lg sidebar-visible-lg sidebar-no-animations">            
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
                      <div id='link'></div>
                     <Sidebar_header parentMod={this}/>
                     <Page_content parentMod={this}/>
                   </div>
                                      
                    <Basket_items_forModal/>  
                    <Info_message/>  
                    <Auth />         
                </div>  
               
              </Router> 
                  
                  
                  )     
         
       
         
     }
    
    
}
 //debugger
 var body=document.getElementsByTagName("body"); 
   ReactDOM.render(      
     <Sidebar/>     
     ,
   body[0]

)

 ReactDOM.render(
      <a></a>,
   document.getElementById("link")

)

window.getWorkPage= function ()
{
    return window.objectReg['Page_content'];
    
}
 //debugger
 //require ('./js/app.js');     