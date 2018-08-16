var ReactDOM = require('react-dom');
var React = require('react'); 
import {Extends} from './main_component.js'

var m={functionToHandle:null,};

var mapForSearchData={
  BrandCode:{functionToHandle:sFunction,className:null,makeHiddenInner:true,value:null},
  BrandName:{functionToHandle:sFunction,className:null,value:null},
  ItemCode:{functionToHandle:sFunction,className:null},
  Caption:{functionToHandle:sFunction,className:"hidden-xs sorting",value:null},
  DeliveryDays:{functionToHandle:sFunction,className:"sorting",value:null},
  Quantity:{functionToHandle:sFunction,className:"sorting",value:null},
  RegionShortName:{functionToHandle:sFunction,className:null,value:null},
  RegionCode:{functionToHandle:sFunction,className:null,makeHiddenInner:true,value:null},
  ReturnableParts:{functionToHandle:sFunction,className:null,value:null},
  Weight:{functionToHandle:sFunction,className:null,value:null},
  Currency:{functionToHandle:sFunction,className:null,value:null},
  PercentSupp:{functionToHandle:sFunction,className:null,value:null},
  Price:{functionToHandle:sFunction,className:null,value:null},
  PriceUSD:{functionToHandle:sFunction,className:null,value:null},  
    
    
}

function extend(o,p)
{
    for (prop in p)
    {
        o[prop]=p[prop];
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


export class Search_table extends Extends
{
    
   constructor(props) 
     {  
       
         super(props);
         this.state={parentMod:Object,
                     renderIN:<div></div>,
                     dataRecieved:null,
                     tableBody:[]
                     };        
         
     }
     dataSort(data)
     {
         
         
         
     }
     
     makeDataForRender(data)
     {
         
         dat=(JSON.parse(data)).ITEMS;
         for (i in dat)
         {
             var  mapForSearchDataLocal=extend({},mapForSearchData);
             for (item in dat[i])
             {
                 if ((item in mapForSearchDataLocal)==false)
                 {
                    continue; 
                 }
                 var config=mapForSearchDataLocal[item];    //mapForSearchDataLocal.BrandCode--{}.   is <tr> </tr>          
                 func=config['functionToHandle'];
                 
                 if (func!=null && func!=undefined)
                 {
                     func.call(config,dat[i][item]);
                 }
                 
                 
                 
             }
             
             var mas=[]
             for (item in mapForSearchDataLocal)
             {
              mas.push(mapForSearchDataLocal[item].value);   
             }   
             const b=(<tr>{mas.map(function(item){return item;})} </tr>)                              
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
                     </div>
                </div>)
         
         
         
     } 
    
    
    
}


