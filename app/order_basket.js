var ReactDOM = require('react-dom');
var React = require('react'); 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js'



export class Order_basket extends Extends
{
    constructor(props)
    {
        super(props);
        this.state=this.props.match;
        
        
    }
    orderBusket()
    {
        
         var Prom=this.makeRequestToRecieveData("POST","/ws/autodoc/process_order.php",false,this.makePostDataFromState())
         
         Prom.then(function(data){
             
             alert(data);
             
         })
    }
    render()
    {   this.orderBusket();
        return (
                 <div class="block full">
          
                    {this.props.match.params.DELIVERY}
                 </div>
              
               ) 
        
        
        
    }
    
    
}



