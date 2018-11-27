 var ReactDOM = require('react-dom');
var React = require('react'); 

export function handleData(jsonData,standMap=undefined,jsonSubDataName=undefined)
 {
  //////////////////////////////////////////////   
  function makeConfigurationApply(mapArray)
    {
        for (i=0;i<mapArray.length;i++)
        {
            obj=mapArray[i];
           for (item in mapArray[i]) 
           {
            for (func in mapArray[i][item].functionToHandle)
            {
               mapArray[i][item].functionToHandle[func].apply(obj,obj.params);
                
                
            }
          } 
            
            
        }
        
    }   
     
    function makeConfigurationCall(mapArray)
    {
        for (i=0;i<mapArray.length;i++)
        {
        obj=mapArray[i];
           for (item in obj) 
           {
               var j=0;
            for (func in obj[item].functionToHandle)
            {
               obj[item].functionToHandle[func].call(obj[item],obj[item].params[j]);
                
              j++;  
            }
           } 
            
            
            
        }
        
    }
    function makeConfigurationCallApply(mapArray)
    {
        for (i=0;i<mapArray.length;i++)
        {
        obj=mapArray[i];
           for (item in obj) 
           {
               var j=0;
            for (func in obj[item].functionToHandle)
            {
               if ( obj[item].params[j] instanceof Array)
               {
                   obj[item].functionToHandle[func].apply(obj[item],obj[item].params[j]);  
               } else
               {
                   obj[item].functionToHandle[func].call(obj[item],obj[item].params[j]);
               } 
              j++;  
            }
           } 
            
            
            
        }
        
    }
        
        
        
  function createMapsArray(data)
  {
      //  var standMap=standMap;
       
        var mapArray=[];
        for (i in data)
        {    var map={};
             itemsObject=data[i];
             for (item in itemsObject)
             {   
                   
                // map[item]={};
                if (typeof itemsObject[item]=="object" && itemsObject[item]!=null) 
                {
                      
                    for ( subItem in itemsObject[item])
                    {
                     if (standMap[subItem] && !standMap[subItem].ignore)
                        {
                         map[subItem]={};  
                         Object.defineProperty(map[subItem],"functionToHandle",{value:standMap[subItem].functions,enumerable:true,writable:true});
                         Object.defineProperty(map[subItem],"params",{value:standMap[subItem].params,enumerable:true,writable:true}); 
                         Object.defineProperty(map[subItem],"fValue",{value:itemsObject[item][subItem],enumerable:true,writable:true});
                         Object.defineProperty(map[subItem],"nValue",{value:subItem,enumerable:true,writable:true});  
                        // mapArray.push(map[subItem]);   
                        }
                        else
                        {
                         // Object.defineProperty(map[subItem],"functionToHandle",{value:null,enumerable:true,writable:true});
                          //Object.defineProperty(map[subItem],"params",{value:[],enumerable:true,writable:true});  
                        }
                        
                      
                    }
                } else
                { 
                     
                    if (standMap[item]&& !standMap[item].ignore)
                    {  
                     map[item]={};
                     Object.defineProperty(map[item],"functionToHandle",{value:standMap[item].functions,enumerable:true,writable:true});
                     Object.defineProperty(map[item],"params",{value:standMap[item].params,enumerable:true,writable:true}); 
                     Object.defineProperty(map[item],"fValue",{value:itemsObject[item],enumerable:true,writable:true});
                      Object.defineProperty(map[item],"nValue",{value:item,enumerable:true,writable:true});
                    // mapArray.push(map[item]);
                    }
                    else
                    {
                     // Object.defineProperty(map[item],"functionToHandle",{value:[],enumerable:true,writable:true});  
                    }
                    
                       
                } 
                 
                 
                 
               
                
                
                 
               
                 
                 
             }
             mapArray.push(map); 
            
        }
        
        
       return  makeCorrectDirection(standMap,mapArray); 
        
    }
    
    function makeCorrectDirection( mapObject,mapArray)
    {
            var newMapArray=[]
         for (i=0;i<mapArray.length;i++)
         {  
             var newObj={};
             for (item in mapObject)
            {
               //var newObj={};
               if (mapArray[i][item])
               {
                 newObj[item]=mapArray[i][item];   
               }else
               {
                   if (mapObject[item].addNew)
                   {
                    newObj[item]={};
                    Object.defineProperty(newObj[item],"functionToHandle",{value:mapObject[item].functions,enumerable:true,writable:true});
                    Object.defineProperty(newObj[item],"params",{value:mapObject[item].params,enumerable:true,writable:true});   
                    Object.defineProperty(newObj[item],"fValue",{value:null,enumerable:true,writable:true});
                    Object.defineProperty(newObj[item],"nValue",{value:null,enumerable:true,writable:true}); 
                   } 
                   
                   
               }
               
                 
               
                
            }
            newMapArray.push(newObj); 
         }
          for (i=0;i<newMapArray.length;i++)  
          {
               for (item in newMapArray[i])
               {
                 if (newMapArray[i][item].prototype)
                 {
                    newMapArray[i][item].prototype=newMapArray[i]; 
                 } else
                 {
                    newMapArray[i][item].__proto__=newMapArray[i];     
                 }
                   
               }
          }
              
          
            
         return  newMapArray;  
    }
    //////////////////////////////////////////////////////////////////
    
   this.formatNumber=function (pointDelimeter,quantityAfterPoint)
    {
		if (typeof this.fValue!= "string" ) this.fValue=String(this.fValue);
        if ((pointDelimeter!="." && pointDelimeter!=",") ||(pointDelimeter==".") )
        {
             pointDelimeter=".";
             var pattern=/ \,/;
             this.fValue =this.fValue.replace(pattern,pointDelimeter);
             
        } else
        {
             pointDelimeter=",";
             var pattern=/ \./;
             this.fValue =this.fValue.replace(pattern,pointDelimeter);
            
        }
        
        if (quantityAfterPoint==null || quantityAfterPoint==undefined)
        {
              quantityAfterPoint="2";
        }
        var pattern= new RegExp("^([0-9]*?)(\.|\,{1})([0-9]{"+quantityAfterPoint+"})([0-9]*)$");
       // var pattern= /^([0-9]*?)(\.|\,{1})([0-9]{2})([0-9]*)$/;
        if (pattern.test(this.fValue))
        {
            if (quantityAfterPoint=="0")
            this.fValue =this.fValue.replace(pattern,'$1');
            else
          this.fValue =this.fValue.replace(pattern,'$1$2$3');
            
        } else
        {
          this.fValue=this.fValue;  
        }
        
        
    }
	this.formatNumberRet=function(number,pointDelimeter,quantityAfterPoint)
	{
		if (typeof number!= "string" )
		var newObj={fValue:String(number)};
	else var newObj={fValue:number};
		var fN=this.formatNumber.bind(newObj);
		fN(pointDelimeter,quantityAfterPoint);
		return newObj.fValue;
	}.bind(this);
	
    this.addSuffix=function (suffix)
    {
        if (suffix==undefined) suffix="";
        this.fValue=this.fValue+suffix;
        
    }  
    
  this.defineColumnName=function (name)
  {
        Object.defineProperty(this,"Name",{value:name,enumerable:true,writable:true});
  }  
  this.defineColumnClass=function (className)
  {
         Object.defineProperty(this,"className",{value:className,enumerable:true,writable:true});
  }
  
 this.defineTd=function (TD)
 {
   // TDD = new TD.type( {val:this.fValue} );
   TDD=React.createElement(TD.type,{proto:this.__proto__,NAME:this.nValue},null);
   
    Object.defineProperty(this,"TD",{value:TDD,enumerable:true,writable:true});
 } 
 this.defineComponent= function(CM)
 {
     CMM= React.createElement(CM.type,{proto:this.__proto__,NAME:this.nValue},null);
      Object.defineProperty(this,"CM",{value:CMM,enumerable:true,writable:true}); 
 }
this.defineTh=function (TH,caption)
 {
   // TDD = new TD.type( {val:this.fValue} );
   THH=React.createElement(TH.type,{proto:this.__proto__,NAME:this.nValue,caption:caption},null);
   
    Object.defineProperty(this,"THH",{value:THH,enumerable:true,writable:true});
 }  
  
 
 this.parceDate= function()
 {
   var pattern="^([0-9]{2})(\.{1})([0-9]{2})(\.{1})([0-9]{4}).*$";  
  regExp= new RegExp (pattern);
  var dat=this.fValue.replace(regExp,"$5-$3-$1");   
  if (isNaN(Date.parse(dat)))    
  return; 
   var date = new Date(Date.parse(dat));  
   this.fValue=date.toLocaleDateString("ru");  
 } 
 this.makeAlias=function(alias)
 {
	 Object.defineProperty(this,"alias",{value:alias,enumerable:true,writable:true});
 }
 this.makeTitle=function()
 {
	 Object.defineProperty(this,"title",{value:this.fValue,enumerable:true,writable:true});
 }
 function getCurrencyRate(currency)
 {
	 var curComp=window.objectReg["Currency_rates"];
		 if (curComp==null || curComp== undefined)
		 {
			 return null;
		 }
		 return curComp.state["RateInfo"+currency].AMOUNT;
 }
 this.convertCurrencyToUah= function (amount,currFrom)
 {
	var amt=amount 
	var cFrom=currFrom;
	if (typeof amount =="function")
	{
		amt=amount.call(this);
	}		
	if (typeof currFrom =="function")
	{
		cFrom=currFrom.call(this);
	}		
	var rate=getCurrencyRate(cFrom);
	this.fValue=String(amt*rate);	
	
 } 
    ////////////////////////////////////////////////////////////////// 
      
      if (jsonData!=undefined && jsonData!=null)
      {
         if (standMap==undefined)
         {
            data=JSON.parse(jsonData);
            if (jsonSubDataName!=undefined)
             this.mapArray=data[jsonSubDataName];
            else
            this.mapArray=data;    
         } else
         {  
        
      
           data=JSON.parse(jsonData);
           if (jsonSubDataName==undefined)
           this.mapArray=createMapsArray(data); 
          else
          this.mapArray=createMapsArray(data[jsonSubDataName]);                  
          makeConfigurationCallApply(this.mapArray); 
         } 
      }
         
    
    
    
     
     
 }