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
      Action:{functions:{defineColumnName,defineTd},params:["Действие",<Action_td/>,],addNew:true},      
      BrandCode:{functions:{},params:[]},      
      BrandName:{functions:{defineColumnName,defineColumnClass,defineTd},params:[" ","",<Brandname_td />,]}, 
      ItemCode:{functions:{},params:[]}, 
      Caption:{functions:{},params:[]}, 
      DeliveryDays:{functions:{formatNumber},params:[[".","0"]]},
      Quantity:{functions:{},params:[]},
      RegionFullName:{functions:{},params:[]}, 
      RegionShortName:{functions:{},params:[]},
      RegionCode: {functions:{},params:[]},
      RegionCorrectName:{functions:{defineColumnName,defineColumnClass,defineTd},params:[" ","",<Region_td/>,],addNew:true},  
      PercentSupp:{functions:{},params:[]},
      Weight:{functions:{},params:[]}, 
      Currency:{functions:{},params:[]}, 
      ReturnableParts:{functions:{},params:[]}, 
      Price:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd},params:[[".","2"],"Цена","",<Common_td/>,]}, 
      PriceUSD:{functions:{},params:[]}, 
         
        
    }
    
    
    
   return mapObject; 
}



////////////////////////////////////////////////////////////////

 export class Search_table_v2 extends Extends
 {
     
    constructor(props) 
     {  
       
         super(props);         
         this.state.mapArray=[];
         this.state.numberOfrow=5;   
         this.state.page=1;
         this.state.dataQuantity=1; 
         
         
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
         if (this.state.itemCode=="" || this.state.itemCode==null || this.state.itemCode==undefined) return;
         var findMySelf=this.findMySelf(this.constructor.name);
         
         var data="ItemCode="+this.state.itemCode+"";
         var Prom=this.makeRequestToRecieveData("POST","/ws/searchItems.php",false,data)
        
         Prom.then(function(responseText){
             
                     handleDT=new handleData(responseText,getMapObject(),"ITEMS");
                     findMySelf().dataSort(handleDT.mapArray)
                     findMySelf().setState({mapArray:handleDT.mapArray,shouldComponentUpdate:true}); 
         })
     }
     
     /////////////////////////////////////
      shouldComponentUpdate(nextProps, nextState)
      {
          if (!nextState.shouldComponentUpdate && this.state.itemCode!=nextState.itemCode )
          {
              this.state.itemCode=nextState.itemCode;
              this.getSearchData();   
          } 
          
          
          return this.state.shouldComponentUpdate;
      }
     
     componentDidUpdate(prevProps, prevState)
     {
         super.componentDidUpdate(prevProps, prevState); 
         // debugger;
        //this.state.tableBody=[];
       // this.makeDataForRender(this.state.dataRecieved);
       
          
     }
     componentWillUpdate()
     {  
          
     }
     render()
     {
         if (this.state.mapArray.length==0)
         {
            return(<div></div>); 
         }
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
                                  return (  <tr key={i++}>{item}</tr> )  
                                   })                                                        
                            
         return (
                   <div class="block">
                     <div className="table-responsive">
                       <Pagination quantity={this.state.dataQuantity}/>
                          <table className="table table-vcenter"> 
                                {tableHead}
                                
                                <tbody>
                                    {tableBody}                                   
                                  </tbody>
                                              
                       
                       
                         </table>
                        <Pagination quantity={this.state.dataQuantity}/> 
                     </div>
                   </div>
          
           
                 )
         
     }
      
     
 }




////////////////////////////////////////////////////////////////

export class Pagination extends Extends
{
   constructor(props) 
   {
      super(props);
     // this.state={quantity:this.props.quantity}; 
      this.click=this.click.bind(this) 
       
   }
   click(e)
   {
      Uobject=window.objectReg['Search_table'];  
       Uobject.setState({page:Number(e.target.innerHTML)});  
       
       
   }
   
   render(){         
   var masLi=[];
         for (i=0;i<this.props.quantity;i++)
         {
             masLi.push( <li onClick={this.click} className="page-item"><a className="page-link" href="#">{i+1}</a></li>);
         }
        return ( <ul className="pagination">
        
               {masLi.map(function(item){return item;})}
        
              </ul> );
   
   
   
   
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
export class Brandname_td extends Extends
{
    
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
         
     } 
     render()
     {
       return(
                   <td className={this.state.proto[this.state.NAME].className+" text-center" }> 
                   {this.state.proto[this.state.NAME].fValue}<br/>
                   {this.state.proto["ItemCode"].fValue}
                   
                   </td> 
        
        
         
             )   
         
         
     }
    
}
export class Percentsupp_td extends Extends
{
    
    constructor(props) 
     {  
        super(props);
        this.state=this.props.regionProps;
         
     } 
   
     wrapperA()
     {
              var wrapperClassName={
                "0-40":"label label-danger",
                "40-70" :"label label-warning",
                "70-90": "label label-info",
                "90-100":"label label-success",
                "default":"label label-danger",
                  
              }
      try
      {        
        var value=this.state.proto["PercentSupp"].fValue;
      }catch(e)
      {
        var value="100";  
      }        
      return(<a href='#' className={this.getRangeObjectValue(wrapperClassName,value)}>{value+"%"}</a >);
      
        
     }
     render()
     {
       return(
                  <div>
                  {this.wrapperA()}
                  </div>
         
             )   
         
         
     }
    
}
export class Region_td extends Extends
{
    
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
         
     }
      getRegionName()
     {
          var regionRangeObjectValue={
              "0-1":this.state.proto["RegionFullName"].fValue,
              "2-4":this.state.proto["RegionShortName"].fValue,
              "980-999":this.state.proto["RegionShortName"].fValue, 
              "default": "Украина",
              
          };
          
          var RegionCode=this.state.proto["RegionCode"].fValue;
         return this.getRangeObjectValue(regionRangeObjectValue,RegionCode);
     }
     
     ///////////////////////////////////////////// 
     render()
     {
       return(
                   <td className={this.state.proto["RegionCorrectName"].className+" text-center" }> 
                   {this.getRegionName()}<br/>                  
                   {this.state.proto["DeliveryDays"].fValue}<br/> 
                    <Percentsupp_td regionProps={this.props}/>                     
                   </td> 
        
        
         
             )   
         
         
     }
    
}

export class Action_td extends Extends
{
    constructor(props) 
   {
      super(props);
      this.state=this.props; 
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
            <td className={this.state.proto["Action"].className+" text-center" }> 
                 <div className="btn-group btn-group-xs">
                  <input type="number" name="number" onChange={this.updateQuantity} data-toggle="tooltip"  className="btn btn-default visible-lg-block" value={this.state.Quantity} style={{width:"3em"}} />
                  <Select_quantity typeOfSelectNumber={"int"} parentComponent={this}/>
                  <a href="#" onClick={this.addToBusket} data-toggle="tooltip" title="Edit"  className="btn btn-default"><i className="gi gi-shopping_cart"></i></a>
                 </div>
            </td>
       
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