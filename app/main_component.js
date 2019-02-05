var ReactDOM = require('react-dom');
var React = require('react');
//import {Sidebar} from './sidebar.js'
import {handleData} from './data_convert.js'
var bundle=require("bundle-loader");


window.objectReg={};

export class Extends extends React.Component
{
   //////////////////////////////////////////////////  
    
    constructor(props)
    {
        super(props);
           
         this.state={parentMod:Object,
                     renderIN:<div></div>,
                     dataRecieved:null,
                     justUpdate:null,
                     shouldComponentUpdate:false,
                     PHPSESSID:this.getCookie("PHPSESSID"),
                     };
        
         this.xhr = new XMLHttpRequest();
         this.stopTouchMovePropagation=this.stopTouchMovePropagation.bind(this);
		 
         //this.objectReg={};
  
        
    }
	stopTouchMovePropagation(e)
	{
		e.stopPropagation();
	}
    
   
     componentDidUpdate(prevProps, prevState)
     {
         //alert("updated");
     }
     
    
     
     componentDidMount() 
     {
        // debugger;
       window.objectReg[this.constructor.name]=this;   
	   try
	   {
		  // this.deActivateProgressBar();
	   }catch(e)
	   {
		   
	   }
       
         
     }
     componentWillUnmount()
     {
        // debugger;
      delete window.objectReg[this.constructor.name];  
         
     }
     componentDidUpdate(prevProps, prevState)
      {
      //  this.state.PHPSESSID=this.getCookie("PHPSESSID");  
        this.state.shouldComponentUpdate=false;  
		//this.deActivateProgressBar();
      }
     
    ///////////////////////////////////////////////////////////////////// 
      makePostDataFromState()
      {
          var mas=[];
          for (item in this.state)
          { 
            mas.push(item+"="+this.state[item])  
          }
          return mas.join("&");
      }
      childUpdate(obj,renderIN)
     {
         try
         {
           obj.setState({renderIN:renderIN})
           obj.render();  
         }catch (e)
         {
             
         }
        
     }
     handleRecievedDataForRender (data)
     {
         return JSON.parse(data);       
         
     }
     makeRequest(method,url,type,data)
     {
        thisO=this;
       
         
      // thisO.setState({dataRecieved:null});  
       thisO.xhr.open(method,url,type);
       thisO.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       thisO.xhr.onreadystatechange = function()
        {
            if (thisO.xhr.readyState==4 && thisO.xhr.status==200)
            {
                Uobject=window.objectReg['Search_table'];
                debugger;
                // Uobject.setState({renderIN:<h3>{thisO.xhr.responseText}</h3>});
                // Uobject.render();
               //alert(xhr.status + ': ' + xhr.responseText);
             ///  thisO.setState( function (prevState,props){
                  // {dataRecieved:thisO.xhr.responseText}
                Uobject.setState({dataRecieved:thisO.xhr.responseText});  
               
               //thisO.forceUpdate(); 
            }
            
        }
       this.xhr.send(data);    
         
         
         
     }
     makeRequestUpdateObject(method,url,type,data,obj)
     {
         
          if (typeof obj != "Object")
          {
              return;
          }
         thisO=this;
       
         
      // thisO.setState({dataRecieved:null});  
       thisO.xhr.open(method,url,type);
       thisO.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       thisO.xhr.onreadystatechange = function()
        {
            if (thisO.xhr.readyState==4 && thisO.xhr.status==200)
            {
                 
                 Uobject=window.objectReg[obj.constructor.name];
                 Uobject.setState({renderIN:<h3>{thisO.xhr.responseText}</h3>});
               //Uobject.render();
               //alert(xhr.status + ': ' + xhr.responseText);
               //  thisO.setState( function (prevState,props){
               // {dataRecieved:thisO.xhr.responseText}
                thisO.setState({dataRecieved:thisO.xhr.responseText});  
               
               //thisO.forceUpdate(); 
            }
            
        }
       this.xhr.send(data);    
         
         
         
     }
     makeRequestToRecieveData(method,url,type,data)
     {   
        var thisO=this; 
        var Pro= new Promise((resolve,reject)=>{
            thisO.xhr.open(method,url,type);
            thisO.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            thisO.xhr.onreadystatechange = function()
            {
                if (thisO.xhr.readyState==4 && thisO.xhr.status==200)
                {
                    resolve(thisO.xhr.responseText);
                   
                }else
                {
                    //reject("ERROR"); 
                }
                
            }
			try
			{
				this.xhr.send(data);  
			}catch(e)
			{
				this.showInforMassage(e.name,e.message)
			}
              
             
             
         })
         
         
         
       
         
      // thisO.setState({dataRecieved:null});  
        
       return Pro  
         
     }
     makeRequestToRecieveDataAsync(method,url,data)
     {   
         var thisO=this;
         thisO.xhr= new XMLHttpRequest();
        var Pro= new Promise((resolve,reject)=>{
            thisO.xhr.open(method,url,true);
            thisO.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            thisO.xhr.onreadystatechange = function()
            {
                if (thisO.xhr.readyState==4 && thisO.xhr.status==200)
                {
                    resolve(thisO.xhr.responseText);
                   
                }else if (thisO.xhr.readyState<4 && thisO.xhr.status==200)
                {
                    
                }else
                {
                    //reject("ERROR"); 
                }
                
            }
            thisO.xhr.onabort = function()
            {
              var a=1;
            }
             thisO.xhr.onerror=function()
            {
             thisO.showInforMassage("ERROR","Помилка підключення!");
            }			
            //this.xhr.send(data);
			try
			{
				this.xhr.send(data);  
			}catch(e)
			{
				this.showInforMassage(e.name,e.message)
			}
             
             
         })
         
         
         
       
         
      // thisO.setState({dataRecieved:null});  
        
       return Pro  
         
     }
     makeRequestToRecieveDataAsyncNewObject(method,url,data)
     {   
        
        var Pro= new Promise((resolve,reject)=>{  
            var thisO={};
            thisO.xhr= new XMLHttpRequest();
            thisO.xhr.open(method,url,true);
            thisO.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            thisO.xhr.onreadystatechange = function()
            {
                if (thisO.xhr.readyState==4 && thisO.xhr.status==200)
                {
                    resolve(thisO.xhr.responseText);
                   
                }else if (thisO.xhr.readyState<4 && thisO.xhr.status==200)
                {
                    
                }else
                {
                    //reject("ERROR"); 
                }
                
            }
            thisO.xhr.onabort = function()
            {
              var a=1;
            } 
            //thisO.xhr.send(data);
             try
			{
				thisO.xhr.send(data); 
			}catch(e)
			{
				this.showInforMassage(e.name,e.message)
			}			
             
             
         })
         
         
         
       
         
      // thisO.setState({dataRecieved:null});  
        
       return Pro  
         
     }
     findMySelf(name)
     {
         fms= function()
         {
           return window.objectReg[name];  
         }
         return fms;
            
     }
     makeTableFromMapArray(mapArray)
	 {
		  var tableHead=null;
         var  tableBody=null;
         var tablePrepared=null;		 
         //this.state.dataQuantity=1;                 
          try
          {
              
                           
           var names=mapArray.map(function(tr) {
               
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
            
                                      
                                   
                          
                      
                     
                                
           var rows=mapArray.map(function(tr) 
                           {
                               var mas=[];
                             for (td in tr)
                             {
                                
                                mas.push(tr[td].TD)
                             } 
                              
                             return mas;
                              
                             //return <th className="text-center">{item.Name}</th> 
                           });
           
              
                                
                          var unickKey=0;
                tableBody= rows.map(function(item){                                  
                                  return (  <tr key={unickKey++}>{item}</tr> )  
                                   }) 
                tablePrepared=(
		           <table  className="table table-vcenter table-striped"> 
                               <thead>
                                {tableHead}
                               </thead> 
                                <tbody>
                                    {tableBody}                                   
                                  </tbody>
                                              
                       
                       
                     </table>)								   
          }catch(e)
          {
             tableHead=null;
             tableBody=null;            
			 tablePrepared=(<div></div>)
          } 
		  return tablePrepared;
	 }
	 
	 getCurrencyRate(currency)
	 {
		 var curComp=window.objectReg["Currency_rates"];
		 if (curComp==null || curComp== undefined)
		 {
			 return null;
		 }
		 return curComp.state["RateInfo"+currency].AMOUNT;
		 
	 }
     showInforMassage(header,message)
     {
         var linkA=document.getElementById("showMess");
         if (linkA==null)
         {
           linkA=document.createElement("a"); 
           linkA.setAttribute("data-toggle","modal");
           linkA.setAttribute("data-target","#info_message");
           linkA.id="showMess";
		   var body=document.getElementsByTagName("body")[0];
		   body.appendChild(linkA);          
         }
         
        
         
         
         if (header == undefined || message==undefined)
		 {
			 
		 }else
		 {		 
         
		  function updateInfoMassage()
		  {   Uobject=window.objectReg["Info_message"];
			  Uobject.setState({header:header,body:message});
		 
        
          
		   if (!Uobject.state.isOn)
		   {
			  linkA.click();
		   }
		   Uobject.setState({isOn:true});
          }
		  this.clearInforMassage(updateInfoMassage);
         }
		 
		
         
         
         
     }
	 clearInforMassage(nextFunc)
	 {
		 Uobject=window.objectReg["Info_message"];
         Uobject.setState({header:"",body:<div></div>},nextFunc)
	 }
	 checkAuth()
	 {
		 Uobject=window.objectReg["Auth"];
		 return Uobject.state.isAuthed;
	 }
	 showAuthWindow()
	 {
		 
			 var linkA=document.getElementById("showAuthWindow");
			  if (linkA==null)
             {
               linkA=document.createElement("a"); 
               linkA.setAttribute("data-toggle","modal");
               linkA.setAttribute("data-target","#modal-user-auth");
               linkA.id="showAuthWindow";
		       var body=document.getElementsByTagName("body")[0];
		       body.appendChild(linkA);          
             }
			 
			 linkA.click();
		     
		 
		 
	 }
	 fullInfoMassage(header,message)
	 {
		 Uobject=window.objectReg["Info_message"];
         Uobject.setState({header:header,body:message});
	 }
     updateAll()
     {
         for (item in window.objectReg )
         {
           if (window.objectReg[item]==this) continue; 
            window.objectReg[item].setState({justUpdate:null});
         }
     }
     getRangeObjectValue(RangeObjectValue,value)
      {
         for( var item in RangeObjectValue)
         {
            var arr=item.split(/-/);
            if (arr.length==1) continue;
            if (Number(value)>=arr[0] && Number(value)<=arr[1]  ) 
            {
                return  RangeObjectValue[item]
            }
            else 
            {
                continue;
            }
         } 
         return RangeObjectValue["default"]; 
    }    
    
   getCookie(name) {
    var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
   return matches ? decodeURIComponent(matches[1]) : undefined;
   }
   setCookie(name, value, options) 
   {

          options = options || {};

          var expires = options.expires;

          if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
          }
          if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
          }

          value = encodeURIComponent(value);

          var updatedCookie = name + "=" + value;

          for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
              updatedCookie += "=" + propValue;
            }
          }

          document.cookie = updatedCookie;
  }
  
   getUserLoginCookie()
   {
	  return this.getCookie("BITRIX_SM_LOGIN");
   }
  activateProgressBar(func)
  {
	  //var progressBar=window.objectReg["Progress_bar"];
	 // progressBar.activateBar(func);
	 var progressBar=window.objectReg["Preloader_icon"];
	 progressBar.setState({preloader:true})
	 
  }
  deActivateProgressBar()
  {  //  var progressBar=window.objectReg["Progress_bar"];
	 // progressBar.deActivateBar();
	 var progressBar=window.objectReg["Preloader_icon"];
	 progressBar.setState({preloader:false})
  }
  sideBarToogle()
  {
	  var sideBar=window.objectReg["Sidebar"];
      sideBar.sideBarToogle();	  
  }
  getRegionNameById(id)
  {   var region=undefined;
	  try
	  {
		 region= window.objectReg["Regions"].regions[id].Caption;  
	  }catch(e)
	  {
		  
	  }
	  return region;
  }
  getBrandFullNameByID(id)
  {
	  var brand=undefined;
	  try
	  {
		 brand= window.objectReg["Brands"].brandsId[id].FullName;  
	  }catch(e)
	  {
		  
	  }
	  return brand;
	  
  }
  getBrandFullNameByShortName(shortName)
  {
	  var brand=undefined;
	  try
	  {
		 brand= window.objectReg["Brands"].brandsShortName[shortName].FullName;  
	  }catch(e)
	  {
		  
	  }
	  return brand;
	  
  }
  getBrandIdByFullName(fullName)
  {
	   var brandId=undefined;
	   try
	   {
		 
		 brandId= window.objectReg["Brands"].brandsFullName[fullName].id;  
	  }catch(e)
	  {
		  
	  }
	  return brandId;
  }
  updateRegions()
  {
	 var regionComp= window.objectReg["Regions"];
	  regionComp.getRegionsInfo();
	  
  }
  scrollToTop()
  {
	  window.document.documentElement.scrollTop=0;
	  window.scrollTo(0,0);
  }
  setDocTitle(title)
  {
	   
	   document.title=title;
  }
  updateItemInfoComponent()
  {
	  try
	  {
		  UObject=window.objectReg['Item_info'];
		  UObject.setState({justUpdate:null});
	  }catch(e)
	  {
		  
	  }
	  
	  
	  
  }
  findModulePath(moduleWebPath)
  {
	  var cmp=window.componentModulesPathes;
	  for (var item in cmp)
	  {
		 if (cmp[item][0] instanceof RegExp)
		 {
			 if (cmp[item][0].test(moduleWebPath))
			 {
				 return cmp[item][1];
			 }
			 
		 }else
         {			 
		  if (cmp[item][0]==moduleWebPath) 
		  {
			 return cmp[item][1];
		  }
		 } 
		  
	  }
	  return "";
	  
  }
  findModuleName(moduleWebPath)
  {
	  var cmp=window.componentModulesPathes;
	  for (var item in cmp)
	  {
		if (cmp[item][0] instanceof RegExp)
		{
			 if (cmp[item][0].test(moduleWebPath))
			 {
				  return item;
			 }
			
		}else
		{ 
		  
		 if (cmp[item][0]==moduleWebPath) 
		 {
			 return item;
		 }
		}
		  
	  }
	  return "";
	  
  }
  findRoutePath(moduleWebPath)
  {
	   var cmp=window.componentModulesPathes;
	  for (var item in cmp)
	  {
		if (cmp[item][0] instanceof RegExp)
		{
			 if (cmp[item][0].test(moduleWebPath))
			 {
				   return cmp[item][2];
			 }
			
		}else
		{   
		 if (cmp[item][0]==moduleWebPath) 
		 {
			 return cmp[item][2];
		 }
		} 
		  
	  }
	  return "";
	  
  }
  correctModuleWebPath(moduleWebPath)
  {
	   var cmp=window.componentModulesPathes;
	   for (var item in cmp)
	   {
		   if (cmp[item][0] instanceof RegExp)
		   {
			    if (cmp[item][0].test(moduleWebPath))
			    {
					
				  return moduleWebPath.replace(cmp[item][0],"$1");
			    }
			   
		   }
		   
		   
	   }
	   
	 return  moduleWebPath;
  }
  loadNeedModule(moduleWebPath,func)
  {
	  var modulePath=this.findModulePath(moduleWebPath);
	  var componentName=this.findModuleName(moduleWebPath);
	  var routerPath=this.findRoutePath(moduleWebPath);
	  var cModuleWebPath=this.correctModuleWebPath(moduleWebPath);
	  var modFunc=function (modul)
	  {
		  func(cModuleWebPath+routerPath,modul[arguments.callee.componentName]);
	  }
	  modFunc.componentName=componentName;
	  if (modulePath=="") 
	  {
		  func(cModuleWebPath+routerPath,null);
		  return;
	  }
	 // require.ensure([modulePath],(require)=>
	 // {
		 // var module=require("bundle-loader!./"+modulePath); 
		 //var module=require("./"+modulePath); 
		 //var module=require.context("bundle-loader!./",false,/\.js?$/);
		
		var context= require.context("bundle-loader!./",false,/\.js$/)
		 var module=context("./"+modulePath);
		 module(modFunc );
		       
			  
		 /*bundle(function(f){
			 
			  var context= require.context("./",false,/\.js$/)
		      var module=context("./"+modulePath);
			  func(moduleWebPath,"");
		 })*/
		 
	 // })
	  
  }
}