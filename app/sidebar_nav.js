var ReactDOM = require('react-dom');
var React = require('react');
var Li= require("./sidebar_li.js");
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js' 
//debugger


  /*
      props.items;
  */  
export var items = [
  {name:"Головна", href:"/", className:"active gi gi-file sidebar-nav-icon" ,inner:null}, 
  {name:"Пошук", href:"/search", className:"active gi gi-table sidebar-nav-icon" ,inner:null},   
  {name:"Особистий кабінет", href:"#", className:"sidebar-nav-menu",
    inner:[  {name:"Замовлення", href:"/order_list", className:"gi gi-table sidebar-nav-icon" ,inner:null},
             {name:"Баланс", href:"/balance",className:"gi gi-database_plus sidebar-nav-icon" ,inner:null},
             {name:"Історія позицій", href:"/history",className:"gi gi-show_thumbnails_with_lines sidebar-nav-icon" ,inner:null},
             {name:"Декларації", href:"/shdocs",className:"gi gi-message_out sidebar-nav-icon" ,inner:null},
             {name:"Повернення", href:"/retdocs",className:"gi gi-unshare sidebar-nav-icon" ,inner:null},             
             {name:"Готовий до видачі", href:"/shipments",className:"si si-dropbox sidebar-nav-icon" ,inner:null}, 
           ]
  },
  
  {name:"Каталоги",href:null,className:"sidebar-header" ,inner:null},
  {name:"Каталог автозапчастин",href:"/catalogs_auto", className:"gi gi-cars sidebar-nav-icon" ,inner:null},
  {name:"Каталог аксесуарів",href:"/catalog/BROTHER/XDK171", className:"gi gi-beach_umbrella sidebar-nav-icon" ,inner:null},
  {name:"Корисне",href:null, className:"" ,inner:null},
  {name:"Про нас",href:"", className:"fa fa-users sidebar-nav-icon" ,inner:null},
  {name:"Умови роботи",href:"", className:"gi gi-file sidebar-nav-icon" ,inner:null},
  {name:"Скачати прайс",href:"", className:"gi gi-download_alt sidebar-nav-icon" ,inner:null}, 
  {name:"Контакти",href:"/contacts", className:"gi gi-phone_alt sidebar-nav-icon" ,inner:null},  
  
  
  
 
 
 ];
   
     
     
     
     
  
   

export class Sidebar_nav  extends Extends
{
    constructor(props) 
     {  
       super(props);
       this.state={items:this.props.items};      
       this.onclick=this.onclick.bind(this);
       this.onclickNoAuthCheck=this.onclickNoAuthCheck.bind(this);	   
       this.ontouchstart=this.ontouchstart.bind(this);
       this.stPropagation=this.stPropagation.bind(this);   
     } 
	 ontouchstart(e)
	 {
		
		 e.stopPropagation();
	 }
	 stPropagation(e)
	 {
		 e.stopPropagation();
	 }	 
     onclick_old()
     {
		 if (window.isMobile) this.sideBarToogle();
		 this.activateProgressBar();
		if (!this.checkAuth())
		{
			//e.preventDefault();
			this.showAuthWindow();
			this.deActivateProgressBar();
		}
		 
		 //this.deActivateProgressBar();
		 this.scrollToTop();
		 
         getWorkPage().setState({renderIN:"",defineRoutes:true});
		 
     }
	 onclick(e)
	 {
		 var func = function (moduleWebPath,component)
		 {
			 var target=e.target;
			  if (window.isMobile) this.sideBarToogle();
		   this.activateProgressBar();
		   if (!this.checkAuth())
		  {
			//e.preventDefault();co
			this.showAuthWindow();
			this.deActivateProgressBar();
		  }
		 
		 //this.deActivateProgressBar();
		   this.scrollToTop();
		 
          //getWorkPage().setState({renderIN:"",defineRoutes:true});
		  //var routingSwitch=getWorkPage().defineRoute(moduleWebPath,component);
		   getWorkPage().setState({componentSwitch:component,componentSwitchPath:moduleWebPath});
			 //getWorkPage().setState({renderIN:routingSwitch,defineRoutes:true});
		 }
		 func=func.bind(this);
		 
		 this.loadNeedModule(e.currentTarget.pathname,func);
		 
		 //e.stopPropagation();
		 //return;
	 }
	 onclickNoAuthCheck()
	 {
		  if (window.isMobile) this.sideBarToogle();		
		 //this.deActivateProgressBar();
		 this.scrollToTop();
		 this.activateProgressBar();
         getWorkPage().setState({renderIN:"",defineRoutes:true});
	 }
     componentDidCatch(error, info) 
     {
         console.log(error);
         
     }
     
     render()
     {
       // debugger  
         var findMySelf=this.findMySelf(this.constructor.name); 
         var self=this;
        
        const b=this.state.items.map(
             function(item){
                if (item.hasOwnProperty("href") && item.href!=null)
                 {
                       if (item.inner instanceof Array )
                     {
                         
                        let gg= item.inner.map(function(item_inner){
                                           
                                           return <li><Link onClick={self.onclick} to={item_inner.href}><i className={item_inner.className}></i><font><font>{item_inner.name}</font></font></Link></li>;
                                           
                         });
                         
                                     
                         
                         const c = (<li>
                                     <a onClick={self.onclick} href={item.href} className={item.className+" open"}><i className="fa fa-angle-left sidebar-nav-indicator"></i><i className='gi gi-home sidebar-nav-icon'></i><font><font>{item.name}</font></font></a>
                                    <ul style={{"display":"block"}}>
                                        
                                       {gg}
                                    
                                    
                                     </ul>
                                     </li>
                                    );
                         return c;
                         
                     }
                     {
                         const ff=  ( <li>
                               <Link onClickCapture={self.onclickNoAuthCheck} onMouseOutCapture={self.stPropagation} onMouseOverCapture={self.stPropagation} onTouchStartCapture={self.stPropagation} onTouchMoveCapture={self.stPropagation} to={item.href}  ><i className={item.className}></i><font><font>{item.name}</font></font></Link>
                              </li> ) 
                      return ff;        
                          
                         
                     }

                 } else
                 {
                    const f=   (<li class="sidebar-header">
                                                                <span className="sidebar-header-title"><font><font>{item.name}</font></font></span>
                                </li>) 
                    return f;        
                     
                     
                     
                     
                 }
             
                 
             } 
           )
        
        
       const text=(         
           
             //for (var item in this.state.items)
         
            this.state.items.map(
             function(item)
             {
                 if (item.hasOwnProperty("href") && item.href!=null)
                 {
                     var ff=false ;
                     if (item.inner instanceof Array && ff==true)
                     {
                          return  (<li>
                                     <a href={item.href} className={item.className}><i className='gi gi-home sidebar-nav-icon'></i><font><font>{item.name}</font></font></a>
                                    <ul>
                                   {
                                       item.inner.map(function(item_iner){
                                                return  ( <li>
                                                         <a href={item_iner.href} className={item_iner.className}><i className='gi gi-home sidebar-nav-icon'></i><font><font>{item_iner.name}</font></font></a>
                                                          </li>);  
                                                          
                                                                                               
                                           
                                           
                                       })
                                       
                                       
                                   }  
                                 
                                   </ul>
                                  </li>); 
                         
                         
                     } else
                     {
                         
                     
                               <li>
                               <a  className={item.className}><i className='gi gi-home sidebar-nav-icon'></i><font><font>{item.name}</font></font></a>
                              </li>
                     }  
                     
                 }
                 else
                 {
                     
                 }
                 
             } )
           
             
             
             
                    
         
        
        
        
         
         );  
       return <ul className="sidebar-nav"> {b} </ul>     
     }
    
    
}
//module.exports = Sidebar_nav;