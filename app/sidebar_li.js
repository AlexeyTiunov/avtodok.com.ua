var ReactDOM = require('react-dom');
var React = require('react');

/*
 props.dataprops.inners

*/
  
 
 var inner_elements=[];
 const a=(<a className='sidebar-nav-menu'> www</a>) ;
 inner_elements.push(a);
 var dataprops ={};
 dataprops.inners=inner_elements; 

class sidebar_li extends React.Component
{
    
     constructor(props) 
     {  
       super(props);      
         
         
     } 
    
    
    render()
    {
        if (props.dataprops.inners!== underfined)
        {
            for (pr in props.dataprops.inner) 
            {
               return pr ; 
                
            }
            
            
        }
        
        
    }
    
    
    
}

module.exports = sidebar_li;