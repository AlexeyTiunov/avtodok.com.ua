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
        
  
        
    }
    
   
     componentDidUpdate(prevProps, prevState)
     {
         alert("updated");
     }
     
    
     
     componentDidMount() 
     {
         debugger;
       objectReg[this.constructor.name]=this.constructor.name;   
         
         
     }
     componentWillUnmount()
     {
         debugger;
      delete objectReg[this.constructor.name];  
         
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
     makeRequest(method,url,type,data)
     {
        thisO=this; 
         
       thisO.xhr.open(method,url,type);
       thisO.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       thisO.xhr.onreadystatechange = function()
        {
            if (thisO.xhr.readyState==4 && thisO.xhr.status==200)
            {
               //alert(xhr.status + ': ' + xhr.responseText);
               thisO.setState({dataRecieved:thisO.xhr.responseText});  
            }
            
        }
       this.xhr.send(data);    
         
         
         
     }
     
     
    
}