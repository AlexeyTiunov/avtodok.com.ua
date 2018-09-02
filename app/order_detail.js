var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'
import {TablesDatatables} from './js/pages/tablesDatatables.js'

function getMapObject()
{
   
    dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
   var parceDate=dataConvert.parceDate;
   
  
    
    
    var mapObject=
    {
      ORDER_ID:{functions:{defineColumnName,defineTd},params:["Номер Заказа",<Common_td/>,]},
      RegionCode:{functions:{defineColumnName,defineTd},params:["Регион",<Common_td />]},
      ORDER_STATUS_NAME:{functions:{defineColumnName,defineTd},params:["Статус",<Common_td />,]}, 
      PRICE:{functions:{defineColumnName,defineTd},params:["Регион",<Common_td />,]}, 
      CURRENCY:{functions:{defineColumnName,defineTd},params:["Номер",<Common_td />,]}, 
     /* NAME:{functions:{defineColumnName,defineTd},params:["Название",<Common_td />,]},
      QUANTITY:{functions:{defineColumnName,defineTd},params:["Количество",<Common_td/>,]},
      PRICE:{functions:{defineColumnName,defineTd},params:["Цена",<Common_td />,]}, 
      ORDER_PRICE:{functions:{defineColumnName,defineTd},params:["Сумма",<Common_td />,]},
      ITEMSTATUS:{functions:{},params:[]}, 
      action:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Действие","hidden-xs",<Status_td />,],addNew:true},
      state:{functions:{defineColumnName,defineTd},params:["Состояние",<Action_td />,],addNew:true},*/
        
        
        
        
        
    }
   return mapObject; 
}

export class Order_detail extends Extends
{
    constructor(props)
    {
        super(props);
        this.state=this.props.match.params;
        this.state.mapArray=[];
    }
    
    getOrderDetail(id)
    {
        var findMySelf=this.findMySelf(this.constructor.name); 
         var Prom=this.makeRequestToRecieveData("POST","/ws/order_detail.php",false,"ID="+this.props.match.params.id)
         
         Prom.then(function(responseText){
             
             handleDT=new handleData(responseText,getMapObject());
             findMySelf().setState({mapArray:handleDT.mapArray});
             
         })
        
    }
    
    ///////////////////////////////////
    
    componentDidMount()
    {
        super.componentDidMount();
        this.getOrderDetail(this.props.match.params.id);
    }
    
    render ()
    {
            return (<div className="block full">
          
                      {this.props.match.params.id}
                    </div>
                  )
    }       
    
}
export class Common_td extends Extends
{
    
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
         
     } 
     render()
     {
       return(
                   <td className="text-center">{this.state.proto[this.state.NAME].fValue}</td> 
        
        
         
             )   
         
         
     }
    
}