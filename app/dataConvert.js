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
               if (typeof obj[item].params[j]=="array")
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
      
         data=JSON.parse(jsonData);
         this.mapArray=createMapsArray(data);                   
         makeConfigurationCall(this.mapArray);
         
    
    
    
     
     
 }