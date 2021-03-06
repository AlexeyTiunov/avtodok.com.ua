var ReactDOM = require('react-dom');
var React = require('react'); 
import 'jquery'; 
import {Extends} from './main_component.js'
var jQuery=require('jquery'); 
window.$=jQuery;
var App=require('./js/app.js'); 
//import {App} from './js/app.js';
import {Search_table} from './search_content.js'
import {Search_table_v2} from './search_content_v2.js'
 
import {Basket_items} from './basket_items.js' 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';   
import {Progress_bar} from './progress_bar.js'
import {Currency_rates} from './currency_rates.js'
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
         /*console.log(e);
         App.App.sidebar('toggle-sidebar');
         $("body").css("width","100%");*/
		 this.sideBarToogle();
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
       // debugger;  
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
        
        //if (window.isMobile)
        //{   
	       var itemCode=event.target.value; 
            getItemCodeFunc=function()
            {
              return  itemCode; 
            }
            
                
          //  getWorkPage().setState({renderIN:<Search_table_v2/>,defineRoutes:false},
          if (!window.objectReg['Search_table_v2'])
          {
            getWorkPage().setState({renderIN:React.createElement(Search_table_v2),defineRoutes:false}, 
             function(){
                
                var itemCode=getItemCodeFunc(); 
                 
                if (itemCode=="") 
                  {
                   event.preventDefault();
                   return;  
                  }
                  window.objectReg['Search_table_v2'].setState({itemCode:itemCode,shouldComponentUpdate:false,brandCode:undefined,showBrandList:false})
            }
             );   
          } else
          {
               try
               {
                window.objectReg['Search_table_v2'].xhr.abort();   
               } catch(e)
               {
                   Console.log(e)
               }
               window.objectReg['Search_table_v2'].setState({itemCode:getItemCodeFunc(),shouldComponentUpdate:false,brandCode:undefined,showBrandList:false});
          }
             
           
            
        //}
       /* else
        {
            
        
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
         
         
         
        }*/
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
       this.onclick=this.onclick.bind(this); 
         
     } 
     onclick_old()
     {
		 this.activateProgressBar();
         getWorkPage().setState({renderIN:"",defineRoutes:true});
     }
	 onclick(e)
	 {
		 var func=function (moduleWebPath,component)
		 {
			getWorkPage().setState({componentSwitch:component,componentSwitchPath:moduleWebPath});
		 }
		 func=func.bind(this);
		 
		 this.loadNeedModule(e.currentTarget.pathname,func);
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
       
        var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/AddToBusket.php","getBasketPartsQuantity=getBasketPartsQuantity");       
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

 export class Preloader_icon extends Extends
 {
	 constructor(props)
	 {
		 super(props);
		 this.state.preloader=false;
	 }
	 ////////////////////////////////////////
	 componentDidMount()
	 {
		 super.componentDidMount();
	 }
	 componentDidUpdate()
	 {
		 super.componentDidUpdate();
	 }
	 render()
	 {
		 if (this.state.preloader)
		 {
			 return (<div>
			          <img style={{"width":"40px","height":"40px"}}src='/app/img/preloader_m.gif'/>
			         </div>
                      )
		 }else
		 {
			return ( 
			          <Basket_icon/>
					 
			       )
		 }
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
	           <div className="row">
			    <div className="col-xs-12"> 
                  <Sidebar_control_button parentMod={this.props.parentMod}/>
                  <Search_form/>
				   <ul class="nav navbar-nav-custom">
                        <li>
                            <span className="label"><font ><font ><br/> +38 (044) 545 70 17</font></font></span>
                        </li>
                        <li>
                            <span className="label"><font ><font><br/> +38 (097) 025 11 10</font></font></span>
                        </li>
                  </ul>
				  <ul className="nav navbar-nav-custom pull-right">
                     <li>
					    <Currency_rates/>
					 </li>
					 <li>
                       <Preloader_icon/> 
                      
                     </li> 
					 
				  </ul>  
				</div>
				<div className="col-xs-12"> 
                  <Progress_bar/>				  
				 </div> 
				 
                </div>
               </header>
             )
         
         
         
         
     }
    
    
    
    
    
}