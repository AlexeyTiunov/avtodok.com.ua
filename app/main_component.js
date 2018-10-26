var ReactDOM = require('react-dom');
var React = require('react');
import {Sidebar} from './sidebar.js'

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
         
         //this.objectReg={};
  
        
    }
    
   
     componentDidUpdate(prevProps, prevState)
     {
         //alert("updated");
     }
     
    
     
     componentDidMount() 
     {
        // debugger;
       window.objectReg[this.constructor.name]=this;   
         
         
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
            this.xhr.send(data);    
             
             
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
            this.xhr.send(data);    
             
             
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
            thisO.xhr.send(data);    
             
             
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
         }
         
        
         
         
        
         Uobject=window.objectReg["Info_message"];
         Uobject.setState({header:header,body:message});
         var body=document.getElementsByTagName("body")[0]; 
         body.appendChild(linkA);
         
         linkA.click(); 
         
         
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
  
  activateProgressBar(func)
  {
	  var progressBar=window.objectReg["Progress_bar"];
	  progressBar.activateBar(func);
  }
  deActivateProgressBar()
  {    var progressBar=window.objectReg["Progress_bar"];
	  progressBar.deActivateBar();
  }
}