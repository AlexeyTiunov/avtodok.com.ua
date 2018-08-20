var ReactDOM = require('react-dom');
var React = require('react'); 
import {Extends} from './main_component.js'





    

function getMapForSearchData()
{
   function gProperty(name)
   {

       function b()
       {
        return this[name].value;     
       }
       
       return b;
       
   }
   
 
  var mapForSearchData={
  BrandCode:{functionToHandle:sFunction,className:null,makeHiddenInner:true,value:null},
  BrandName:{functionToHandle:sFunction,className:null,value:null},
  ItemCode:{functionToHandle:sFunction,className:null},
  Caption:{functionToHandle:sFunction,className:"hidden-xs sorting",value:null},
  DeliveryDays:{functionToHandle:{formatNumber,sFunction},params:["",".","0"],className:"sorting",value:null},
  Quantity:{functionToHandle:sFunction,className:"sorting",value:null},
  RegionFullName:{functionToHandle:sFunction,className:null,value:null},
  RegionShortName:{functionToHandle:sFunction,dontShow:true,className:null,makeHiddenInner:true,value:null}, //
  RegionCode:{functionToHandle:sFunction,dontShow:true,className:null,makeHiddenInner:true,value:null}, //
  PercentSupp:{functionToHandle:{addPercentSign,wrapperA,sFunction},className:null,wrapperClassName:"label label-success",value:null},  
  Weight:{functionToHandle:sFunction,className:null,value:null},
  Currency:{functionToHandle:sFunction,className:null,value:null},
  ReturnableParts:{functionToHandle:sFunction,dontShow:true,className:null,value:null},//
  Price:{functionToHandle:{formatNumber},params:["",".","3"] ,dontShow:true, className:null,value:null}, // 
  PriceUSD:{functionToHandle:{convertSum,sFunction},params:["","",gProperty("Price")],className:null,value:null}, 
  } 
  for (item in mapForSearchData)
  {
    mapForSearchData[item].__proto__=mapForSearchData;  
  }
  
  
  return mapForSearchData;  
}
 var regionCodeColors={ "1":"warning", //bootstrap classes
                         "2": "active",
                         "3": "active",
                         "4":"active",
                         "default":"danger",
                      }
 

function extend_old(o,p)
{
    for (prop in p)
    {
        o[prop]=p[prop];
    }
    return o;
}
function extend(o,p)
{
   
    for (prop in p)
    {
        vl=Object.getOwnPropertyDescriptor(p,prop);
        Object.defineProperty(o,prop,{value:vl.value,enumerable:true,writable:true});
       // o[prop]=p[prop];
    }
    return o;
}


function sFunction(value)   //obj = (for example ) BrandCode --{}
{
  if (this.makeHiddenInner)
  {
    const a= (<input type='hidden' value={value} />);
    this.value=a;      
  }
  else
  {
     
                
      
      const a= ( <td className={this.className}>
                    {value}
                  </td> )
                  
                  
      this.value=a;
                           
 
             
  } 
  
  
}

function wrapperA(value)
{
  const a=(<a href='#' className={this.wrapperClassName}>{value}</a >);
  this.value=a; 
    
}
function addPercentSign(value)
{
    if (value==undefined) this.value="100%";
    else 
    this.value=value+"%"; 
}
function formatNumber(value,pointDelimeter,quantityAfterPoint)
{
    if ((pointDelimeter!="." && pointDelimeter!=",") ||(pointDelimeter==".") )
    {
         pointDelimeter=".";
         var pattern=/ \,/;
         value =value.replace(pattern,pointDelimeter);
         
    } else
    {
         pointDelimeter=",";
         var pattern=/ \./;
         value =value.replace(pattern,pointDelimeter);
        
    }
    
    if (quantityAfterPoint==null || quantityAfterPoint==undefined)
    {
          quantityAfterPoint="2";
    }
    var pattern= new RegExp("^([0-9]*?)(\.|\,{1})([0-9]{"+quantityAfterPoint+"})([0-9]*)$");
   // var pattern= /^([0-9]*?)(\.|\,{1})([0-9]{2})([0-9]*)$/;
    if (pattern.test(value))
    {
        if (quantityAfterPoint=="0")
        this.value =value.replace(pattern,'$1');
        else
      this.value =value.replace(pattern,'$1$2$3');
        
    } else
    {
      this.value=value;  
    }
    
    
}
 function makeConfiguration(val)
 {
     if (this==undefined) return;
      var config=this;    //mapForSearchDataLocal.BrandCode--{}.   is <tr> </tr> 
                 if (typeof config.functionToHandle == "object") 
                 {
                     for (func in config.functionToHandle)
                     {
                       if (config.functionToHandle[func]!=null && config.functionToHandle[func]!=undefined)
                        {
                          if (config.params)
                          {
                              
                            if (config.value==null)
                            {
                             config.params[0]=val;  
                             //config.functionToHandle[func].apply(config,config.functionToHandle.params);
                            }else
                            {
                              config.params[0]=config.value;  
                              //config.functionToHandle[func].apply(config,config.functionToHandle.params);  
                            } 
                            config.functionToHandle[func].apply(config,config.params);   
                          } else
                          { 
                           if (config.value==null)   
                           config.functionToHandle[func].call(config,dat[i][item]);
                           else config.functionToHandle[func].call(config,config.value);
                          }
                        }
                         
                     }
                     
                 } else
                 {
                     
                         
                     func=config['functionToHandle'];
                     
                     if (func!=null && func!=undefined)
                      {
                         func.call(config,dat[i][item]);
                      }
                 }
     
 }
 function convertSum(curFrom,curTo,sum)
 {
     summ=sum.bind(this)();
     this.value=summ;
 }
export class Search_table extends Extends
{
    
   constructor(props) 
     {  
       
         super(props);
         this.state={parentMod:Object,
                     renderIN:<div></div>,
                     dataRecieved:null,
                     tableBody:[],
                     numberOfrow:5,
                     page:1,
                     dataQuantity:1,
                     }; 
                             
         
     }
     dataSort(data)
     {   
         if (data.length==1) return;
         for (i=0;i<data.length;i++)
         {
             for (j=0;j<data.length-i-1;j++)
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
     
     makeDataForRender(data)
     {
          
         dat=(JSON.parse(data)).ITEMS;
         this.dataSort(dat);
         startPagination=(this.state.numberOfrow*this.state.page)-this.state.numberOfrow+1;
         endPagination=startPagination+this.state.numberOfrow-1;
         this.state.dataQuantity=(dat.length%this.state.numberOfrow>0)?((dat.length-(dat.length%this.state.numberOfrow))/ this.state.numberOfrow)+1:dat.length/this.state.numberOfrow;
         for (i=0;i<dat.length;i++)
         {
             if (i+1<startPagination || i+1>endPagination) continue
             var  mapForSearchDataLocal=extend({},getMapForSearchData());
             var colorClass="";
             for (item in dat[i])
             {   
                 
                 if ((item in mapForSearchDataLocal)==false)
                 {
                    continue; 
                 }
                 makeConfiguration.call(mapForSearchDataLocal[item],dat[i][item]);
               
                /* var config=mapForSearchDataLocal[item];    //mapForSearchDataLocal.BrandCode--{}.   is <tr> </tr> 
                 if (typeof config.functionToHandle == "object") 
                 {
                     for (func in config.functionToHandle)
                     {
                       if (config.functionToHandle[func]!=null && config.functionToHandle[func]!=undefined)
                        {
                          if (config.params)
                          {
                              
                            if (config.value==null)
                            {
                             config.params[0]=dat[i][item];  
                             //config.functionToHandle[func].apply(config,config.functionToHandle.params);
                            }else
                            {
                              config.params[0]=config.value;  
                              //config.functionToHandle[func].apply(config,config.functionToHandle.params);  
                            } 
                            config.functionToHandle[func].apply(config,config.params);   
                          } else
                          { 
                           if (config.value==null)   
                           config.functionToHandle[func].call(config,dat[i][item]);
                           else config.functionToHandle[func].call(config,config.value);
                          }
                        }
                         
                     }
                     
                 } else
                 {
                     
                         
                     func=config['functionToHandle'];
                     
                     if (func!=null && func!=undefined)
                      {
                         func.call(config,dat[i][item]);
                      }
                 } */
                 if (item=="RegionCode"){
                     if (regionCodeColors[dat[i][item]]==undefined || regionCodeColors[dat[i][item]]==null )
                     {
                       colorClass= regionCodeColors.default; 
                     } else
                     {
                       colorClass=regionCodeColors[dat[i][item]];  
                     }
                  
                  
              }   
                 
                 
             }
             
             for (item in mapForSearchDataLocal)
             {
               if (mapForSearchDataLocal[item].value==null)
               {
                   
                  makeConfiguration.call(mapForSearchDataLocal[item]); 
               }
               if (mapForSearchDataLocal[item].value==null)
               {
                   const f=<td></td>;
                   mapForSearchDataLocal[item].value=f;
               }  
                 
             }
             
             var mas=[];             
             for (item in mapForSearchDataLocal)
             {
                 if (mapForSearchDataLocal[item].value!=null && !mapForSearchDataLocal[item].dontShow )
                 {
                  mas.push(mapForSearchDataLocal[item].value);
                 } 
             }   
             const b=(<tr className={colorClass} >{mas.map(function(item){return item;})} </tr>)                              
             this.state.tableBody.push(b); 
             //this.setState({tableBody:this.state.tableBody});
                                       
         }
         
     }
     
     /////////////////////////////////////
     componentDidUpdate(prevProps, prevState)
     {
          debugger;
        //this.state.tableBody=[];
       // this.makeDataForRender(this.state.dataRecieved);
       
          
     }
     componentWillUpdate()
     {  
          
     }
     
     
     render()
     {
        
         debugger; 
         if (this.state.dataRecieved!=null && this.state.dataRecieved!="")
          {
             
          this.state.tableBody=[];
          this.makeDataForRender(this.state.dataRecieved);
          }else
          {
             this.state.tableBody=[]; 
          }   
         return (  <div class="block">
                     <div className="table-responsive">
                       <Pagination quantity={this.state.dataQuantity}/>
                       <table className="table table-vcenter">
                            <thead> 
                                 <tr>
                                        
                                        <th>Бренд</th>
                                        <th>Код</th>
                                        <th class="hidden-xs">Опис</th>
                                        <th class="sorting">Срок</th>
                                        <th>К-во</th>
                                        <th>Регіон</th>
                                        <th className="hidden-xs sorting">Надійність</th>
                                        <th className="hidden-xs">Вага</th>
                                        <th className="hidden-xs">$</th>
                                        <th className="hidden-xs sorting">Ціна</th>
                                        <th className="sorting">Ціна $</th> 
                                        
                                    </tr>
                             </thead> 
                             <tbody>  
                             
                                {this.state.tableBody.map(function(item){return item})}
                             
                             </tbody>   
                             
                             
                             
                       </table>
                       <Pagination quantity={this.state.dataQuantity}/> 
                     </div>
                </div>)
         
         
         
     } 
    
    
    
}

//////////////////////////////////////////////////////////
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
