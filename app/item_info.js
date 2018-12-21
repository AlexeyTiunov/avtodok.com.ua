var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'

var meta=document.createElement("meta");
meta.setAttribute("name","description")
meta.setAttribute("content","w")
document.head.appendChild(meta);
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
   var convertCurrencyToUah=dataConvert.convertCurrencyToUah;
   
   function gProperty(name)
   {

       function b()
       {
        return this[name].fValue;     
       }
       
       return b;
       
   }
    
    
   
    var mapObject=
    {
     // Action:{functions:{defineColumnName,defineTd,defineTh},params:["Действие",<Action_td/>,[<Common_th/>," "]],addNew:true},
      //Info:{functions:{defineColumnName,defineColumnClass,defineTd,defineTh},params:[" ","",<Info_td />,[<Common_th/>,"Инфо"]],addNew:true},
      Pic64Base:{functions:{},params:[]},  
      BrandCode:{functions:{},params:[]},     
     // BrandName:{functions:{defineColumnName,defineColumnClass,defineTd,defineTh},params:[" ","",<Brandname_td />,[<Common_th/>," "]]}, 
      ItemCode:{functions:{},params:[]}, 
      Caption:{functions:{},params:[]}, 
      DeliveryDays:{functions:{formatNumber},params:[[".","0"]]},
      Quantity:{functions:{},params:[]},
      //RegionFullName:{functions:{},params:[]}, 
      //RegionShortName:{functions:{},params:[]},
      RegionCode: {functions:{},params:[]},
     // RegionCorrectName:{functions:{defineColumnName,defineColumnClass,defineTd,defineTh},params:[" ","",<Region_td/>,[<Common_th/>,"Термін"]],addNew:true},  
      PercentSupp:{functions:{},params:[]},
      Weight:{functions:{},params:[]}, 
      Currency:{functions:{},params:[]}, 
      ReturnableParts:{functions:{},params:[]}, 
      Price:{functions:{formatNumber},params:[[".","2"]]}, 
      PriceUAH:{functions:{convertCurrencyToUah,formatNumber},params:[[gProperty("Price"),gProperty("Currency")],[".","2"]],addNew:true}, 
	  
         
        
    }
    
    
    
   return mapObject; 
}

function getMapObjectCrosses()
{
	
    dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
    var defineTh=dataConvert.defineTh; 
   var parceDate=dataConvert.parceDate;
   var convertCurrencyToUah=dataConvert.convertCurrencyToUah;
   
   function gProperty(name)
   {

       function b()
       {
        return this[name].fValue;     
       }
       
       return b;
       
   }
    
    
   
    var mapObject=
	{
		 id:{functions:{},params:[]}, 
		 B1Code:{functions:{},params:[]},
		 I1Code:{functions:{},params:[]},
		 B2Code:{functions:{},params:[]}, 
		 BRANDNAME:{functions:{defineColumnName,defineTd,defineTh},params:["Бренд",<CrossBrand_td/>,[<Common_th/>,"Бренд "]]},
		 I2Code:{functions:{defineColumnName,defineTd,defineTh},params:["Артикул",<CrossItem_td/>,[<Common_th/>,"Артикул"]]},
		
		
		
	};
	return mapObject;
}

export class Item_info extends Extends
{
	constructor(props)
	{
		super(props);
		try
		{
			this.itemCode=this.props.match.params.itemcode;
		}catch(e)
		{
			this.itemCode="";
		}
		try
		{
			this.brandCode=this.props.match.params.brandcode;
		}catch(e)
		{
			this.brandCode="";
		}
		
	}
    /////////////////////////////

     render()
	 {
         var HeaderComponent=getItemInfoHeaderComponent(this.itemCode,this.brandCode,getItemInfoHeader);
		 var PriceOrderComponent=getPriceOrderComponent(this.itemCode,this.brandCode);
		 var ItemInfoCrosses=getItemInfoCrossesComponent(this.itemCode,this.brandCode);
		 return (<div class="block">
		           <div class="block full">                    
					  <HeaderComponent/>
				      <PriceOrderComponent/>
				  </div> 
				   <ItemInfoCrosses/>
                </div> 				 
				 )
		 
	 }	 
	
	
}

function getItemInfoHeaderComponent(itemCode,brandCode,itemInfoHeaderFunc)
{
	Item_info_header.itemCode=itemCode;
    Item_info_header.brandCode=brandCode;
    Item_info_header.itemInfoHeaderFunc=itemInfoHeaderFunc;	
	return Item_info_header;
}

export class Item_info_header extends Extends
{
	constructor(props)
	{
		super(props);
		this.itemInfoHeaderFunc=this.constructor.itemInfoHeaderFunc;
		this.itemCode=this.constructor.itemCode;
		this.brandCode=this.constructor.brandCode;
	}
    /////////////////////////////
     getItemInfo()
	 {
		 if (this.itemInfoHeaderFunc==null || this.itemInfoHeaderFunc==undefined) return;
		 this.itemInfoHeaderFunc.call(this)
	 }
	 getLangNamesObjectFromMapArray(lang)
	 {
		if (lang=="" || lang==undefined)
		{
			return {};
		}
		
		var langNames={};		
		//var pattern=new RegExp("^("+lang+")(.*)$");
	   try{  
	   	
          for (var item in this.state.mapArray["NAMES_LANG"][lang])
		  {			
			// if ( pattern.test(item))
			// {
			 //  var name=item.replace(pattern,$2);
			   langNames[item]=this.state.mapArray["NAMES_LANG"][lang][item];
			   
			// }			 
			 
		 }
		}catch(e)
		{
			
		}
       return langNames;		
	 }
	 
	 ////////////////////////////////////////
	 
	 componentDidMount()
	 {
		 super.componentDidMount();
		 this.getItemInfo();
	 }
     render()
	 {
		 var langNames=this.getLangNamesObjectFromMapArray("UKR");
		 var infoArray=[];
		 try
		 {
			 for ( var item in langNames)
			 {
				 if (item in this.state.mapArray)
				 {
					 var pointList=(<div className="form-group">
                                        <label className="col-md-3 ">{langNames[item]}</label>
                                        <div className="col-md-6">
                                            <p className="form-control-label">{this.state.mapArray[item]}</p>
                                        </div>
									</div>	); 
					 infoArray.push(pointList)
				 }
			 }
			 
		 }catch(e)
		 {
			
		 }
		 var imgSrc="";
         try
		 {
			  imgSrc=this.state.mapArray["IMGSRC"];
		 }catch(e)
		 {
			 
		 }		 
		 
		 return ( 
		     <div class="block-title">  
			  <div className="col-md-6">
                     <form method="post"  className="form-horizontal form-bordered">
					   <div class="form-group">
                            <h2 class="sub-header">Інформація о товарі</h2>            
                        </div>
					 {infoArray}
		             </form> 
			   </div>		 
					 
                <div className="col-sm-6 block-section text-center">
                                <a href={imgSrc} data-toggle="lightbox-image">
                                    <img src={imgSrc} alt="image"/>
                                </a>
                        </div>   
                      	 
				 </div>)	 
		 
		         
		 
	 }	 
}



function getItemInfoHeader()
{
	 var data="ItemCode="+this.itemCode+"&HEADER="; 
	 var Prom=this.makeRequestToRecieveDataAsync("POST","/ws/catalog/"+this.brandCode+"/",data);
	 var itemInfoHeader=function(responseText)
	 {
		  handleHeader= new  handleData(responseText);
          this.setState({mapArray:handleHeader.mapArray})		  
	 }
	 itemInfoHeader=itemInfoHeader.bind(this)
	 Prom.then(itemInfoHeader);
}

function getPriceOrderComponent(itemCode,brandCode)
{
	Price_order.itemCode=itemCode;
	Price_order.brandCode=brandCode;
	return Price_order;
}

export class Price_order extends Extends
{
	constructor(props)
	{
		super(props);
		this.priceUSD=0;
		this.priceUAH=0;
		this.itemCode=this.constructor.itemCode;
		this.brandCode=this.constructor.brandCode;
		this.inOurStock=false;
		this.itemInfo=null;
	}
	getSearchData()
	{
		if (this.itemCode=="" || this.itemCode==undefined)
		{
			return;
		}
		var data="ItemCode="+this.itemCode+"";
		  if (this.brandCode==undefined || this.brandCode==null )
         {
            //this.noAnalogsFinded=true;
         } else
         {
             data+="&BrandCode="+this.getBrandIdByFullName(this.brandCode); 
		 }
		  var Prom=this.makeRequestToRecieveDataAsync("POST","/ws/searchItems.php",data);
		  
		  var searchData=function(responseText)
		  {
			  handleBR= new  handleData(responseText,undefined,"BRANDS");             
              handleDT=new handleData(responseText,getMapObject(),"ITEMS"); 
			  
			   var regionRangeObjectValue={
              "1-1":[],
              "2-3":[],
			  "4-4":[],
              "980-999":[], 
              "default":[],
              
             };
			 var data=handleDT.mapArray;
			
			  for (  var i=0;i<data.length;i++)
			  {
				   this.getRangeObjectValue(regionRangeObjectValue,data[i].RegionCode.fValue).push(data[i])
			  }
			  
			   if (regionRangeObjectValue["1-1"].length==1)
		        {
			      this.inOurStock=true;
				  this.priceUAH=regionRangeObjectValue["1-1"][0].PriceUAH.fValue; 
				  this.itemInfo=regionRangeObjectValue["1-1"][0];
				  this.setState({justUpdate:null});
		        }else
		        {
			      this.inOurStock=false;
		        }
			  
		  }
		  searchData=searchData.bind(this)
		  Prom.then(searchData);
	}
	/////
	componentDidMount()
	{
		this.getSearchData();
	}
	
	render()
    {
	   if (this.inOurStock)	
	   {
        		   
		return (
		         <div className="block-title">
                            <button type="button" className="btn btn-alt btn-lg btn-danger">{this.priceUAH+" грн."}</button>
                            <div className="input-group col-md-3">
                               <Action_td proto={this.itemInfo} />
                            </div>
                            
                        </div> 
		       
			    )
	     }else
		 {
			  return (
			  <div className="block-title">
			   <div className="input-group col-md-3">
			           <div class="btn-group pull-left">
					   <a class="btn btn-primary" href={"/search/"+this.itemCode}>
					   <i class="fa fa-angle-right"></i> Замовити
					   </a>
					   </div>
				  </div>	   
			   </div> 
			   
			          )
			 
		 }
		 
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
      this.itemBasketQuantityCheck=this.itemBasketQuantityCheck.bind(this);
	  
   }
   
   addToBasket(notify)
   {
       var mas=[];
       for (input in this.state.proto)
       {
		   if (input=="Pic64Base") continue;
           if(this.state.proto[input].fValue )           
           mas.push(input+"="+this.state.proto[input].fValue);
       } 
       
       var Pro=this.makeRequestToRecieveData("POST","/ws/AddToBusket.php",false,mas.join('&')+"&Quantity="+this.state.Quantity);
       var parseData=function(data)
	   {
		   var requestInfo= new  handleData(data,undefined,"REQUEST");
		   var statusInfo=new  handleData(data,undefined,"STATUS");
		   var actionInfo=new  handleData(data,undefined,"ACTION");
		   
		   return <AddToBasketReturnMassage statusInfo={statusInfo.mapArray} actionInfo={actionInfo.mapArray}/>
		   
	   }.bind(this);
	   var updateBasketIcon=function(data){
        //alert(data) ; 
        obj=window.objectReg["Basket_icon"];
        obj.setState({getBasketPartsQuantity:true});
		if (notify)
         this.showInforMassage("ADD",parseData(data)) 
         return parseData(data);	
      }
      updateBasketIcon=updateBasketIcon.bind(this);
      return Pro.then( updateBasketIcon ); 
    
        
       
   }
   itemBasketQuantityCheck()
   {
	    var mas=[];
       for (input in this.state.proto)
       {
           if(this.state.proto[input].fValue )           
           mas.push(input+"="+this.state.proto[input].fValue);
       } 
       
       var Pro=this.makeRequestToRecieveData("POST","/ws/AddToBusket.php",false,mas.join('&')+"&Quantity="+this.state.Quantity+"&item_duplicate_check=Y");
	    var updateBasketIcon=function(data)
		{
			var firstQuantity=Number(data);
			var secondQuantity=(this.state.Quantity==undefined)?1:this.state.Quantity;
			if (firstQuantity>0)
			{
				var info = {itemCode:this.state.proto.ItemCode.fValue,
				            caption:this.state.proto.Caption.fValue,
							firstQuantity:firstQuantity,
							secondQuantity:secondQuantity,
							actionCom:this,
							}
				var infoMassage=(<ItemDuplicateMassage info={info} proto={this.state.proto} />);
				this.showInforMassage("ADD",infoMassage);
			}else
			{
				this.addToBasket(true);
			}
		}
	   updateBasketIcon=updateBasketIcon.bind(this);
	   Pro.then( updateBasketIcon ); 
      
	   
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
   /////
   
   render()
   {   
       return (
            
                 <div className="btn-group btn-group-xs">
                  <input type="number" name="number" onChange={this.updateQuantity} data-toggle="tooltip"  className="btn btn-default visible-lg-block" value={(("Quantity" in this.state)==false)?1:this.state.Quantity} style={{width:"3em"}} />
                  <Select_quantity typeOfSelectNumber={"int"} parentComponent={this}/>
                  <a  onClick={this.itemBasketQuantityCheck} data-toggle="tooltip" title="Edit"  className="btn btn-default"><i className="gi gi-shopping_cart" ></i></a>
                
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
            <select className="visible-xs-block visible-sm-block visible-md-block" onChange={this.updateQuantity}>
                {this.state.optionsMas.map(function(item){
                    
                     return item;
                    
                })}
            </select>
           
           
       )
   }
    
}
//////////////////////////////////////////////////////////////////

function getItemInfoCrossesComponent(itemCode,brandCode)
{   Item_info_crosses.itemCode=itemCode;
    Item_info_crosses.brandCode=brandCode; 
	Item_info_crosses.itemInfoCrossFunc=getItemInfoCrosses;
	return Item_info_crosses
}

function getItemInfoCrosses()
{
   var data="ItemCode="+this.itemCode+"&CROSSES="; 
	 var Prom=this.makeRequestToRecieveDataAsync("POST","/ws/catalog/"+this.brandCode+"/",data);
	 var itemInfoCrosses=function(responseText)
	 {
		  handleCrosses= new  handleData(responseText,getMapObjectCrosses());
          this.setState({mapArray:handleCrosses.mapArray})		  
	 }
	 itemInfoCrosses=itemInfoCrosses.bind(this)
	 Prom.then(itemInfoCrosses);
}

export class Item_info_crosses extends Extends
{
	constructor(props)
	{
		super(props);		
		this.itemInfoCrossFunc=this.constructor.itemInfoCrossFunc;
		this.itemCode=this.constructor.itemCode;
		this.brandCode=this.constructor.brandCode;
		this.state.mapArray=[];
	}
	 getItemInfo()
	 {
		 if (this.itemInfoCrossFunc==null || this.itemInfoCrossFunc==undefined) return;
		 this.itemInfoCrossFunc.call(this)
	 }
	
	////////////////////////////
	componentDidMount()
	{
		this.getItemInfo();
	}
	render()
	{
		var tablePrepared=this.makeTableFromMapArray(this.state.mapArray)
		 return (<div className="block">
                                <div class="block-title">
                                    <h2><strong>Аналоги</strong></h2>
                                </div>
		                        {tablePrepared}
				 </div>)
	}
	
}

export class CrossBrand_td extends Extends
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

export class CrossItem_td extends Extends
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
				   {this.state.proto[this.state.NAME].fValue}
				   </td> 
        
        
         
             )   
         
         
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
           const a =(  <th className="text-center">
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
           const a =(<th className="text-center">{this.state.caption}</th>    )  
           return a;  
       } 
      
                   
                  
        
        
         
             
         
         
     }
     
 }

/////////////////////////////////////////////////////////////////////////




