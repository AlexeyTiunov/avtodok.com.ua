var ReactDOM = require('react-dom');
var React = require('react');
import {Extends} from './main_component.js' 
import {Search_table} from './search_content.js'
import {Basket} from './basket_items.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import {Order_basket} from './order_basket.js'

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
         return ( <Router>
                       <Switch>
                
                         <Route path="/basket" component={Basket} />
                         <Route path="/order_basket/:DELIVERY/:PAYS" component={Order_basket} />                 
                     </Switch>
                   </Router>
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