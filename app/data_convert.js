export function handleData(jsonData,standMap)
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
               } 
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
                if (typeof itemsObject[item]=="object" ) 
                {
                      
                    for ( subItem in itemsObject[item])
                    {
                     if (standMap[subItem])
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
                     
                    if (standMap[item])
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
               newObj[item]=mapArray[i][item]; 
                 
               
                
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
    this.addSuffix=function (suffix)
    {
        if (suffix==undefined) suffix="";
        this.fValue=this.fValue+suffix;
        
    }      
    ////////////////////////////////////////////////////////////////// 
      
      if (jsonData!=undefined && jsonData!=null)
      {
          
      
         data=JSON.parse(jsonData);
         this.mapArray=createMapsArray(data);                   
         makeConfigurationCallApply(this.mapArray);
      }
         
    
    
    
     
     
 }