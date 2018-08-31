var ReactDOM = require('react-dom');
var React = require('react');
import {Extends} from './main_component.js' 
import {Search_table} from './search_content.js'
import {Basket} from './basket_items.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import {Order_basket} from './order_basket.js'
import {Order_list} from './order_list.js'

export class Page_content  extends Extends
{
   constructor(props) 
     {  
       super(props);      
       //this.state={renderIN:""};
       //this.state={parentMod:props.parentMod}; 
       this.state.defineRoutes=true; 
         
     }
      componentDidMount()
     {
         super.componentDidMount();
      // super.childUpdate(this,<h1>success</h1>);   
     // this.state.parentMod.childUpdate(this);
      
       super.makeRequest("POST","/ws/auth.php",false,"LOGIN=Alex");
       
     }
     componentDidUpdate(prevProps, prevState)
     {
        super.componentDidUpdate(prevProps, prevState);
     }
     
     defineRoutes(defRoutes)
     {
        if (defRoutes)
        { 
         return ( 
                       <Switch>
                
                         <Route path="/basket" component={Basket} />
                         <Route path="/order_basket/:DELIVERY/:PAYS" component={Order_basket} />
                         <Route path="/order_list" component={Order_list} />                 
                     </Switch>
                  
                )
        }else
        {
           return (<div></div>) 
            
            
        }
     }
     
     
     render ()
     {
         const routes=this.defineRoutes(this.state.defineRoutes);
         return (<div id="page-content" style={ {'min-height': '977px'} } > 
                 
                   {routes}
                   {this.state.renderIN}
         
                </div> )
         
         
     }
     
      
}    