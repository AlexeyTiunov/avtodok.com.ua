var ReactDOM = require('react-dom');
var React = require('react');
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';   

export class Sidebar_brand extends React.Component
{
   constructor(props) 
     {  
       super(props);      
         
         
     }
     
     
     render ()
     {
       /*  return (  <a href="index.html" class="sidebar-brand">
                          <i class="gi gi-car"></i><strong><font><font>AVTODOK</font></font></strong><>
                   </a>
         
         
         
                  )  */
         return (
                   <Link to={"/"} className="sidebar-brand">
                         <i class="gi gi-car"></i><strong><font><font>Автодок-Партс</font></font></strong>
                     </Link>
           
            
             
                )         
         
         
     }
     
      
}    