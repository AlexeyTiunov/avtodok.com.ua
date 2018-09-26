var ReactDOM = require('react-dom');
var React = require('react');
import {Extends} from './main_component.js'  
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {handleData} from './data_convert.js'

function getMapObject()
{
   
    dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
   var parceDate=dataConvert.parceDate;  
  
    
    
   
    var mapObject=
    {
      ID:{functions:{},params:[]},
      LOGIN:{functions:{},params:[]},
      NAME:{functions:{},params:[]},
      EMAIL:{functions:{},params:[]},
      PASSWORD_REQUIREMENTS:{functions:{},params:[]}, 
      ERRORS:{functions:{},params:[]}, 
      BX_SESSION_CHECK:{functions:{},params:[]},   
        
    }
    
    
    
    
   return mapObject; 
}

export class Sidebar_userinfo_modal extends Extends
{
   constructor(props) 
     {  
       super(props);      
         
         
     }
     
     
     render ()
     {
         return ( <div className="sidebar-section sidebar-user clearfix">
                                    <div className="sidebar-user-avatar">
                                            <a href="#">
                                                <img src="/app/img/placeholders/avatars/avatar2.jpg" alt="аватар"/>
                                            </a>
                                        </div>
                                        <div className="sidebar-user-name"><font><font>USER 1</font></font></div>
                                        <div className="sidebar-user-links">
                                            <a href="cabinet_profile.html" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Профіль">
                                                <i className="gi gi-user"></i>
                                            </a>
                                          
                                            <a href="#modal-user-settings" data-toggle="modal" class="enable-tooltip" data-placement="bottom" title="" data-original-title="Настройки">
                                                <i className="gi gi-cogwheel"></i>
                                            </a>
                                            <a href="login.html" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Вийти">
                                                <i className="gi gi-exit"></i>
                                            </a>
                                    </div>
                                </div>
         
         
         
                  )
         
         
     }
     
      
}   
export class Sidebar_userinfo extends Extends
{
   constructor(props) 
     {  
       super(props);      
         
         
     }
     ///////////////////////////////////////
     componentDidMount()
     {
         super.componentDidMount()
      //  var elA=document.getElementById("user-settings");
      //  window.addEventListener("load",function(){elA.click();})
       
     }
     getUserData()
     {
        var findMySelf=this.findMySelf(this.constructor.name);
         var Prom=this.makeRequestToRecieveData("POST","/ws/personal_profile.php",false,"")
         
         Prom.then(function(responseText){
             
             handleDT=new handleData(responseText,getMapObject());
             var state={                        
                        NAME:handleDT.mapArray[0].NAME.fValue
                       } 
                                                                     
                findMySelf().setState(state);
         })  
         
     }
     //////////////////////
     componentDidMount()
     {
         super. componentDidMount();
         this.getUserData();
     }
     render ()
     {   if (this.props.isMobile)
         {
           return(  <div className="sidebar-section sidebar-user clearfix" style={{"paddingLeft":"20px"}}>
                  
                  <div className="row">  
                         <div className="col-xs-3 col-sm-3"> </div> 
                             <div className="sidebar-user-avatar col-xs-6 col-sm-6" style={{"marginLeft":"0px"}}>
                                            <a href="#">
                                                <img src="/app/img/placeholders/avatars/avatar2.jpg" alt="аватар"/>
                                            </a>
                                        </div>
                        
                  </div>
                  
                  <div className="row">
                         <div className="col-xs-3 col-sm-3"></div>   
                         <div className="sidebar-user-name col-xs-6 col-sm-6"><font><font>{this.state.NAME}</font></font></div>  
                   </div>  
                  <div className="row">
                        <div className="sidebar-user-links col-xs-12 col-sm-12">
                            <div className="row"> 
                                <div className="col-xs-6 col-sm-6"> 
                                      <a href="cabinet_profile.html"  data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Профіль">
                                                <i className="gi gi-user" style={{"fontSize":"40px","height":"1em"}}  ></i>
                                            </a>
                                </div>
                                 <div className="col-xs-6 col-sm-6"> 
                                       <Link to="/user_info"><i className="gi gi-cogwheel" style={{"fontSize":"40px","height":"1em"}}  ></i></Link>
                                 </div>
                                 <div className="col-xs-6 col-sm-6">
                                     <a id="user-settings" data-toggle="modal" data-target="#modal-user-auth" >
                                                <i className="gi gi-cogwheel" style={{"fontSize":"40px","height":"1em"}} ></i>
                                      </a>
                                  </div> 
                                 
                                 <div className="col-xs-6 col-sm-6">
                                 
                                      <a href="login.html" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Вийти">
                                                <i className="gi gi-exit" style={{"fontSize":"40px","height":"1em"}}  ></i>
                                            </a>
                                  </div> 
                                 
                                 
                            </div>
                        
                        
                        </div>
                  </div> 
              </div> )
         }else
         {
             
         
         return ( <div className="sidebar-section sidebar-user clearfix">
                                        <div className="sidebar-user-avatar">
                                            <a href="#">
                                                <img src="/app/img/placeholders/avatars/avatar2.jpg" alt="аватар"/>
                                            </a>
                                        </div>
                                        <div className="sidebar-user-name"><font><font>USER 1</font></font></div>
                                        <div className="sidebar-user-links">
                                            <a href="cabinet_profile.html"  data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Профіль">
                                                <i className="gi gi-user"></i>
                                            </a>
                                          
                                            
                                            <Link to="/user_info"><i className="gi gi-cogwheel"></i></Link>
                                             <a id="user-settings" data-toggle="modal" data-target="#modal-user-auth" >
                                                <i className="gi gi-cogwheel"></i>
                                            </a>
                                            <a href="login.html" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Вийти">
                                                <i className="gi gi-exit"></i>
                                            </a>
                                    </div>
                                </div>
         
         
         
                  )
         }
         
     }
     
      
}    
export class Sidebar_usersettings extends Extends  
{
    constructor(props) 
     {  
       super(props);      
       this.state.mapArray=[]; 
       this.state.email="";
       this.state.EMAIL="";  
       this.onInputChange=this.onInputChange.bind(this);
       this.saveUserData=this.saveUserData.bind(this);  
     } 
     getUserData()
     {
        var findMySelf=this.findMySelf(this.constructor.name);
         var Prom=this.makeRequestToRecieveData("POST","/ws/personal_profile.php",false,this.makePostDataFromState())
         
         Prom.then(function(responseText){
             
             handleDT=new handleData(responseText,getMapObject());
             var state={mapArray:handleDT.mapArray,
                        sessid:handleDT.mapArray[0].BX_SESSION_CHECK.fValue,
                        email:handleDT.mapArray[0].EMAIL.fValue,
                        EMAIL:handleDT.mapArray[0].EMAIL.fValue,
                        LOGIN:handleDT.mapArray[0].LOGIN.fValue
                       } 
            // findMySelf().setState({mapArray:handleDT.mapArray});
             // findMySelf().setState({sessid:handleDT.mapArray[0].BX_SESSION_CHECK.fValue});
             // findMySelf().setState({email:handleDT.mapArray[0].EMAIL.fValue});
             // findMySelf().setState({EMAIL:handleDT.mapArray[0].EMAIL.fValue});                                                           
                findMySelf().setState(state);
         })  
         
     }
     saveUserData()
     {
         var findMySelf=this.findMySelf(this.constructor.name);
         var Prom=this.makeRequestToRecieveData("POST","/ws/personal_profile.php",false,this.makePostDataFromState()+"&save=1")
         
         Prom.then(function(responseText){
             
             handleDT=new handleData(responseText,getMapObject());
             if (handleDT.mapArray[0].ERRORS.fValue!="")
             {
                  findMySelf().showInforMassage("ПОМИЛКА",handleDT.mapArray[0].ERRORS.fValue)
             }else
             {
                  findMySelf().showInforMassage("SUCCESS","SUCCESS");
                  findMySelf().setState({mapArray:handleDT.mapArray}); 
             }             
            
              
         })  
         
         
     }
     onInputChange(e)
     {
         var input= e.target.name
         var id = e.target.id;
         var inputValue=e.target.value;
         this.state[input]=inputValue;
         this.state[id]=inputValue;
         if  (this.state[input]=="")
         {
             delete this.state[input];
         }
         var str= `${id}` ;
         this.setState({ str:inputValue});
         
     }
     //////////////////////
     componentDidMount()
     {
         super.componentDidMount();
        this.getUserData();   
     }
     
     render ()
     {
        if (this.state.mapArray.lenght=0)
        return (<div></div>);
        else; 
        return (  <div id="modal-user-sett" className="" tabindex="-1" role="dialog" aria-hidden="true">
             <div className="modal-dialog">
                <div className="modal-content">
                  
                    <div className="modal-header text-center">
                        <h2 className="modal-title"><i className="fa fa-pencil"></i><font><font> Настройки</font></font></h2>
                    </div>
                 

                
                    <div className="modal-body">
                        <form action="index.html" method="post" enctype="multipart/form-data" className="form-horizontal form-bordered" onsubmit="return false;">
                            <fieldset>
                                <legend><font><font>Загальна інформация</font></font></legend>
                                <div className="form-group">
                                    <label className="col-md-4 control-label"><font><font>Имя пользователя</font></font></label>
                                    <div className="col-md-8">
                                        <p className="form-control-static"><font><font>{(this.state.mapArray[0])?this.state.mapArray[0].NAME.fValue:""}</font></font></p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-email"><font><font>Ел. адреса</font></font></label>
                                    <div className="col-md-8">
                                        <input type="email" onChange={this.onInputChange} id="email" name="EMAIL" className="form-control" value={this.state.email}/>
                                        
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-notifications"><font><font>Повідомлення на електорнну пошту</font></font></label>
                                    <div className="col-md-8">
                                        <label className="switch switch-primary">
                                            <input type="checkbox" id="user-settings-notifications" name="user-settings-notifications" />
                                            <span></span>
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend><font><font>Зміна паролю</font></font></legend>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-password"><font><font>Новий пароль</font></font></label>
                                    <div className="col-md-8">
                                        <input type="password" onChange={this.onInputChange} id="user-settings-password" name="NEW_PASSWORD" className="form-control" placeholder="Введіть Ваш новий пароль..."/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-repassword"><font><font>Підтвердіть новий пароль</font></font></label>
                                    <div className="col-md-8">
                                        <input type="password" onChange={this.onInputChange} id="user-settings-repassword" name="NEW_PASSWORD_CONFIRM" className="form-control" placeholder="...повторіть разочок!"/>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="form-group form-actions">
                                <div className="col-xs-12 text-right">
                                    <button type="button"  className="btn btn-sm btn-default" data-dismiss="modal"><font><font>Відміна</font></font></button>
                                    <button type="button" onClick={this.saveUserData}  className="btn btn-sm btn-primary"><font><font>Зберегти зміни</font></font></button>
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
 
export class Sidebar_usersettings_modal extends Extends  
{
    constructor(props) 
     {  
       super(props);      
         
         
     } 
   /*   render()
     {
       return ( <div id="Basket_items" className="modal fade" role="dialog">
                   <div className="modal-dialog">                     
                     <div className="modal-content">
                        <div className="modal-header">
                        </div>
                        <div className="modal-body">
                        </div>
                        <div className="modal-footer">
                        </div>
                    
                     </div>
                   </div>
                   
                   
                  </div> 
          
           
            
              )  
         
         
         
     }    */
    
     
    render ()
     {
        return (  <div id="modal-user-settings" className="modal fade"  role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                  
                    <div className="modal-header text-center">
                        <h2 className="modal-title"><i className="fa fa-pencil"></i><font><font> Настройки</font></font></h2>
                    </div>
                 

                
                    <div className="modal-body">
                        <form action="index.html" method="post" enctype="multipart/form-data" className="form-horizontal form-bordered" onsubmit="return false;">
                            <fieldset>
                                <legend><font><font>Загальна інформация</font></font></legend>
                                <div className="form-group">
                                    <label className="col-md-4 control-label"><font><font>Имя пользователя</font></font></label>
                                    <div className="col-md-8">
                                        <p className="form-control-static"><font><font>??????????</font></font></p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-email"><font><font>Ел. адреса</font></font></label>
                                    <div className="col-md-8">
                                        <input type="email" id="user-settings-email" name="user-settings-email" className="form-control" value="admin@example.com"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-notifications"><font><font>Повідомлення на електорнну пошту</font></font></label>
                                    <div className="col-md-8">
                                        <label className="switch switch-primary">
                                            <input type="checkbox" id="user-settings-notifications" name="user-settings-notifications" value="1" checked=""/>
                                            <span></span>
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend><font><font>Зміна паролю</font></font></legend>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-password"><font><font>Новий пароль</font></font></label>
                                    <div className="col-md-8">
                                        <input type="password" id="user-settings-password" name="user-settings-password" className="form-control" placeholder="Введіть Ваш новий пароль..."/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-repassword"><font><font>Підтвердіть новий пароль</font></font></label>
                                    <div className="col-md-8">
                                        <input type="password" id="user-settings-repassword" name="user-settings-repassword" className="form-control" placeholder="...повторіть разочок!"/>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="form-group form-actions">
                                <div className="col-xs-12 text-right">
                                    <button type="button" className="btn btn-sm btn-default" data-dismiss="modal"><font><font>Відміна</font></font></button>
                                    <button type="submit" className="btn btn-sm btn-primary"><font><font>Зберегти зміни</font></font></button>
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