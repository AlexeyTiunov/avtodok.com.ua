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
      Action:{functions:{defineColumnName,defineTd},params:["Номер Заказа",<Action _td/>,]},      
      BrandCode:{functions:{parceDate,defineColumnClass,defineColumnName},params:["","hidden-xs","Дата"]},      
      BrandName:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Бренд/Код","",<Common_td />,]}, 
      ItemCode:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Код","hidden-xs",<Common_td />,]}, 
      Caption:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Наименование","hidden-xs",<Common_td />,]}, 
      DeliveryDays:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Срок","hidden-xs",<Common_td />,]},
      Quantity:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Количество","hidden-xs",<Common_td/>,]},
      RegionFullName:{functions:{},params:[]}, 
      RegionShortName:{functions:{},params:[]},
      RegionCode: {functions:{},params:[]},
      RegionCorrectName:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Регион","hidden-xs",<Region_td/>,],addNew:true},  
      PercentSupp:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Надежность","hidden-xs",<Percentsupp_td/>,]},
      Weight:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Вес","hidden-xs",<Common_td/>,]}, 
      Currency:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Валюта","hidden-xs",<Common_td/>,]}, 
      ReturnableParts:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Возврат","hidden-xs",<Common_td/>,]}, 
      Price:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Цена","hidden-xs",<Common_td/>,]}, 
      PriceUSD:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Цена","hidden-xs",<Common_td/>,]}, 
         
        
    }
    
    
    
   return mapObject; 
}

function getRegionName(value,RigionFullNameFunc,RegionShortNameFunc)
{
  var RegionNameMap={
    "1":RigionFullNameFunc,
    "2":RegionShortNameFunc,
    "3":RegionShortNameFunc,
    "4" :RegionShortNameFunc,
    "999" :RegionShortNameFunc,
    "998" :RegionShortNameFunc,
    "997" :RegionShortNameFunc,
    "default": RigionFullNameFunc,
    "defaultName":"Украина",
      
  } 
  var RegionCode=this["RegionCode"].value;
  if (RegionNameMap[RegionCode]) 
  {
    this.value=RegionNameMap[RegionCode].bind(this)();   
  }else
  {
   //this.value=RegionNameMap["default"].bind(this)();
    this.value=RegionNameMap["defaultName"];  
  }
   
  
  //this.value=RigionFullNameFunc.bind(this)(); 
   // this.value=RegionCode; 
}


////////////////////////////////////////////////////////////////

 export class Search_table extends Extends
 {
     
    constructor(props) 
     {  
       
         super(props);         
         this.state.mapArray=[];                     
         
     }
     dataSort(data)
     {   
         if (data.length==1) return;
         for (  var i=0;i<data.length;i++)
         {
             for ( var j=0;j<data.length-i-1;j++)
             {
                 if (Number(data[j].Price)>Number(data[j+1].Price))
                 {
                    helpMas=data[j];
                    data[j]=data[j+1];
                    data[j+1]=helpMas;
                    
                 }
                 
             } 
             
             
         }
         
         
         
     }
     getSearchData()
     {
         var findMySelf=this.findMySelf(this.constructor.name);
         
         var data="ItemCode="+this.state.itemCode+"";
         var Prom=this.makeRequestToRecieveData("POST","/ws/searchItems.php",false,data)
         
         Prom.then(function(responseText){
             
                     handleDT=new handleData(responseText,getMapObject());
                 findMySelf().setState({mapArray:findMySelf().dataSort(handleDT.mapArray)}); 
         })
     }
     
     /////////////////////////////////////
     componentDidUpdate(prevProps, prevState)
     {
         // debugger;
        //this.state.tableBody=[];
       // this.makeDataForRender(this.state.dataRecieved);
       
          
     }
     componentWillUpdate()
     {  
          
     }
     render()
     {
         
         return ()
         
     }
      
     
 }




////////////////////////////////////////////////////////////////





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

export class Action _td extends Extends
{
    constructor(props) 
   {
      super(props);
      this.addToBusket=this.addToBusket.bind(this);
      this.state.inputs=props.inputs;     
      this.state.Quantity=1;
      this.updateQuantity=this.updateQuantity.bind(this);
       
   }
   addToBusket()
   {
       var mas=[];
       for (input in this.state.inputs)
       {
           mas.push(input+"="+this.state.inputs[input]);
       }
       
      var Pro=this.makeRequestToRecieveData("POST","/ws/AddToBusket.php",false,mas.join('&')+"&Quantity="+this.state.Quantity);
      
      Pro.then(function(data){
        alert(data) ; 
        obj=window.objectReg["Basket_icon"];
        obj.setState({getBasketPartsQuantity:true});  
      }
     );
      
      
      
    
       
       
   }
   updateQuantity(event)
   {
      if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
             // Разрешаем выделение: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
             // Разрешаем клавиши навигации: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39) ||
            event.keyCode == 190
            ) 
            {
                
                var quantity=event.target.value;
               this.setState({Quantity:quantity})  
            }
       else
       {
            if ((event.keyCode < 48 || event.keyCode > 90) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault();
              
                            
            } else
            {
                 var quantity=event.target.value;              
                 this.setState({Quantity:quantity})      
            }
            
           
       }
       
   }
   render()
   {
       return (
                 <div className="btn-group btn-group-xs">
                  <input type="number" name="number" onChange={this.updateQuantity} data-toggle="tooltip"  className="btn btn-default visible-lg-block" value={this.state.Quantity} style={{width:"3em"}} />
                  <Select_quantity typeOfSelectNumber={"int"} parentComponent={this}/>
                  <a href="#" onClick={this.addToBusket} data-toggle="tooltip" title="Edit"  className="btn btn-default"><i className="gi gi-shopping_cart"></i></a>
                 </div>
       
       
               )
       
       
       
   } 
    
    
    
} 

export class Select_quantity extends Extends
{
    constructor(props) 
    {
       super(props);
       if (this.props.typeOfSelectNumber )
       this.state.typeOfSelectNumber=this.props.typeOfSelectNumber;
       else
       this.state.typeOfSelectNumber="int";
       
        if (this.props.maxNumber )
        this.state.maxNumber=this.props.maxNumber;
        else
        this.state.maxNumber=25;
        
        if (this.props.parentComponent)
        {
            this.state.parentComponent=this.props.parentComponent;  
            this.updateQuantity=this.updateQuantity.bind(this.state.parentComponent)   
        }         
        else
        {
         this.state.parentComponent=this;      
        }
          
          
      
       
    }
    updateQuantity(event)
    {
        try
        {
         this.updateQuantity(event);    
        } catch(e)
        {
            
        }
        
        
    }
     makeOptions()
    {
       if (this.state.typeOfSelectNumber=="int")
       {  
         var mas=[];
        for (var i=1;i<=this.state.maxNumber;i++)
        {
          mas.push(<option key={i} value={i}>{i}</option>);  
            
        }
        
        this.state.optionsMas=mas;
       }else if (this.state.typeOfSelectNumber=="float")
       {
           var mas=[];
           for (var i=0.5;i<=this.state.maxNumber;)
           {
              mas.push(<option key={i} value={i}>{i}</option>);  
              i+=0.5;
           }
        
          this.state.optionsMas=mas;
           
       } else
       {
            var mas=[];
          for (var i=1;i<=this.state.maxNumber;i++)
          {
           mas.push(<option key={i} value={i}>{i}</option>);  
            
         }
        
           this.state.optionsMas=mas;
           
       }
        
        
    }
   render()
   {
       this.makeOptions();
       return(      
            <select className="visible-xs-block" onChange={this.updateQuantity}>
                {this.state.optionsMas.map(function(item){
                    
                     return item;
                    
                })}
            </select>
           
           
       )
   }
    
}