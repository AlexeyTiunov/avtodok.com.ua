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
      ORDER_ID:{functions:{defineColumnName,defineTd},params:["Номер Заказа",<Orderid_td/>,]},
      DATE_INSERT:{functions:{parceDate,defineColumnClass,defineColumnName,defineTd},params:["","hidden-xs","Дата",<Common_td />]},
      BRAND:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Бренд","hidden-xs",<Common_td />,]}, 
      REGIONCODE:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Регион","hidden-xs",<Common_td />,]}, 
      ARTICLE:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Номер","hidden-xs",<Common_td />,]}, 
      NAME:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Название","hidden-xs",<Common_td />,]},
      QUANTITY:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Количество","hidden-xs",<Common_td/>,]},
      PRICE:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd},params:[[".","2"],"Цена","hidden-xs",<Common_td />,]}, 
      ORDER_PRICE:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Сумма","hidden-xs",<Common_td />,]},
      ITEMSTATUS:{functions:{},params:[]}, 
      action:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Действие" ," ", <Status_td />,],addNew:true},
      state:{functions:{defineColumnName,defineTd},params:["Состояние",<Action_td />,],addNew:true},
        
        
        
        
        
    }
   return mapObject; 
}





//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 

const ThemeContext = React.createContext("value");  

export class Order_list extends Extends
{
    constructor(props)
    {
        super(props);
        this.state.mapArray=[]; 
    }
    
    getOrderListData()
    {
        var findMySelf=this.findMySelf(this.constructor.name);
         var Prom=this.makeRequestToRecieveData("POST","/ws/order_list.php",false,this.makePostDataFromState())
         
         Prom.then(function(responseText){
             
                     handleDT=new handleData(responseText,getMapObject());
             findMySelf().setState({mapArray:handleDT.mapArray}); 
         })
    }
    
    /////////////////////////////////////
    componentDidUpdate(prevProps, prevState)
    {
        super.componentDidUpdate(prevProps, prevState);
        TablesDatatables.init();
    }
    componentDidMount()
    {
        super.componentDidMount();
        this.getOrderListData();
        //
    }
    render()
    {
        var names=this.state.mapArray.map(function(tr) 
                           {
                               var mas=[];
                             for (th in tr)
                             {
                                if (tr[th].Name)
                                mas.push(<th className={"text-center"+" "+(tr[th].className!=undefined)?tr[th].className:"" }>{tr[th].Name}</th>);
                             } 
                              
                             return mas;
                              
                             //return <th className="text-center">{item.Name}</th> 
                           })[0];  
               const tableHead= (  <thead>
                                    <tr>
                                    {
                                     names  
                                    } 
                                    </tr>
                                </thead> )
                                
                                
                 var rows=this.state.mapArray.map(function(tr) 
                           {
                               var mas=[];
                             for (td in tr)
                             {
                                
                                mas.push(tr[td].TD)
                             } 
                              
                             return mas;
                              
                             //return <th className="text-center">{item.Name}</th> 
                           });
              
                                
                          var i=0;
               const tableBody= rows.map(function(item){                                  
                                  return (  <ThemeContext.Provider value="dark"><tr key={i++}>{item}</tr>  </ThemeContext.Provider>)  
                                   })                  
        
        return (  <div className="block full">
                     <div className="block-title">
                       <div className="table-responsive">
                           <table id="example-datatable" className="table table-vcenter table-condensed table-bordered">
                                {tableHead}                   
                                   <tbody>
                                    {tableBody}                                   
                                  </tbody>
                           
                           </table>
            
                        </div>
                    </div>
                 </div>
              
               )
        
        
    }
    
    
}
export class Orderid_td extends Extends 
{
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
         
     } 
     render()
     {
         return (
          
                  <td className={this.state.proto[this.state.NAME].className+" text-center" }><Link to={"/order_detail/"+this.state.proto[this.state.NAME].fValue}>{this.state.proto[this.state.NAME].fValue}</Link></td>  
          
          
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
                   <td className={this.state.proto[this.state.NAME].className+" text-center" }> {this.state.proto[this.state.NAME].fValue}</td> 
        
        
         
             )   
         
         
     }
    
}

export class Quantity_td extends Extends
{
    
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
      
         
     } 
     render()
     {
       return(
                   <td className={this.state.proto[this.state.NAME].className+" text-center" }>{this.state.proto[this.state.NAME].fValue}</td> 
        
        
         
             )   
         
         
     }
    
}
export class Status_td extends Extends
{
    
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
        this.bClasses={"2":"label label-primary" };
        this.iClasses={"2":"gi gi-remove_2"};
        this.statusNames={"2":"Отказ"};
         
     } 
     render()                                                                      // <td className={"text-center"+" "+this.state.proto.action.className+" "+this.bClasses[this.state.proto.ITEMSTATUS.fValue]} >{this.state.proto.ITEMSTATUS.fValue}</td>  
     {
       return(
                 
                     <td><span className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}><i className={this.iClasses[this.state.proto.ITEMSTATUS.fValue]}></i>{this.statusNames[this.state.proto.ITEMSTATUS.fValue]}</span></td> 
                                       
                   
         
             )   
         
         
     }
    
}  
export class Action_td extends Extends
{
    
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
        this.bClasses=window.configObject["Action_td"].bClasses
        
       // this.bClasses={"2":"label label-primary" };
        this.iClasses={"2":"gi gi-remove_2"};
        this.statusNames={
            "0":"В работе",
            "2":"Отказ",
            "5": "В пути",
        };
         
     } 
     render()                                                                      // <td className={"text-center"+" "+this.state.proto.action.className+" "+this.bClasses[this.state.proto.ITEMSTATUS.fValue]} >{this.state.proto.ITEMSTATUS.fValue}</td>  
     {
       return(
                
                    <td className={this.state.proto.action.className}><span className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}><i className={this.iClasses[this.state.proto.ITEMSTATUS.fValue]}></i>{this.statusNames[this.state.proto.ITEMSTATUS.fValue]}</span></td> 
                   
         
             )   
         
         
     }
    
}              

