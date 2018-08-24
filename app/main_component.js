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
     
    ///////////////////////////////////////////////////////////////////// 
     
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
         thisO=this; 
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
                    reject("ERROR");
                }
                
            }
            this.xhr.send(data);    
             
             
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
    
}