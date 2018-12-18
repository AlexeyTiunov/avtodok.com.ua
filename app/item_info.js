var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'




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
		 return (<div class="block">
		           <div class="block full">
                    
					  <HeaderComponent/>
				      <div className="block-title">
                            <button type="button" className="btn btn-alt btn-lg btn-danger">1987 грн</button>
                            <div className="input-group col-md-3">
                                <input type="email" name="example-input2-group2" className="form-control" value="1"/>
                                <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger">В Корзину</button>
                                </span>
                            </div>
                            
                        </div> 
				 </div> 
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
                                        <label className="col-md-3 control-label">{langNames[item]}</label>
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
					 {infoArray}
		             </form> 
			   </div>		 
					 
                <div className="col-sm-6 block-section text-center">
                                <a href="img/placeholders/photos/photo5.jpg" data-toggle="lightbox-image">
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









