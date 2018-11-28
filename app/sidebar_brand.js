var ReactDOM = require('react-dom');
var React = require('react');
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';   

export class Sidebar_brand extends Extends
{
   constructor(props) 
     {  
       super(props);      
       this.onclick=this.onclick.bind(this);  
         
     }
	 onclick()
     {
		 if (window.isMobile) this.sideBarToogle();
		
		 
		 //this.deActivateProgressBar();
		 this.scrollToTop();		 
         getWorkPage().setState({renderIN:"",defineRoutes:true});
		 
     }
     startMouseEnterEvent()
	 {
		 var thisElement=ReactDOM.findDOMNode(this);
		 
		function startEvent()
		{
			if (document.createEvent)
			{
				var event=document.createEvent("Event");
				event.target=thisElement;
				event.initEvent("mouseenter", false, true);
				 this.dispatchEvent(event);
			}else
			{			
			var event = new Event("click" ,{bubbles: true, cancelable: false});
            this.dispatchEvent(event);
			}
		}
		startEvent=startEvent.bind(thisElement);
		startEvent();
		
	 }
     
     render ()
     {
        /* return (  <a href="/" class="sidebar-brand">
                          <i class="gi gi-car"></i><strong><font><font>AVTODOK</font></font></strong>
                   </a>
         
         
         
                  ) */  
         return (
                   <Link onClick={this.onclick} to={"/"} className="sidebar-brand" style={{"fontSize":"13px"}}>
                         <i className="gi gi-car"></i><strong><font><font>Автодок-Партс-Kиїв</font></font></strong>
                     </Link>
 
            
             
                )        
         
         
     }
     
      
}    