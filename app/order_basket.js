var ReactDOM = require('react-dom');
var React = require('react'); 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js'
import {Order_detail} from './order_detail.js' 
import {handleData} from './data_convert.js'



export class Order_basket extends Extends
{
    constructor(props)
    {
        super(props);
        this.state=this.props.match;
		this.state.id=0;
        
        
    }
    orderBusket()
    {
        
         var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/autodoc/process_order.php",this.makePostDataFromState())
         var busket=function(responseText)
		 {
           handleOrders=new handleData(responseText,undefined,"ORDERS");
		   handleOrderNum=new handleData(responseText,undefined,"NUM_ORDERS");
		   this.setState({mapArray:handleOrders.mapArray,ordersNum:handleOrderNum.mapArray});
		   
         }.bind(this)
		 
         Prom.then(busket);
		 
    }
	//////////////////////////////////////
	componentDidUpdate()
	{
		this.deActivateProgressBar();
	}
	componentDidMount()
	{
		this.orderBusket();
	}
    render()
    {   
	    var madeOrders=[];
		try
		{
			
		
		var idS=this.state.mapArray.map
		  (function(item)
		    {
			  return item.ORDER.ID
		    }
		   
		  )
		   madeOrders=idS.map(function(item)
		  {
			  return (<Order_detail id={item}/>)
		  })
		}catch(e)
		{
			
		}		
        return (
                 <div class="block full">
					{madeOrders}
                 </div>
              
               ) 
        
        
        
    }
    
    
}



