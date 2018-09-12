var ReactDOM = require('react-dom');
var React = require('react'); 
import 'jquery'; 
import {Extends} from './main_component.js'
var jQuery=require('jquery'); 
window.$=jQuery;
var App=require('./js/app.js'); 
//import {App} from './js/app.js';
import {Search_table} from './search_content.js'
 
import {Basket_items} from './basket_items.js' 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';   
 //debugger;  


class Sidebar_control_button extends Extends
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

class Search_form extends Extends     
{
     constructor(props) 
     {  
       super(props); 
        this.state={parentMod:Object,
                     renderIN:<div></div>,
                     dataRecieved:null,
         
                     };     
       this.keyup=this.keyup.bind(this);  
        debugger;  
     } 
     
     keyup(event)
     {  
       //  alert(this.state.dataRecieved);
       /*  if (event.keyCode!=13)
         {
             // if (event.target.value=="") return;
             event.preventDefault();
             return;
         } */
        // Uobject=window.objectReg['Page_content'];
         getWorkPage().setState({renderIN:<Search_table/>,defineRoutes:false});
         
         var itemCode=event.target.value;
         if (itemCode=="") 
         {
           event.preventDefault();
           return;  
         }
         var data="ItemCode="+itemCode+"";
        
         var Prom=this.makeRequestToRecieveData("POST","/ws/searchItems.php",false,data)
         Prom.then(
         (responseText)=>{window.objectReg['Search_table'].setState({dataRecieved:responseText})}
         );
         
         
         
         ;
         // alert(this.state.dataRecieved);
         
         
        /* debugger;
         console.log(event);
        if (window.objectReg['Page_content'])
        {
           // Uobject=window.objectReg['Page_content'];
          //  Uobject.setState({renderIN:<h1>success</h1>});
         //   Uobject.render(); 
            
        }else
        {
            // alert("error");  
             
        } 
        // alert("error");
        // alert("keypressed");*/
     }
     
   //////////////////////////////////////////   
     componentDidUpdate(prevProps, prevState)
     {
          
     }
     
     
     render()  {
     return (  <form  onSubmit={ (e)=>e.preventDefault() }  onReset={(e)=>e.preventDefault()} className="navbar-form-custom" autocomplete="off" role="Поиск">
                        <div className="form-group">
                            <input  onKeyUp={this.keyup} onReset={(e)=>e.preventDefault()}   type="text" id="top-search" name="top-search" className="form-control" placeholder="Введите номер запчасти.."/>
                        </div>
                    </form>
     
     
     )}
    
}
 export class Basket_icon extends Extends
 {
     
     constructor(props) 
     {  
       super(props); 
       
       this.state.partsQuantity=0;
       this.state.getBasketPartsQuantity=false;      
         
         
     } 
     onclick()
     {
         getWorkPage().setState({renderIN:"",defineRoutes:true});
     }
     getBasketPartsQuantity()
     {
        var findMySelf=this.findMySelf(this.constructor.name);
       // thisO=findMySelf();
       // if  (thisO==undefined) return;
        updateMyself= function(responseText)
        {
           this.setState({partsQuantity:responseText}); 
        }.bind(this);
       
        var Prom=this.makeRequestToRecieveData("POST","/ws/AddToBusket.php",false,"getBasketPartsQuantity=getBasketPartsQuantity");       
       Prom.then(
         (responseText)=>{findMySelf().setState({partsQuantity:responseText,shouldComponentUpdate:true})}
         ); 
      // Prom.then(updateMyself); 
         
     }
      getBasketPartsQuantityNUC()
     {
        var findMySelf=this.findMySelf(this.constructor.name);
       // thisO=findMySelf();
       // if  (thisO==undefined) return;
        updateMyself= function(responseText)
        {
           this.setState({partsQuantity:responseText}); 
        }.bind(this);
       
        var Prom=this.makeRequestToRecieveData("POST","/ws/AddToBusket.php",false,"getBasketPartsQuantity=getBasketPartsQuantity");       
       Prom.then(
         (responseText)=>{findMySelf().state.partsQuantity=responseText}
         ); 
      // Prom.then(updateMyself); 
         
     }
     ////////////////////////////////////////////
     shouldComponentUpdate()
     {
          if (!this.state.shouldComponentUpdate)
          {
              this.getBasketPartsQuantity();   
          } 
          
          
          return this.state.shouldComponentUpdate;
     }
     componentDidMount() 
     {
        super.componentDidMount();
        this.getBasketPartsQuantity();
         
         
     }
     componentDidUpdate(prevProps, prevState)
     {
         super.componentDidUpdate(prevProps, prevState)
          //this.getBasketPartsQuantity();  
         
     }
     render()
     {
         if (this.state.getBasketPartsQuantity===true)
         {
           this.getBasketPartsQuantity();
           this.state.getBasketPartsQuantity=false;  
         }
         //   data-toggle="modal" data-target="#Basket_items"
        return (
               <Link onClick={this.onclick} to="/basket" >
                 <img src="/app/img/placeholders/basket/avatar.png" alt="аватар"/>
                 <span className="label label-primary label-indicator animation-floating">
                   <font><font>{this.state.partsQuantity}</font></font>
                 </span>
               </Link>
         
          
           
            
               ) 
         
         
     }
 }


export class Sidebar_header  extends Extends
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
                 
                 <ul className="nav navbar-nav-custom pull-right">
                    <li>
                       <Basket_icon/> 
                      
                    </li>                 
                 </ul>
      
               </header>
             )
         
         
         
         
     }
    
    
    
    
    
}