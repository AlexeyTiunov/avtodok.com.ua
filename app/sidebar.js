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
//import {Sidebar_nav} from './sidebar_nav.js';
var Sidebar_nav=window.Sidebar_nav;
var ITEMS=window.ITEMS;
//import {items as ITEMS }from './sidebar_nav.js';
import {Sidebar_header} from './sidebar_header.js'
import {Page_content} from './page_content.js'
import {Sidebar_userinfo} from './sidebar_userinfo.js'
import {Sidebar_usersettings} from './sidebar_userinfo.js'
import {Sidebar_usersettings_modal} from './sidebar_userinfo.js' 
import {Sidebar_brand} from './sidebar_brand.js'
import {Extends} from './main_component.js'
import {Search_table} from './search_content.js'
import {Search_table_v2} from './search_content_v2.js' 

import {Basket_items_forModal} from './basket_items.js' 
//import {Basket} from './basket_items.js'
import {Order_basket} from './order_basket.js'   
//import {Order_list} from './order_list.js'  
import {Info_message} from './info_message.js'         
import {Auth} from './auth.js'
import {Balance} from './balance.js' 
import {Pay_notification} from './balance.js'
import {Progress_bar} from './progress_bar.js'
import {Check} from './check.js'
import {Regions} from './regions_info.js'
import {Brands} from './brands_info.js'

 
import './css/plugins.css'; 
//var context= require.context("bundle-loader!./",false,/\.js$/)
/*var Sidebar_header=require.ensure(['./sidebar_header.js'],function(){
	 Sidebar_header=require('./sidebar_header.js');
	
})*/

//require ('bootstrap/dist/js/bootstrap.js');
//require ('bootstrap/dist/css/bootstrap.min.css');
var App=require('./js/app.js'); 

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
     
function afterRender()
{
	$('[data-toggle="tooltip"]').tooltip();
}
export class Sidebar  extends Extends
{
    constructor(props) 
     {  
       super(props);      
       this.touchMove=this.touchMove.bind(this);
	   this.touchMoveXCoords=[];
	   this.touchMoveYCoords=[];
	   this.isSideBarOpened=false;
         
     } 
	 getWindowWidth(){
        return window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;
    }
	 sideBarToogle()
	 {   
		  this.isSideBarOpened=!this.isSideBarOpened;		  
		  App.App.sidebar('toggle-sidebar');
          $("body").css("width","100%");
		  /*if (this.isSideBarOpened==true)
		  {
			 var sidebar_brand=window.objectReg["Sidebar_brand"];
			 sidebar_brand.startMouseEnterEvent();
		  }*/
	 }
	 touchMove(e)
	 {
	   /* if (e.target.id=="sidebar") 
		{
			e.preventDefault();
			return;
		}*/
				  
	   var x = e.touches[0].clientX;
       var y = e.touches[0].clientY;
	   this.touchMoveXCoords.push(Number(x));
	   this.touchMoveYCoords.push(Number(y));
	   var ln=3
	   var lnY=30
	   if (this.touchMoveXCoords.length==ln)
	   {
		   
		   if (Number(this.touchMoveXCoords[0])>Number(this.touchMoveXCoords[ln-1]) 
			&& Math.abs(Number(this.touchMoveYCoords[0])-Number(this.touchMoveYCoords[ln-1]))<lnY   
		   && this.isSideBarOpened==true)
	       {
			/*   this.isSideBarOpened=false;
		   //alert(this.touchMoveXCoords[1])
		    App.App.sidebar('toggle-sidebar');
            $("body").css("width","100%");*/
			this.sideBarToogle();
		   
	       }
		   else if(Number(this.touchMoveXCoords[0])<Number(this.touchMoveXCoords[ln-1]) 
			&& Math.abs(Number(this.touchMoveYCoords[0])-Number(this.touchMoveYCoords[ln-1]))<lnY  
		   && this.isSideBarOpened==false)
		   {
			  /* this.isSideBarOpened=true;
			    App.App.sidebar('toggle-sidebar');
              $("body").css("width","100%");*/
			  //this.sideBarToogle();
		   }
		  this.touchMoveXCoords=[];
          this.touchMoveYCoords=[];		  
		 
	   }else
	   {
		   
	   }
	   
	   
	   
	 }
	 touchDenyMove(e)
	 {
		 e.stopPropagation();
		 return;
	 }
     /////////////////////////////////////
     componentDidMount()
     {
       super.componentDidMount();
	   this.isSideBarOpened=this.getWindowWidth()>991;
	   this.deActivateProgressBar();
	   App.App.init();
     }
	 componentDidUpdate()
	 {
		 super.componentDidUpdate();
		 
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
	            
                <div id="page-container" onTouchMove={this.touchMove} className="header-fixed-top sidebar-partial sidebar-visible-lg sidebar-visible-lg sidebar-no-animations">            
                  <Progress_bar/>				  
				  
				  <div id="sidebar" onTouchMove={this.touchDenyMove} className="">        
                    <div className='sidebar-scroll'> 
                      <div id='sidebar-content' className='sidebar-content'>                         
                        <Sidebar_brand/>    
                        <Sidebar_userinfo isMobile={true}/>                         
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
                    <Pay_notification/>
                     <Regions />					
					 
                </div>  
               
              </Router> 
                  
                  
                  )     
         
       
         
     }
    
    
}  // out <Brands />
 //debugger
 var body=document.getElementsByTagName("body");  
 ReactDOM.render(      
     <Sidebar/>     
     ,
   document.getElementById("app"),
   afterRender )
 function loadSidebar()
 {
	ReactDOM.render
      (  <Brands /> ,
        document.getElementById("service"),
		loadSidebar
       )
	   


 }
 
 
  

 ReactDOM.render(
      <a></a>,
   document.getElementById("link")

)

window.getWorkPage= function ()
{
    return window.objectReg['Page_content'];
    
}

/*var aCollection=document.getElementsByTagName("a")
for (var a in aCollection)
{
	aCollection[a].removeEventListener('mouseenter mouseleave');
}*/



 //debugger
 //require ('./js/app.js');     