var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'

//import jQuery from './js/vendor/jquery-1.11.1.min.js';
//var $=jQuery;

//require ('bootstrap/dist/js/bootstrap.js');
//require ('bootstrap/dist/css/bootstrap.min.css');
//import Popper from 'popper.js';
export class Carousel_item extends Extends
{
     constructor(props)
    {
      super(props);
      
        
    }
    render()
    {
        return(  
                    <div className={"item "+this.props.active}>
                        <a href={"/search/"+this.props.searchCode}><img  src={this.props.src} alt="image"/></a>
                        <div className="carousel-caption">
                             {this.props.caption}
                        </div>
                    </div>
               )
               
    }
    
}


export class Carousel extends Extends
{
    constructor(props)
    {
      super(props);
      this.state.route=props.route;
      this.state.fileNamesArray=[]; 
      this.state.isActiveSet=false;  
        
    }
    getImagesRoutes()
    {
         if (this.state.route==undefined || this.state.route==null) return;
         data="dir="+this.state.route;
         var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/carousel_images.php",data);
         var dataConvert= function(responseText)
         {
              handleBR= new  handleData(responseText);
              this.setState({fileNamesArray:handleBR.mapArray,shouldComponentUpdate:true})  
         }
          var dataConvert=dataConvert.bind(this);
         
         Prom.then(dataConvert) ;
         
         
                 
        
    }
    
    //////////////////////////////////////////////////////////////////////////////////////
     shouldComponentUpdate(nextProps, nextState)
     {
        if (!nextState.shouldComponentUpdate  )  
        {
            this.getImagesRoutes(); 
        } 
        
         return nextState.shouldComponentUpdate;   
         
     }
     componentDidUpdate(prevProps, prevState)
     {
           // here the main_component function (componentDidUpdate) is overrided
           // so this.state.shouldComponentUpdate is stay unchanged;
     } 
     componentDidMount()
     {
        this.getImagesRoutes(); 
     }
    render()
    {
       var carouselItems=[];
       var carouselIndicators=[];
       var carouselItemsFunc= function(item)
       {
            activeSetClass="";
            if (!this.state.isActiveSet)
            {
                activeSetClass="active";
                this.state.isActiveSet=true;
            }
			searchCode=item.replace(/^(.*?)(\.{1})(png|jpg|jpeg)$/,"$1");
           return React.createElement(Carousel_item,{src:this.state.route+"/"+item,searchCode:searchCode,caption:"",active:activeSetClass},null)
       } 
       var carouselItemsFunc=carouselItemsFunc.bind(this);
       try
       {
         carouselItems=this.state.fileNamesArray.map(function(item){
             
             return  carouselItemsFunc(item);
             
         }) 
         this.state.isActiveSet=false;  
       } catch(e)
       {
           
          console.log(e); 
           
       }
       var carouselIndicatorsActiveClass="active";
       try
       {
         for (var i=0;i<carouselItems.length;i++)
         {
           carouselIndicators.push(<li data-target={"#"+this.props.id} data-slide-to={i} className={carouselIndicatorsActiveClass}></li> ) 
           carouselIndicatorsActiveClass="";		   
         }  
       } catch(e)
       {
          console.log(e);  
       }
         
       return ( <div id={this.props.id} className="carousel slide" data-ride="carousel">
                                   
                                    <ol className="carousel-indicators">
                                                 {carouselIndicators}
                                    </ol>
                                    <div className="carousel-inner">
                                            {carouselItems}
                                    </div>
                                    <a className="left carousel-control" href={"#"+this.props.id} data-slide="prev">
                                        <span><i className="fa fa-chevron-left"></i></span>
                                    </a>
                                    <a className="right carousel-control" href={"#"+this.props.id} data-slide="next">
                                        <span><i className="fa fa-chevron-right"></i></span>
                                    </a>
               </div>

        
                 )
        
    }
    
    
}