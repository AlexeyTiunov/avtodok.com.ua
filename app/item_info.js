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
			if ("itemanalogcode" in this.props.match.params)
			{
				if (this.props.match.params.itemanalogcode!=undefined)
				{
					if (this.props.match.params.itemanalogcode!=this.props.match.params.itemcode)
					{
						this.itemAnalogCode=this.props.match.params.itemanalogcode;
						this.itemCode=this.props.match.params.itemcode;
					}else
					{
						this.itemAnalogCode=undefined;
						this.itemCode=this.props.match.params.itemcode;
					}
					
				}else
				{
					this.itemAnalogCode=undefined;
					this.itemCode=this.props.match.params.itemcode;
				} 
			    
				   
			}else
			{
				this.itemCode=this.props.match.params.itemcode;
			}
			
		}catch(e)
		{
			this.itemCode="";
		}
		try
		{
			//this.brandCode=this.getBrandIdByFullName(this.props.match.params.brandcode);
			this.brandName=this.props.match.params.brandname
			this.brandCode=this.getBrandIdByFullName(this.props.match.params.brandcode);
		}catch(e)
		{
			this.brandCode="";
		}
		
	}
	updateWithNoItemAnalogCode()
	{
		this.itemAnalogCode=undefined;
		this.setState({justUpdate:null});
	}
    /////////////////////////////

     render()
	 {
         var HeaderComponent=getItemInfoHeaderComponent(this.itemCode,this.itemAnalogCode,this.brandName,getItemInfoHeader);
		 var PriceOrderComponent=getPriceOrderComponent(this.itemCode,this.brandName);
		 var ItemInfoCrosses=getItemInfoCrossesComponent(this.itemCode,this.itemAnalogCode,this.brandName,this);
		 return (<div class="block">
		           <div class="block full">                    
					  <HeaderComponent/><br/>
				      <PriceOrderComponent/>
				  </div> 
				   <ItemInfoCrosses/>
                </div> 				 
				 )
		 
	 }	 
	
	
}

function getItemInfoHeaderComponent(itemCode,itemAnalogCode,brandName,itemInfoHeaderFunc)
{
	Item_info_header.itemCode=itemCode;
    Item_info_header.brandName=brandName;
    Item_info_header.itemInfoHeaderFunc=itemInfoHeaderFunc;	
	Item_info_header.itemAnalogCode=itemAnalogCode;
	return Item_info_header;
}

export class Item_info_header extends Extends
{
	constructor(props)
	{
		super(props);
		this.itemInfoHeaderFunc=this.constructor.itemInfoHeaderFunc;
		this.itemCode=this.constructor.itemCode;
		this.itemAnalogCode=this.constructor.itemAnalogCode;
		this.brandName=this.constructor.brandName;
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
	 updateWithNoItemAnalogCode()
	{
		this.itemAnalogCode=undefined;
		this.setState({justUpdate:null});
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
		     if (this.itemAnalogCode!=undefined)
			 {
				  var pointList=(<div className="form-group">
                                        <label className="col-md-3 "><h2>{"OE Артикул"}</h2></label>
                                        <div className="col-md-6">
                                            <p className="form-control-label"><h2>{this.itemAnalogCode}</h2></p>
                                        </div>
									</div>	); 
									infoArray.push(pointList);
				 
			 }
			 for ( var item in langNames)
			 {
				 if (item in this.state.mapArray)
				 {
					 var pointList=(<div className="form-group">
                                        <label className="col-md-3 "><h2>{langNames[item]}</h2></label>
                                        <div className="col-md-6">
                                            <p className="form-control-label"><h2>{this.state.mapArray[item]}</h2></p>
                                        </div>
									</div>	); 
					 infoArray.push(pointList)
				 }
			 }
			 
		 }catch(e)
		 {
			
		 }
		 var imgSrc="";
		 var imgAlt=(this.itemAnalogCode!=undefined && this.itemAnalogCode!="")?this.itemAnalogCode:this.itemCode;
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
                            <h2 class="sub-header">Інформація про товар</h2>            
                        </div>
					 {infoArray}
		             </form> 
			   </div>		 
					 
                <div className="col-sm-6 block-section text-center">
                                <a href={imgSrc} data-toggle="lightbox-image">
                                    <img src={imgSrc} alt={imgAlt}/>
                                </a>
                        </div>   
                      	 
				 </div>)	 
		 
		         
		 
	 }	 
}



function getItemInfoHeader()
{
	 var data="ItemCode="+this.itemCode+"&HEADER="; 
	 var Prom=this.makeRequestToRecieveDataAsync("POST","/ws/catalog/"+this.brandName+"/",data);
	 var itemInfoHeader=function(responseText)
	 {
		  handleHeader= new  handleData(responseText);
          this.setState({mapArray:handleHeader.mapArray})		  
	 }
	 itemInfoHeader=itemInfoHeader.bind(this)
	 Prom.then(itemInfoHeader);
}

function getPriceOrderComponent(itemCode,brandName)
{
	Price_order.itemCode=itemCode;
	Price_order.brandName=brandName;
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
		this.brandName=this.constructor.brandName;
		this.inOurStock=false;
		this.itemInfo=null;
		this.updateIsCorrect=false;
	}
	getData()
	{
		var Prom= this.getBrandCode(this.BrandName);
		var getSearchData=this.getSearchData.bind(this);
		Prom.then(getSearchData);
		
	}
	
	getBrandCode(BrandName)
	{
		var brandCodeGet= function (resolve,reject) 
		{
			if (this.getBrandIdByFullName(this.brandName)!=undefined)
			{
				clearInterval(this.interval);
				resolve(this.getBrandIdByFullName(this.brandName));
			}
		}
		brandCodeGet=brandCodeGet.bind(this);
		sInterval=function (resolve,reject)
		{
			this.interval=setInterval(()=>{brandCodeGet(resolve,reject)},200);
		}
		sInterval=sInterval.bind(this);
		var Prom = new Promise(sInterval)
		
		  return Prom;
	}
	getSearchData(brandCode)
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
			
             data+="&BrandCode="+brandCode; 
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
				  this.updateIsCorrect=true;
				  this.setState({justUpdate:null});
		        }else
		        {
				  
			      this.inOurStock=false;
		        }
			  
		  }
		  searchData=searchData.bind(this)
		  Prom.then(searchData);
	}
	///////////////////////////////////////////
	componentDidUpdate()
	{
		
		
	}
	
	componentDidMount()
	{
		this.getData();
	}
	
	render()
    {
	   if (this.inOurStock)	
	   {
        		   
		return (
		         <div className="row">
				           <div className="input-group col-md-12">
                              <button type="button" className="btn btn-alt btn-lg btn-danger">{this.priceUAH+" грн."}</button>
							</div>
                            <div className="input-group col-md-12">
                               <Action_td proto={this.itemInfo} />
                            </div>
                            
                        </div> 
		       
			    )
	     }else
		 {
			  return (
			  <div className="row">
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

function getItemInfoCrossesComponent(itemCode,captionStringItemAnalogCode,brandName,item_Info_Component)
{   Item_info_crosses.itemCode=itemCode;
    Item_info_crosses.brandName=brandName; 
	Item_info_crosses.captionStringItemAnalogCode=captionStringItemAnalogCode;
	Item_info_crosses.itemInfoCrossFunc=getItemInfoCrosses;
	Item_info_crosses.item_Info_Component=item_Info_Component;
	return Item_info_crosses
}

function getItemInfoCrosses()
{
   var data="ItemCode="+this.itemCode+"&CROSSES="; 
	 var Prom=this.makeRequestToRecieveDataAsync("POST","/ws/catalog/"+this.brandName+"/",data);
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
		this.brandName=this.constructor.brandName;
		this.captionStringItemAnalogCode=this.constructor.captionStringItemAnalogCode;
		this.item_Info_Component=this.constructor.item_Info_Component;
		this.state.mapArray=[];
	}
	 getItemInfo()
	 {
		 if (this.itemInfoCrossFunc==null || this.itemInfoCrossFunc==undefined) return;
		 this.itemInfoCrossFunc.call(this)
	 }
	 checkForAnalog(itemAnalogCode)
	 {
		 if (itemAnalogCode==undefined || this.state.mapArray.length==0 ) return true;
		 var check=false;
		 for (var item in this.state.mapArray)
		 {
		        if (this.state.mapArray[item].I2Code.fValue==itemAnalogCode)
				{
					check=true;
					return check;
				}

		 }
		 return check;
	 }
	////////////////////////////
	componentDidMount()
	{
		this.getItemInfo();
	}
	componentDidUpdate()
	{
		super.componentDidUpdate();
	// if (this.state.mapArray.length>0)
	 //{
		//if (!this.checkForAnalog(this.captionStringItemAnalogCode))
		//{
			//this.item_Info_Component.updateWithNoItemAnalogCode();
		//}
	 //}
	 if (!this.checkForAnalog(this.captionStringItemAnalogCode))
	 {
		 window.objectReg['Item_info_header'].updateWithNoItemAnalogCode();
	 }
		
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
                   <td className={this.state.proto[this.state.NAME].className+" text-center" }> <h4>{this.state.proto[this.state.NAME].fValue}</h4></td> 
        
        
         
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
				   <h4>{this.state.proto[this.state.NAME].fValue}</h4>
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
export class ItemDuplicateMassage extends Extends
{
	constructor(props) 
   {
	   super(props);
	   this.state=this.props;
	   
	   this.addToBasket=this.addToBasket.bind(this);
   }
   ////////////////////////////////
   addToBasket(e)
   {   
      var updateMassage= function(data)
      {
	    this.fullInfoMassage("",data);
      }
	  updateMassage=updateMassage.bind(this);
       var aToBusket= function ()
	   {
		  // var actionComAddToBasket= this.state.info.actionCom.addToBasket.bind(this);
		  var actionComAddToBasket= Action_td.prototype.addToBasket.bind(this);
		   actionComAddToBasket(false).then(updateMassage);
		   //this.showInforMassage();
	   }
       aToBusket=aToBusket.bind(this);
       this.setState({Quantity:e.target.getAttribute("count")},aToBusket);
	   
	   
   }
   
   render()
   {
	   
	  var a=(
	     <div>
		   <p align="center">Ув. Пользователь.</p>  
			<p align="center">В корзине уже имеется аналогичный товар.</p> 
			<p align="center">{this.props.info.itemCode} -{this.props.info.caption}  в количестве {this.props.info.firstQuantity} шт. </p>
		    <button type="button" onClick={this.addToBasket} className="btn btn-primary" count={Number(this.props.info.firstQuantity)+Number(this.props.info.secondQuantity)} ><i className="fa fa-search"></i> Замовити {Number(this.props.info.firstQuantity)+Number(this.props.info.secondQuantity)}</button>
		    <button type="button"  onClick={this.addToBasket} className="btn btn-primary" count={this.props.info.firstQuantity} data-dismiss="modal"><i className="fa fa-search"></i> Залишити {this.props.info.firstQuantity}</button>
		 </div>
	   )
	   return a;
   }
	
}
export class AddToBasketReturnMassage extends Extends
{
	constructor(props) 
	{
		 super(props);
		 this.statusInfo={"0":"не виконано.","1":"виконано"};
		 this.actionInfo={"0":"Оновлення","1":"Додавання"};
		 
	}
	
	
	render()
	{
		
		const a=(
	     <div>
		   <p align="center">Шановний  Клієнт.</p>  
			<p align="center">{this.actionInfo[this.props.actionInfo] } {this.statusInfo[this.props.statusInfo]}! </p> 
			<p align="center"> </p>
		    <button align="center" type="button" className="btn btn-primary" data-dismiss="modal"> ОК </button>
		    
		 </div>
	   )
		   
		
		return a;
		
	}
}

/////////////////////////////////////////////////////////////////////////




