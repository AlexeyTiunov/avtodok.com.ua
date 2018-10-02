var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js';


function getMapObject()
{
   
    dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
   var defineTh=dataConvert.defineTh; 
   var defineComponent=dataConvert.defineComponent;
   var parceDate=dataConvert.parceDate;  
  
    
    
   
    var mapObject=
    {      
      BalanceOnDate: {functions:{},params:[]},
      Begin:{functions:{},params:[]}, 
      CurrencyCode:{functions:{},params:[]},
      Caption:{functions:{defineComponent},params:[<Widget_caption/>]},
      CurrentDebt: {functions:{defineComponent},params:[<Widget_curentdebt/>]},
      OrdersAllSumm: {functions:{defineComponent},params:[<Widget_orderallsumm/>]},
      OrdersWorkSumm: {functions:{defineComponent},params:[<Widget_orderworksumm/>]},     
      CurrentDelayDebt:{functions:{},params:[]},
     // NotifyAboutPayment:{functions:{defineComponent},params:[<Notify_about/>],addNew:true,},
     }   
 return mapObject;
}
export class Notify_about extends Extends
{
     constructor(props)
     {
          super(props); 
        this.state=this.props;
     }
     
     render()
      {
          return(  <div className="widget">
                             <div className="widget-simple">
                                <a href="javascript:void(0)" className="widget-icon pull-left animation-fadeIn themed-background enable-tooltip" data-toggle="modal"  data-placement="bottom" >
                                <i className="fa fa-bell"></i>
                                </a>
                                <h4 className="widget-content text-right animation-hatch">
                                <a href="#pay_me" data-toggle="modal"  data-placement="bottom" > <strong>Сповістити про оплату</strong></a>
                                </h4>
                             </div>
                    </div> 
          
           
            
             
              
               )
          
      } 
     
     
 }


 export class Widget_caption  extends Extends
 {
    constructor(props) 
     {  
       super(props); 
        this.state=this.props;
             
       
         
     } 
     render()
     {
         return(
                   <div className="widget">
                     <div className="widget-simple">
                        <a href="javascript:void(0)" className="widget-icon pull-left animation-fadeIn themed-background">
                        <i className="fa fa-money"></i>
                        </a>
                        <h4 className="widget-content text-center animation-hatch">  
                        <small><em>  
                                    
                        </em></small >
                        <a href="javascript:void(0)"> <strong>{this.state.proto[this.state.NAME].fValue}</strong> </a><br/>
                         <a href="javascript:void(0)">  {this.state.proto.CurrencyCode.fValue}</a>
                        </h4>
                     </div>
                   </div>
          
          
           
               
                
                )
         
         
     } 
 }


export class Widget_curentdebt extends Extends
{
    constructor(props) 
     {  
       super(props); 
        this.state=this.props;
             
       
         
     } 
     
     defineBalanceName()
     {
        
        var curentDebt=Number(this.state.proto[this.state.NAME].fValue);
        if (curentDebt<=0) return "Ваш поточний баланс";
        else return "Ваш борг"; 
         
     }
     
     render()
     {
         //this.state.proto[this.state.NAME]
         return (
                  <div className="widget">
                     <div className="widget-simple">
                        <a href="javascript:void(0)" className="widget-icon pull-left animation-fadeIn themed-background">
                        <i className="fa fa-money"></i>
                        </a>
                        <h4 className="widget-content text-center animation-hatch">  
                        <small><em>  
                                    {this.defineBalanceName()}
                        </em></small >
                        <a href="javascript:void(0)"> <strong>{this.state.proto[this.state.NAME].fValue}</strong> {this.state.proto.CurrencyCode.fValue}</a>
                      
                        </h4>
                     </div>
                   </div>
          
           
            
               )
       
         
     } 
    
}
export class Widget_orderallsumm extends Extends
{
   
    constructor(props) 
     {  
       super(props); 
        this.state=this.props;     
       
         
     } 
     render()
     {
         //this.state.proto[this.state.NAME]
         return (
                  <div className="widget">
                     <div className="widget-simple">
                        <a href="javascript:void(0)" className="widget-icon pull-left animation-fadeIn themed-background">
                        <i className="fa  fa-pencil"></i>
                        </a>
                        <h4 className="widget-content text-right animation-hatch">
                        <a href="javascript:void(0)"> <strong>{this.state.proto[this.state.NAME].fValue}</strong> {this.state.proto.CurrencyCode.fValue}</a>
                        <small><em>Заказів на суму</em></small>
                        </h4>
                     </div>
                   </div>
          
           
            
               )
       
         
     } 
    
    
    
}
export class Widget_orderworksumm extends Extends
{
   
    constructor(props) 
     {  
       super(props); 
        this.state=this.props;     
       
         
     } 
     render()
     {
         //this.state.proto[this.state.NAME]
         return (
                  <div className="widget">
                     <div className="widget-simple">
                        <a href="javascript:void(0)" className="widget-icon pull-left animation-fadeIn themed-background">
                        <i className=" fa fa-exclamation"></i>
                        </a>
                        <h4 className="widget-content text-right animation-hatch">
                        <a href="javascript:void(0)"> <strong>{this.state.proto[this.state.NAME].fValue}</strong> {this.state.proto.CurrencyCode.fValue}</a>
                        <small><em>Заказів в роботі</em></small>
                        </h4>
                     </div>
                   </div>
          
           
            
               )
       
         
     } 
    
    
    
}
export class Widget extends Extends
{
   
    constructor(props) 
     {  
       super(props); 
        this.state=this.props;     
       
         
     } 
     render()
     {
         //this.state.proto[this.state.NAME]
         return (
                  <div className="widget">
                     <div className="widget-simple">
                        <a href="javascript:void(0)" className="widget-icon pull-left animation-fadeIn themed-background">
                        <i className="fa fa-money"></i>
                        </a>
                        <h4 className="widget-content text-right animation-hatch">
                        <a href="javascript:void(0)"> <strong>-786.36</strong> $</a>
                        <small><em>Ваш поточний баланс</em></small>
                        </h4>
                     </div>
                   </div>
          
           
            
               )
       
         
     } 
    
    
    
}
export class Balance extends Extends
{
        constructor(props) 
     {  
       super(props); 
        this.state.mapArray=[];     
       
         
     }
     getBalanceInfo()
     {
        var getInfo= function(responseText)
        {
            handleBL= new  handleData(responseText,getMapObject());
            this.setState({mapArray:handleBL.mapArray,shouldComponentUpdate:true}); 
        } 
        
        getInfo=getInfo.bind(this);
        var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/balance.php","");  
        Prom.then(getInfo); 
         
     } 
     
     //////////////////////////////////////////////////////
     
     shouldComponentUpdate(nextProps, nextState)
      {
        
          if (!nextState.shouldComponentUpdate  )
          {
             this.getBalanceInfo(); 
          }
          
           return nextState.shouldComponentUpdate;
      }
      componentDidUpdate(prevProps, prevState)
      {
               // here the main_component function (componentDidUpdate) is overrided
               // so this.state.shouldComponentUpdate is stay unchanged;
              this.deActivateProgressBar();
           
              
      }
      componentDidMount()
      {
         this.getBalanceInfo();   
      }
     
     render()
     {
         var widgets=null
         try
         {
           widgets=this.state.mapArray.map(function(agrInfo) {
                  
               var mas=[];
                  for (item in agrInfo)
                  {
                      if ( "CM" in agrInfo[item])
                     // mas.push(agrInfo[item].CM)
                      mas.push(<div className="col-xs-12 col-md-3">{agrInfo[item].CM}</div>) 
                  }
                  return mas;
               
             })  
         } catch(e)
         {
             
         }
         widgetsLine=widgets.map(function(line){
             
            return (<div className="row"> 
              {line} 
             
            </div>) 
             
             
         })
        
         return ( <div >
                            {widgetsLine}
                           <div className="col-xs-12 col-md-3"><Notify_about/> </div>
                 </div>             
         )
         
     }
    
    
    
    
}

export class Pay_notification extends Extends
{
     constructor(props) 
     {  
       super(props);          
       
         
     }
    
    
    render()
    {
        return (
         
         <div id="pay_me" className="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    
                    <div className="modal-header text-center">
                        <h2 className="modal-title">
                        <i className="fa fa-money"></i><font><font> Сповістити про оплату</font></font></h2>
                    </div>
                   
                   
                    <div className="modal-body">
                        <form action="index.html" method="post" enctype="multipart/form-data" class="form-horizontal form-bordered" onsubmit="return false;">
                            <fieldset>
                               <div className="form-group">
                                    <label className="col-md-4 control-label"><font><font>Дата оплати</font></font></label>
                                    <div class="col-md-4">
                                          <input id="example-datepicker2" name="example-datepicker2" className="form-control input-datepicker" data-date-format="dd/mm/yy" placeholder="дд/мм/рр" type="text" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-email"><font><font>Сума оплати (грн.)</font></font></label>
                                    <div className="col-md-6">
                                        <input type="email" id="user-settings-email" name="user-settings-email" className="form-control" />
                                    </div>
                                </div>
                                <div class="form-group">
                                        <label className="col-md-4 control-label" for="example-select">Картка</label>
                                        <div className="col-md-6">
                                            <select id="example-select" name="example-select" className="form-control" size="1">
                                                <option value="0">Оберіть карту</option>
                                                <option value="1">5168 7572 8738 3568  Атаманенко Оксана Аркадіївна</option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                <div className="form-group">
                                        <label className="col-md-4 control-label">Вид оплати</label>
                                        <div className="col-md-8">
                                            <label className="radio-inline" for="example-inline-radio1">
                                                <input id="example-inline-radio1" name="example-inline-radios" value="option1" type="radio"/> На картку
                                            </label>
                                            <label className="radio-inline" for="example-inline-radio2">
                                                <input id="example-inline-radio2" name="example-inline-radios" value="option2" type="radio"/> На рахунок
                                            </label>
                                       </div>
                                    </div>
                             </fieldset>
                             <fieldset>
                                
                               <div class="form-group">

                                            <label className="col-md-4 control-label" for="val_bio">Коментар <span className="text-danger">*</span></label>
                                            <div className="col-md-8">
                                                <textarea id="val_bio" name="val_bio" rows="6" className="form-control" placeholder="Тут можете ввести свій коментар" style={{"width": "316px","height": "90px"}} ></textarea>
                                            </div>
                                        </div>
                              </fieldset>
                            <div className="form-group form-actions">
                                <div class="col-xs-12 text-right">
                                    <button type="button" className="btn btn-sm btn-default" data-dismiss="modal"><font><font>Відміна</font></font></button>
                                    <button type="submit" className="btn btn-sm btn-primary"><font><font>Сповістити</font></font></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
           
             
              
               )
    }
    
    
}