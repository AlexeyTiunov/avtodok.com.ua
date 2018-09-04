var ReactDOM = require('react-dom');
var React = require('react');
var Li= require("./sidebar_li.js");
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//debugger


  /*
      props.items;
  */  
export var items = [
  {name:"Головна", href:"#", className:"active" ,inner:null},  
  {name:"Особистий кабінет", href:"#", className:"sidebar-nav-menu",
    inner:[  {name:"Замовлення", href:"/order_list", className:"gi gi-table sidebar-nav-icon" ,inner:null},
             {name:"Баланс", href:"cabinet_cash.html",className:"gi gi-database_plus sidebar-nav-icon" ,inner:null},
             {name:"Історія позицій", href:"cabinet_cash.html",className:"gi gi-show_thumbnails_with_lines sidebar-nav-icon" ,inner:null},
             {name:"Декларації", href:"cabinet_history.html",className:"gi gi-message_out sidebar-nav-icon" ,inner:null},
             {name:"Повернення", href:"cabinet_np.html",className:"gi gi-unshare sidebar-nav-icon" ,inner:null},             
             {name:"Готовий до видачі", href:"cabinet_to_delivery.html",className:"si si-dropbox sidebar-nav-icon" ,inner:null}, 
           ]
  },
  
  {name:"Каталоги", href:"#",className:"" ,inner:null},
  {name:"Каталог автозапчастин",href:"#", className:"" ,inner:null},
  {name:"Каталог аксесуарів",href:"#", className:"" ,inner:null},
  {name:"Корисне",href:null, className:"" ,inner:null},
  {name:"Про нас",href:"", className:"" ,inner:null},
  
  
  
 
 
 ];
   
     
     
     
     
  
   

export class Sidebar_nav  extends React.Component
{
    constructor(props) 
     {  
       super(props);
       this.state={items:this.props.items};      
         
         
     } 
     componentDidCatch(error, info) 
     {
         console.log(error);
         
     }
     
     render()
     {
       // debugger  
        
        
        const b=this.state.items.map(
             function(item){
                if (item.hasOwnProperty("href") && item.href!=null)
                 {
                       if (item.inner instanceof Array )
                     {
                         
                        let gg= item.inner.map(function(item_inner){
                                           
                                           return <li><Link to={item_inner.href}><i className={item_inner.className}></i><font><font>{item_inner.name}</font></font></Link></li>;
                                           
                         });
                         
                                     
                         
                         const c = (<li>
                                     <a href={item.href} className={item.className}><i className="fa fa-angle-left sidebar-nav-indicator"></i><i className='gi gi-home sidebar-nav-icon'></i><font><font>{item.name}</font></font></a>
                                    <ul>
                                        
                                       {gg}
                                    
                                    
                                     </ul>
                                     </li>
                                    );
                         return c;
                         
                     }
                     {
                         const ff=  ( <li>
                               <a  href={item.href}  className={item.className}><i className='gi gi-home sidebar-nav-icon'></i><font><font>{item.name}</font></font></a>
                              </li> ) 
                      return ff;        
                          
                         
                     }
                     
                     
                   
                     
                 } else
                 {
                     const f=  ( <li>
                               <a  className={item.className}><i className='gi gi-home sidebar-nav-icon'></i><font><font>{item.name}</font></font></a>
                              </li> ) 
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