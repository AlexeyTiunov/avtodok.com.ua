var ReactDOM = require('react-dom');
var React = require('react'); 
import 'jquery'; 
var jQuery=require('jquery'); 
window.$=jQuery;
var App=require('./js/app.js'); 
//import {App} from './js/app.js';
  


class Sidebar_control_button extends React.Component
{
    constructor(props) 
     {  
       super(props);      
       this.press=this.press.bind(this);
       this.state={parentMod:props.parentMod};  
         
     } 
     
     press (e)
     {
         console.log(e);
         App.App.sidebar('toggle-sidebar');
         $("body").css("width","100%");
     }
    
    
    render()
    {
        return (  
                    <ul className="nav navbar-nav-custom">   
                        {/*<!-- Left Header Navigation --> */ }
                       {/* <!-- Main Sidebar Toggle Button --> */ } 
                        <li>
                            <a href="javascript:void(0)" onClick={this.press}>
                                <i className="fa fa-bars fa-fw"></i>
                            </a>
                        </li>
                        {/*<!-- END Main Sidebar Toggle Button -->*/ } 

                        {/* <!-- END Left Header Navigation -->*/} 
                    </ul>
                   
        
        
        
               )
        
    }
}

class Search_form extends React.Component     
{
     constructor(props) 
     {  
       super(props);      
       this.keypress=this.keypress.bind(this);  
         
     } 
     
     keypress()
     {
         alert("keypressed");
     }
     
     
     
     
     render()  {
     return (  <form  className="navbar-form-custom" role="Поиск">
                        <div className="form-group">
                            <input  onKeyDown={this.keypress}   type="text" id="top-search" name="top-search" className="form-control" placeholder="Введите номер запчасти.."/>
                        </div>
                    </form>
     
     
     )}
    
}



export class Sidebar_header  extends React.Component
{
    constructor(props) 
     {  
       super(props); 
       
       this.state={parentMod:props.parentMod};       
         
         
     } 
     componentDidMount()
     {
      this.state.parentMod.childUpdate(this);
     }
     
     
     render()
     {
      return ( <header className="navbar navbar-inverse navbar-fixed-top ">
                 <Sidebar_control_button parentMod={this.props.parentMod}/>
                 <Search_form/>
      
               </header>
             )
         
         
         
         
     }
    
    
    
    
    
}