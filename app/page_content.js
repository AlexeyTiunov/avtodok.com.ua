var ReactDOM = require('react-dom');
var React = require('react');
import {Extends} from './main_component.js' 
/*import {Search_table} from './search_content.js'
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
import {Return_docs} from './return_docs.js'
import {Item_info} from './item_info.js'*/
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Start_page} from './start_page.js'

export class Page_content  extends Extends
{
   constructor(props) 
     {  
       super(props);      
       //this.state={renderIN:""};
       //this.state={parentMod:props.parentMod}; 
       this.state.defineRoutes=true; 
	   this.touchMove=this.touchMove.bind(this) 
	   this.state.componentSwitch=null;
	   this.state.componentSwitchPath=null;
	   this.routesArray={};
	   this.previousLocationPath="";
         
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
		$('[data-toggle="tooltip"]').tooltip();
     }
	 
     defineRoute_old(path,component)
	 {
		 
		 return (	 
                       <Switch>
                         <Route exact path={path} component={component} />
		                </Switch>
		         )
	 }
	 
	 defineRoute(moduleWebPath,component)
	 {
		 
		 var isSwitchModuleIn=false;
		 for (var item in this.routesArray)
		 {
			 if (item==moduleWebPath)
			 {
				 this.routesArray[item]= component; // v
				 isSwitchModuleIn=true;
			 }
			 
		 }
		 if (!isSwitchModuleIn)    this.routesArray[moduleWebPath]= component;
		 var routeArray=[];
		 for (var item in this.routesArray)
		 {
			 routeArray.push(<Route exact path={item} component={this.routesArray[item]} />);
			 
		 }
		 var locationPath= location.pathname;
         this.previousLocationPath=locationPath;
		 
		 return (	 
                       <Switch>
					   {routeArray}
		                </Switch>
		         )
	 }
	 
	 defineDefaultRoute()
	 {
		  return (	 
                      <Switch>
                         <Route exact path="/" component={Start_page} />
					  </Switch>  	 
		         )
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
						 <Route path="/catalogs_auto" component={Catalogs_auto} />
						 <Route path="/retdocs" component={Return_docs} />
						 <Route path="/catalog/:brandname?/:itemcode?/:itemanalogcode?" component={Item_info} />
                     </Switch>
                  
                )
        }else
        {
           return (<div></div>) 
            
            
        }
     }
     
     
     render ()
     {
        // const routes=this.defineRoutes(this.state.defineRoutes);
		var routes="";
		if (this.state.defineRoutes)
		{	
		  if (this.state.componentSwitch==null || this.state.componentSwitchPath==null)
		  {
			 var locationPath= location.pathname;
             //this.previousLocationPath=locationPath;			 
			 var func=function(moduleWebPath,component)
			 {
				 if ( component==null)
				 this.setState({componentSwitch:Start_page,componentSwitchPath:moduleWebPath});
                 else			  
				 this.setState({componentSwitch:component,componentSwitchPath:moduleWebPath});
			 }
			 func=func.bind(this);
			 this.loadNeedModule(locationPath,func);
			 
			 //routes=this.defineDefaultRoute();
		  }else
		  {
			  var locationPath= location.pathname;
			  if (this.previousLocationPath==locationPath)
			  {
				routes=this.defineRoute(this.state.componentSwitchPath,this.state.componentSwitch)  
			  }else
			  {
				  this.previousLocationPath=locationPath;
				  var func=function(moduleWebPath,component)
			       {
				   if ( component==null)
				   this.setState({componentSwitch:Start_page,componentSwitchPath:moduleWebPath});
                   else			  
				   this.setState({componentSwitch:component,componentSwitchPath:moduleWebPath});
			       }
			       func=func.bind(this);
			       this.loadNeedModule(locationPath,func);
				  
			  }
			   
		  }
		}else
		{
			routes=this.defineRoutes(this.state.defineRoutes);
		}
		
          return (<div id="page-content"  style={ {'min-height': '977px'} } > 
                 
                   {routes}
                   {this.state.renderIN}
         
                </div> )
         
         
     }
     
      
}    