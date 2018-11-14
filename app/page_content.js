var ReactDOM = require('react-dom');
var React = require('react');
import {Extends} from './main_component.js' 
import {Search_table} from './search_content.js'
import {Basket} from './basket_items.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import {Order_basket} from './order_basket.js'
import {Order_list} from './order_list.js'
import {Order_detail} from './order_detail.js'  
import {Sidebar_usersettings} from './sidebar_userinfo.js'
import {Search_table_v2} from './search_content_v2.js'
import {Start_page} from './start_page.js'
import {Balance} from './balance.js' 
import {Shipments} from './shipment_readydellivery.js'
import {History} from './itemcodes_history.js'
import {Shiping_docs} from './shipingdocs.js'
import {Shiping_detail} from './shiping_detail.js'
import {Shipingdoc_detail} from './shipingdoc_detail.js'
import {Contacts} from './contacts.js'
import {Catalogs_auto} from './catalogs_auto.js'

export class Page_content  extends Extends
{
   constructor(props) 
     {  
       super(props);      
       //this.state={renderIN:""};
       //this.state={parentMod:props.parentMod}; 
       this.state.defineRoutes=true; 
	   this.touchMove=this.touchMove.bind(this) 
         
     }
	 
	 touchMove(e)
	 {
		 var x = e.touches[0].clientX;
       var y = e.touches[0].clientY;
	   alert(x);
	   
	 }
	 ////////////////////////////
      componentDidMount()
     {
         super.componentDidMount();
      // super.childUpdate(this,<h1>success</h1>);   
     // this.state.parentMod.childUpdate(this);
      
      // super.makeRequest("POST","/ws/auth.php",false,"LOGIN=Alex");
       
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
                         <Route exact path="/" component={Start_page} />
                          <Route path="/balance" component={Balance} /> 
						  <Route path="/history" component={History} />
                          <Route path="/shdocs" component={Shiping_docs} /> 						  
                          <Route path="/shipments" component={Shipments} />  						  
                         <Route path="/basket" component={Basket} />
                         <Route path="/order_basket/:DELIVERY/:PAYS" component={Order_basket} />
                         <Route path="/order_list" component={Order_list} /> 
                         <Route path="/order_detail/:id" component={Order_detail} /> 
						 <Route path="/shiping_detail/:id" component={Shiping_detail} />
                         <Route path="/shipingdoc_detail/:id" component={Shipingdoc_detail} /> 						 
                         <Route path="/user_info" component={Sidebar_usersettings} />
                         <Route path="/search/:id?" component={Search_table_v2} /> 
						 <Route path="/avtodok.com.ua/search/:id?" component={Search_table_v2} /> 
						 <Route path="/contacts" component={Contacts} />
						 <Route path="/catalogs" component={Catalogs_auto} />
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
         return (<div id="page-content"  style={ {'min-height': '977px'} } > 
                 
                   {routes}
                   {this.state.renderIN}
         
                </div> )
         
         
     }
     
      
}    