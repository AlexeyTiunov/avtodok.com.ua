var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'
import {TablesDatatables} from './js/pages/tablesDatatables.js'
import {Search_content_header} from './search_content_header.js'

function getMapObject()
{
   
    dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
    var defineTh=dataConvert.defineTh; 
   var parceDate=dataConvert.parceDate;
   
  
    
    
   
    var mapObject=
    {
      Action:{functions:{defineColumnName,defineTd,defineTh},params:["Действие",<Action_td/>,[<Common_th/>,"Действие/Заказать"]],addNew:true},      
      BrandCode:{functions:{},params:[]},      
      BrandName:{functions:{defineColumnName,defineColumnClass,defineTd,defineTh},params:[" ","",<Brandname_td />,[<Common_th/>,"Бренд/Код/Наименование"]]}, 
      ItemCode:{functions:{},params:[]}, 
      Caption:{functions:{},params:[]}, 
      DeliveryDays:{functions:{formatNumber},params:[[".","0"]]},
      Quantity:{functions:{},params:[]},
      RegionFullName:{functions:{},params:[]}, 
      RegionShortName:{functions:{},params:[]},
      RegionCode: {functions:{},params:[]},
      RegionCorrectName:{functions:{defineColumnName,defineColumnClass,defineTd,defineTh},params:[" ","",<Region_td/>,[<Common_th/>,"Регион/Дни"]],addNew:true},  
      PercentSupp:{functions:{},params:[]},
      Weight:{functions:{},params:[]}, 
      Currency:{functions:{},params:[]}, 
      ReturnableParts:{functions:{},params:[]}, 
      Price:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd,defineTh},params:[[".","2"],"Цена","",<Common_td/>,[<Common_th/>,"Цена/Валюта"]]}, 
      PriceUSD:{functions:{},params:[]}, 
         
        
    }
    
    
    
   return mapObject; 
}



////////////////////////////////////////////////////////////////
  var unickKey=0;
 export const ComContext = React.createContext(null);  
  export class Search_table_brandheader extends Extends
  {
      constructor(props)
      {
          super(props);
          this.state.brandInfo=this.props.brandInfo;
          this.state.itemCode=this.props.itemCode;
      } 
      renderBrandInfo()
      {
          var mas=[];
        for (var item in  this.state.brandInfo) 
        {
           mas.push(React.createElement(Brand_links,{brandCode:item,
                                                     brandName:this.state.brandInfo[item],
                                                     itemCode:this.state.itemCode
                                                      })) 
        }
        return mas; 
          
      }
      
      render()
      {
        var mas=this.renderBrandInfo();  
        return(
               <div className="row">
                
                   <div className="col-sm-12" key={unickKey++}>
                 {
                    mas.map(function(item){
                        
                        return (<div className="col-sm-3" key={unickKey++} >{item}</div>)
                        
                    }) 
                 }
                  </div>
                
               </div>
              );  
          
          
      }
  }
  
  export class Brand_links extends Extends
  {
       constructor(props)
      {
          super(props);
          this.state.brandCode=this.props.brandCode;
          this.state.brandName=this.props.brandName;
          this.state.itemCode=this.props.itemCode;
          this.state.searchTableComponent;
          this.onclick=this.onclick.bind(this);
      } 
      onclick()
      {
        if (this.state.searchTableComponent==null || this.state.searchTableComponent==undefined) return;
         try
               {
                this.state.searchTableComponent.xhr.abort(); 
                this.setCookie("PHPSESSID","");  
               } catch(e)
               {
                   Console.log(e)
               }
         this.state.searchTableComponent.setState({itemCode:this.state.itemCode,brandCode:this.state.brandCode,shouldComponentUpdate:false});
          
      }
       render()
      {
          
        return(
                <ComContext.Consumer>
                {
                  function (mainComp){
                    this.state.searchTableComponent=mainComp;   
                  return(  <div>
                      <a key={unickKey++} onClick={this.onclick}>{this.state.brandName}</a>
                    </div> ) 
                  }.bind(this)  
                } 
                 
                </ComContext.Consumer>
              );  
          
          
      }
      
  }

 export class Search_table_v2 extends Extends
 {
     
    constructor(props) 
     {  
       
         super(props);         
         this.state.mapArray=[];
         this.state.analogInfo=[];
         this.state.mapArrayBrand=[];
         this.state.numberOfrow=5;   
         this.state.page=1;
         this.state.dataQuantity=1;
         this.state.numberOfrow=5;
         this.state.page=1;
         this.state.dataQuantity=1;
         this.state.showAnalogs=false;
       if (this.props.match)
       {          
         if ("params" in this.props.match)
         {
             if  (this.props.match.params.id!=null && this.props.match.params.id!=undefined)
             {
                   this.state.itemCode=this.props.match.params.id;
             }
         }
       }  
         
         
         
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
    async dataSortAsync(data)
     {
         if (data.length==1) return data;
         for (  var i=0;i<data.length;i++)
         {
             for ( var j=0;j<data.length-i-1;j++)
             {
                 if (Number(data[j].Price.fValue)>Number(data[j+1].Price.fValue))
                 {
                    helpMas=data[j];
                    data[j]=data[j+1];
                    data[j+1]=helpMas;
                    
                 }
                 
             } 
             
             
         }
         
        return data; 
     }
     getAnalogsAsync(itemCode,brandCode)
     {  
         if (itemCode== undefined || brandCode==undefined || itemCode==null || brandCode==null  )  return;
         var data="ItemCode="+itemCode+"&BrandCode="+brandCode;
            var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/searchItemsAnalogs.php",data);
            
      var getAnalogs= function (responseText)
         { 
           handleDT=new handleData(responseText,getMapObject());
           for (var i=0;i<handleDT.mapArray.length;i++)
           {
             this.state.analogInfo.push(handleDT.mapArray[i]);  
           }
                                        
         }
        getAnalogs=getAnalogs.bind(this); 
       return  Prom.then(function(responseText)
         {  
             getAnalogs.responseText=responseText; 
            return getAnalogs;  
         });
         
     }
     getSearchData()
     {
         if (this.state.itemCode=="" || this.state.itemCode==null || this.state.itemCode==undefined) return;
         var findMySelf=this.findMySelf(this.constructor.name);
         var data="ItemCode="+this.state.itemCode+"";
         if (this.state.brandCode==undefined || this.state.brandCode==null )
         {
            
         } else
         {
             data+="&BrandCode="+this.state.brandCode; 
             this.getAnalogsAsync(this.state.itemCode,this.state.brandCode).then(
                function (getAnalogs)
                {
                  var responseText=getAnalogs.responseText;
                  getAnalogs(responseText);
                }
             
             )
         }
         
         
         var Prom=this.makeRequestToRecieveDataAsync("POST","/ws/searchItems.php",data)
        
         Prom.then(function(responseText){
             
                     handleBR= new  handleData(responseText,undefined,"BRANDS");             
                     handleDT=new handleData(responseText,getMapObject(),"ITEMS");  
                     findMySelf().dataSortAsync(handleDT.mapArray).then( function(mapArray){
                         
                         findMySelf().setState({ mapArray:mapArray,shouldComponentUpdate:true});
                     })
                     
                     
                     findMySelf().setState({mapArray:handleDT.mapArray,brandInfo:handleBR.mapArray,shouldComponentUpdate:true});
                     findMySelf().setCookie("PHPSESSID",findMySelf().state.PHPSESSID);
                     
                      
                     
                     
         })
         
     }
     
     /////////////////////////////////////    && this.state.itemCode!=nextState.itemCode
      shouldComponentUpdate(nextProps, nextState)
      {
        
          if (!nextState.shouldComponentUpdate  )
          {
              this.state.itemCode=nextState.itemCode;
              this.state.brandCode=nextState.brandCode; 
              this.getSearchData();   
          } 
          
          
          return nextState.shouldComponentUpdate;
      }
     
     componentDidUpdate(prevProps, prevState)
     {
        // super.componentDidUpdate(prevProps, prevState); 
       
       
         // debugger;
        //this.state.tableBody=[];
       // this.makeDataForRender(this.state.dataRecieved);
       
          
     }
     componentWillUpdate()
     {  
          
     }
     render()
     {
               /* if (this.state.mapArray.length==0)
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
                           })[0]; */
         var tableHead=null;
         var  tableBody=null; 
         //this.state.dataQuantity=1;                 
          try
          {
              
                           
           var names=this.state.mapArray.map(function(tr) {
               
                     var mas=[];
                             for (th in tr)
                             {
                                 if (tr[th].THH)
                                 mas.push(tr[th].THH);  
                             }
                              return mas;    
               
           })[0]                 
                           
          tableHead= (  
                                    <tr>
                                     {
                                       names.map(function(item){
                                         return  item;
                                       })  
                                     } 
                                    </tr>
                             
                     )  
            
                                      
                                   
                          
         var startPagination=(this.state.numberOfrow*this.state.page)-this.state.numberOfrow+1;
         var endPagination=startPagination+this.state.numberOfrow-1;
         this.state.dataQuantity=(this.state.mapArray.length%this.state.numberOfrow>0)?((this.state.mapArray.length-(this.state.mapArray.length%this.state.numberOfrow))/ this.state.numberOfrow)+1:this.state.mapArray.length/this.state.numberOfrow;
                                   
                     
                                
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
             var rowsPagination=[]
             
             for (var i=0;i<rows.length;i++)
             {
                  if (i+1<startPagination || i+1>endPagination) continue;
                  rowsPagination.push(rows[i])
                  
             } 
              
                                
                          //var i=0;
                tableBody= rowsPagination.map(function(item){                                  
                                  return (  <tr key={unickKey++}>{item}</tr> )  
                                   })  
          }catch(e)
          {
             tableHead=null;
             tableBody=null; 
             this.state.dataQuantity=1;
          } 
          
  /////////////////////////////////////////////ANALOGS///////////////////////////////////////////// 
         analogs=(<div className="dShowAnalogs"></div>);
      if (this.state.showAnalogs)
      {   
             try
             {
                 
                               
               var rowsAnalogs=this.state.analogInfo.map(function(tr) 
                               {
                                   var mas=[];
                                 for (td in tr)
                                 {
                                    
                                    mas.push(tr[td].TD)
                                 } 
                                  
                                 return mas;
                                  
                                 //return <th className="text-center">{item.Name}</th> 
                               });
                  tableBodyAnalogs= rowsAnalogs.map(function(item){                                  
                                      return (  <tr key={unickKey++}>{item}</tr> )  
                                       }) 
                    if (tableBodyAnalogs.length>0)
                    {
                         analogs=(<table className="table table-vcenter"> 
                                               <thead>
                                                {tableHead}
                                               </thead> 
                                                <tbody>
                                                    {tableBodyAnalogs}                                   
                                                  </tbody>                                                       
                                       
                                       
                                         </table>)
                    }
              
                    else
                    {
                          analogs=(<div className="noAnalogs"></div>);
                    } 
             }catch(e)
             {
                analogs=(<div className="catch" ></div>); 
             }
      }else
      {
           analogs=(<div className="dShowAnalogs" ></div>);   
      }                    
  /////////////////////////////////ANALOGS-END//////////////////////////////////////////////////////////////////                                                                           
         // <ComContext.Provider value={this}> <Search_table_brandheader key={unickKey++}  itemCode={this.state.itemCode} brandInfo={this.state.analogInfo}/></ComContext.Provider>
                                         
         return (
                   <div class="block">  
                   <ComContext.Provider value={this}><Search_content_header/> </ComContext.Provider>
                     <div className="table-responsive">
                     
                     <ComContext.Provider value={this}> <Search_table_brandheader key={unickKey++}  itemCode={this.state.itemCode} brandInfo={this.state.brandInfo}/></ComContext.Provider>
                     <Pagination quantity={this.state.dataQuantity}/>
                          <table className="table table-vcenter"> 
                               <thead>
                                {tableHead}
                               </thead> 
                                <tbody>
                                    {tableBody}                                   
                                  </tbody>
                                              
                       
                       
                         </table>
                        <Pagination quantity={this.state.dataQuantity}/> 
                     </div>
                      <div className="table-responsive analogs">
                             {analogs}
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
      Uobject=window.objectReg['Search_table_v2'];  
       Uobject.setState({page:Number(e.target.innerHTML),shouldComponentUpdate:true});  
       
       
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
 export class Common_th extends Extends   
 {
      constructor(props) 
     {  
        super(props);
        this.state=this.props;
         
     } 
     renderCaption()
     {
         if (!this.state.caption)
         {
           return "";  
         }
         
         else
         {
          return this.state.caption.split(/\//);
             
         }
         
         
     }
     render()
     {
         var caption=this.renderCaption();
       if (caption instanceof  Array )
       {
           const a =(  <th>
                          {
                              caption.map(function(item){
                              
                              return (<span><span>{item}</span> <br/>
                                         </span>
                              )
                              
                                     
                              
                          }) 
                          }
                       </th> 
           
                    )
           return a;  
       } else
       {
           const a =(<th>{this.state.caption}</th>    )  
           return a;  
       } 
      
                   
                  
        
        
         
             
         
         
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
      this.addToBasket=this.addToBasket.bind(this);
      this.state.inputs=props.inputs;     
      this.state.Quantity=1;
      this.updateQuantity=this.updateQuantity.bind(this);
       
   }
  
   addToBasket()
   {
       var mas=[];
       for (input in this.state.proto)
       {
           if(this.state.proto[input].fValue )           
           mas.push(input+"="+this.state.proto[input].fValue);
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
                  <a href="#" onClick={this.addToBasket} data-toggle="tooltip" title="Edit"  className="btn btn-default"><i className="gi gi-shopping_cart"></i></a>
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